# Plan de Modernizacion — Gimnasio Activa 2026

# Resumen de Modernización: Ciclo de Vida y Despliegue 2026

### 🎯 El Punto Principal del Cambio
El objetivo central es la **Inmutabilidad y la Consistencia**. Aunque en el pasado se consideró la alternativa de usar un **"Doble Repositorio"** (uno para código y otro para compilados) para intentar organizar los despliegues, esa opción se descartó por ser ineficiente y propensa a errores de sincronización. En su lugar, adoptamos **Docker Registry**. Esto significa que el código se empaqueta en una "caja cerrada" (imagen) que no cambia: lo que se construye y prueba es exactamente lo que se despliega, eliminando para siempre el "en mi máquina funciona".

---

### 💻 ¿Cómo se trabajaría en Desarrollo?
En el entorno local, el flujo será puramente código fuente. El desarrollador ya no tiene que preocuparse por ejecutar scripts manuales para mover carpetas `/dist` o `/build`. Al levantar el entorno con `docker compose`, el sistema se encarga de procesar los cambios. Trabajamos con la tranquilidad de que nuestro entorno local es un espejo idéntico al de producción (misma versión de Node, base de datos y Nginx), pero con herramientas de recarga rápida para programar con agilidad. Solo nos encargamos de escribir código y hacer `git push`.

---

### 🚀 ¿Cómo se trabajaría en Producción?
El servidor de producción se vuelve un entorno optimizado y seguro. Ya no realiza tareas pesadas de compilación ni necesita tener herramientas de desarrollo instaladas. El flujo es automático:
1. **GitHub Actions** detecta el nuevo código en la rama principal.
2. Construye las imágenes ultra-ligeras y las guarda en un almacén seguro (Registry).
3. El servidor recibe la instrucción, descarga la imagen lista para usar y reinicia los servicios en segundos. 
Esto garantiza despliegues limpios, sin archivos residuales de versiones viejas y con una capacidad de respuesta inmediata ante cualquier falla.


  Modo Desarrollo (local, sin Docker completo)                                             
                                                                                           
  Prerrequisito: Base de datos                                                             
                                                                                           
  Necesitás MySQL corriendo. La opción más simple es levantar solo ese servicio de Docker:

  # Solo la DB en Docker
  docker compose up activa-db -d

  O tener MySQL 8.0 instalado localmente en el puerto 3307.

  ---
  Backend (Express + TypeScript)

  cd Backend
  cp .env.example .env       # Completar: DATABASE_PASSWORD_CONECT, SESSION_PASSWORD,
  JWT_SECRET
  npm install
  npm run start:dev          # nodemon + ts-node, hot reload sobre source/

  Variables clave para desarrollo en Backend/.env:
  NODE_ENV=development
  DATABASE_HOST=localhost      # (o activa-db si usás el contenedor de db)
  REACT_APP_FRONTEND_DOMAIN_HOST=http://localhost:5000
  REACT_APP_BACKEND_DOMAIN_HOST=http://localhost:3032

  El backend escucha en localhost:3032. Con NODE_ENV=development, las cookies no son secure
   ni httpOnly (ver configEnv.ts:6).

  ---
  Frontend (React SPA)

  cd frontend
  cp .env.example .env       # REACT_APP_BACKEND_DOMAIN_HOST=http://localhost:3032
  npm install
  npm start                  # CRA dev server con hot reload

  CRA levanta en localhost:3000 por defecto. Si el backend tiene CORS configurado para
  localhost:5000, hay un potencial conflicto — revisá que los puertos coincidan entre
  frontend/.env y Backend/.env.

  ---
  Flujo en desarrollo

  Browser → localhost:3032        (sitio público EJS)
  Browser → localhost:3000        (SPA React, dev server)
    └── fetch → localhost:3032/api/*  (API Express)

  ---
  Modo Producción (Docker Compose)

  Todo el stack se construye y orquesta con Docker Compose. Un solo comando:

  docker compose up -d

  Lo que hace internamente:

  Servicio: activa-db
  Build: mysql:8.0
  Resultado: MySQL en red interna, puerto 3307 expuesto al host
  ────────────────────────────────────────
  Servicio: activa-backend
  Build: Backend/Dockerfile (multi-stage)
  Resultado: Stage 1: compila TS → Stage 2: solo deps de producción, corre node
    dist/source/app.js
  ────────────────────────────────────────
  Servicio: activa-nginx
  Build: nginx/Dockerfile (multi-stage)
  Resultado: Stage 1: compila React → Stage 2: Nginx sirve la SPA + proxy al backend

  Diferencias clave respecto a desarrollo:

  1. NODE_ENV=production — forzado en docker-compose.yml:29, activa cookies secure +
  httpOnly
  2. React compilado en imagen — el build de React se hace dentro del Dockerfile de Nginx;
  no hay servidor CRA
  3. Sin devDependencies — npm ci --omit=dev en el stage final del backend
  4. SSL obligatorio — Nginx fuerza redirect 301 HTTP→HTTPS, requiere certificados en
  nginx/cert/
  5. Healthchecks encadenados — Nginx espera que backend esté healthy, backend espera que
  la DB esté healthy

  Flujo en producción

  Internet:80  → Nginx (redirect 301 → HTTPS)
  Internet:443
    ├── activafitness.com.ar        → proxy → activa-backend:3032 (Express/EJS)
    └── dashboard.activafitness.com.ar → archivos estáticos React en Nginx
          └── /api/*                → proxy → activa-backend:3032

  Variables a configurar antes del primer deploy:

  cp Backend/.env.example Backend/.env
  # Cambiar:
  # DATABASE_HOST=activa-db   ← nombre del servicio Docker, no localhost
  # REACT_APP_FRONTEND_DOMAIN_HOST=https://dashboard.activafitness.com.ar
  # REACT_APP_BACKEND_DOMAIN_HOST=https://activafitness.com.ar
  # NODE_ENV=development  ← docker-compose.yml lo sobreescribe a production

  También necesitás un .env en la raíz del proyecto para las variables de activa-db:
  cp .env.example .env   # MYSQL_ROOT_PASSWORD, DATABASE_NAME, DATABASE_USER,
  DATABASE_PASSWORD


## Del "Doble Repo" a "Contenedores con CI/CD"

**Fecha:** 2026-02-08
**Basado en:** `doc/auditoria-tecnica.md`
**Objetivo:** Unificar en un solo repositorio con flujo CI/CD automatizado via Docker Registry

---

## Resumen de Fases

| Fase | Nombre | Tickets | Prioridad |
|------|--------|---------|-----------|
| 1 | Unificacion y Limpieza | 5 tickets | Alta - Hacer primero |
| 2 | Dockerizacion Multi-stage | 4 tickets | Alta |
| 3 | Deuda Tecnica | 4 tickets | Media |
| 4 | CI/CD Real (GitHub Actions) | 5 tickets | Alta |
| **Total** | | **18 tickets** | |

---



## FASE 1: Unificacion y Limpieza

> **Meta:** Tener un solo repositorio limpio, sin artefactos compilados en Git.

### TICKET 1.1 — Limpiar .gitignore

**Estado:** Pendiente
**Esfuerzo:** Bajo (30 min)
**Archivos:** `.gitignore`

**Situacion actual:**
```gitignore
/Backend/node_modules/
node_modules/
/Backend/dist/
nginx/cert/
nginx/logs/*.log
```

**Que falta agregar:**
```gitignore
# Frontend
/frontend/node_modules/
/frontend/build/

# Flask static (build compilado de React)
/flask/app/static/

# Variables de entorno
.env
/Backend/.env
/frontend/.env

# Logs generales
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

**Criterio de aceptacion:**
- [ ] Ningun archivo compilado ni `.env` se sube a Git
- [ ] Ejecutar `git status` despues del cambio y verificar que no haya artefactos trackeados

---

### TICKET 1.2 — Eliminar artefactos compilados del historial de Git

**Estado:** Pendiente
**Esfuerzo:** Medio (1-2 hs)
**Depende de:** Ticket 1.1

**Acciones:**
1. Verificar si existen archivos compilados trackeados actualmente:
   ```bash
   git ls-files | grep -E "(dist/|build/|flask/app/static/)"
   ```
2. Si hay archivos trackeados, removerlos del indice (sin borrar del disco):
   ```bash
   git rm -r --cached Backend/dist/ 2>/dev/null || true
   git rm -r --cached frontend/build/ 2>/dev/null || true
   git rm -r --cached flask/app/static/ 2>/dev/null || true
   ```
3. Commitear la limpieza
4. (Opcional) Si el historial pesa mucho, considerar `git filter-branch` o `BFG Repo Cleaner` para remover blobs grandes historicos

**Criterio de aceptacion:**
- [ ] `git ls-files` no muestra ningun archivo de `dist/`, `build/` ni `flask/app/static/`
- [ ] El repo sigue funcionando normalmente despues de la limpieza

---

### TICKET 1.3 — Crear archivo .env.example para cada servicio

**Estado:** Pendiente
**Esfuerzo:** Bajo (30 min)

**Acciones:**
1. Crear `Backend/.env.example`:
   ```env
   DATABASE_NAME=gimnasio_activa
   DATABASE_USER_CONECT=root
   DATABASE_PASSWORD_CONECT=
   DATABASE_HOST=activa-db
   PORT=3032
   SESSION_PASSWORD=
   JWT_SECRET=
   REACT_APP_FRONTEND_DOMAIN_HOST=http://localhost:5000
   REACT_APP_BACKEND_DOMAIN_HOST=http://localhost:3032
   TIEMPO_CONTROL_STOCK_MINUTOS=5
   ```
2. Crear `frontend/.env.example`:
   ```env
   REACT_APP_FRONTEND_DOMAIN_HOST=http://localhost:5000
   REACT_APP_BACKEND_DOMAIN_HOST=http://localhost:3032
   ```
3. Crear `.env.example` (raiz, para Docker Compose):
   ```env
   MYSQL_ROOT_PASSWORD=
   DATABASE_NAME=gimnasio_activa
   DATABASE_USER=
   DATABASE_PASSWORD=
   ```

**Criterio de aceptacion:**
- [ ] Existen 3 archivos `.env.example` commiteados
- [ ] Los `.env` reales estan en `.gitignore`
- [ ] Un desarrollador nuevo puede copiar los `.example` y arrancar

---

### TICKET 1.4 — Consolidar estructura de carpetas del repo unico

**Estado:** Pendiente
**Esfuerzo:** Bajo (1 hr)
**Depende de:** Ticket 1.1, 1.2

**Situacion actual:** La estructura ya es de repo unico (Backend/, frontend/, flask/, nginx/ en el mismo repo). Este ticket es de verificacion y documentacion.

**Acciones:**
1. Verificar que no exista un segundo repositorio de "build" sincronizado
2. Si existe un repo de build separado, documentar que ya no se usara
3. Asegurar que el `README.md` refleje que es el unico repo

**Criterio de aceptacion:**
- [ ] Confirmado que no hay dependencia con un segundo repositorio
- [ ] Documentacion actualizada

---

### TICKET 1.5 — Eliminar script compilar_frontend.sh (sera reemplazado por Docker)

**Estado:** Pendiente
**Esfuerzo:** Bajo (15 min)
**Depende de:** Fase 2 completada (no borrar hasta que el nuevo flujo funcione)

**Situacion actual:**
El script `scripts/compilar_frontend.sh` hace:
1. `npm install` + `npm run build` en frontend/
2. Mueve `frontend/build/` a `flask/app/static/`

Esto sera reemplazado por el Dockerfile multi-stage (Ticket 2.1).

**Acciones:**
1. Marcar el script como deprecado (comentario al inicio)
2. Una vez que la Fase 2 este funcionando, eliminar el script

**Criterio de aceptacion:**
- [ ] El script se elimina solo despues de que Docker multi-stage compila el frontend correctamente

---

## FASE 2: Dockerizacion Multi-stage

> **Meta:** Eliminar Flask, compilar frontend dentro de Docker, imagenes livianas.

### TICKET 2.1 — Crear Dockerfile multi-stage para Nginx + Frontend

**Estado:** Pendiente
**Esfuerzo:** Alto (3-4 hs)
**Archivos nuevos:** `nginx/Dockerfile` (reescribir)

**Concepto:** Nginx servira directamente los archivos estaticos de React, eliminando Flask.

```dockerfile
# --- Stage 1: Compilar el frontend React ---
FROM node:22-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --- Stage 2: Nginx con el build + Certbot ---
FROM nginx:1.21.6

# Instalar Certbot (mantener funcionalidad actual)
COPY nginx/renew.sh /
RUN chmod +x /renew.sh
RUN apt update && apt install -y python3 python3-venv libaugeas0
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Copiar build de React al directorio que Nginx servira
COPY --from=frontend-build /app/build /usr/share/nginx/html/dashboard

# Copiar configuracion de Nginx
COPY nginx/conf.d/base.conf /etc/nginx/conf.d/default.conf
```

**Criterio de aceptacion:**
- [ ] `docker build` compila React y genera imagen de Nginx con los archivos estaticos
- [ ] dashboard.activafitness.com.ar sirve la SPA correctamente desde Nginx
- [ ] No se necesita Flask para servir el dashboard

---

### TICKET 2.2 — Reescribir Dockerfile del Backend como multi-stage

**Estado:** Pendiente
**Esfuerzo:** Medio (2 hs)
**Archivos:** `Backend/Dockerfile`

**Situacion actual:** El Dockerfile actual instala dependencias de desarrollo y compila en la misma imagen final.

**Propuesta multi-stage:**
```dockerfile
# --- Stage 1: Compilar TypeScript ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY source/ ./source/
RUN npm run build

# --- Stage 2: Imagen de produccion ---
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY source/views ./source/views
COPY public ./public
COPY uploads ./uploads
EXPOSE 3032
CMD ["npm", "run", "start"]
```

**Beneficios:**
- Imagen final sin TypeScript, sin devDependencies
- Menor tamano (~50% menos)

**Criterio de aceptacion:**
- [ ] La imagen compilada funciona igual que la actual
- [ ] `docker images` muestra una imagen mas liviana
- [ ] Las vistas EJS y uploads siguen funcionando

---

### TICKET 2.3 — Actualizar base.conf de Nginx para servir SPA directamente

**Estado:** Pendiente
**Esfuerzo:** Medio (1-2 hs)
**Depende de:** Ticket 2.1
**Archivos:** `nginx/conf.d/base.conf`

**Situacion actual:**
```nginx
# dashboard -> Flask
proxy_pass http://activa-flask:5000/;
```

**Propuesta (servir archivos estaticos directamente):**
```nginx
server {
    server_name dashboard.activafitness.com.ar;
    listen 80;
    listen 443 ssl;

    ssl_certificate /etc/letsencrypt/live/activafitness.com.ar/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/activafitness.com.ar/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /usr/share/nginx/html/dashboard;
    index index.html;

    # SPA: todas las rutas caen a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache de assets estaticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Criterio de aceptacion:**
- [ ] El dashboard carga correctamente con todas las rutas de React Router
- [ ] Los assets estaticos se sirven con headers de cache
- [ ] No hay 404 al navegar directamente a rutas como `/Productos`

---

### TICKET 2.4 — Eliminar el servicio Flask del docker-compose.yml

**Estado:** Pendiente
**Esfuerzo:** Bajo (30 min)
**Depende de:** Tickets 2.1, 2.2, 2.3 funcionando correctamente

**Acciones:**
1. Eliminar el servicio `activa-flask` de `docker-compose.yml`
2. Actualizar el `build context` de `activa-nginx` para que apunte a la raiz (necesita acceso a `frontend/`):
   ```yaml
   activa-nginx:
     build:
       context: .
       dockerfile: nginx/Dockerfile
     container_name: activa-nginx
     restart: always
     ports:
       - "80:80"
       - "443:443"
     volumes:
       - ./nginx/conf.d:/etc/nginx/conf.d
       - ./nginx/cert:/etc/letsencrypt
       - ./nginx/logs:/var/log/nginx
   ```
3. Eliminar o archivar la carpeta `flask/`
4. Actualizar el `docker-compose.yml` para que Nginx dependa solo del backend

**Criterio de aceptacion:**
- [ ] `docker compose up` levanta solo 3 servicios: db, backend, nginx
- [ ] Flask ya no existe como servicio
- [ ] Todo funciona igual que antes

---

## FASE 3: Resolucion de Deuda Tecnica

> **Meta:** Corregir problemas de seguridad y estabilidad detectados en la auditoria.

### TICKET 3.1 — Forzar cookies seguras en produccion

**Estado:** Pendiente
**Esfuerzo:** Bajo (30 min)
**Archivos:** `Backend/source/app.ts`

**Situacion actual (linea ~88):**
```typescript
cookie: { secure: false } // Cambiar a true en produccion
```

**Propuesta:**
```typescript
cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
}
```

**Acciones adicionales:**
1. Agregar `NODE_ENV=production` al `.env` del Backend en el Dockerfile o docker-compose
2. Verificar que el middleware de JWT tambien use `httpOnly: true` al setear la cookie `token`

**Criterio de aceptacion:**
- [ ] En produccion (Docker), las cookies son `secure: true` y `httpOnly: true`
- [ ] En desarrollo local, `secure: false` para que funcione sin HTTPS
- [ ] El login desde el dashboard sigue funcionando

---

### TICKET 3.2 — Optimizar cron job de devolucion de stock

**Estado:** Pendiente
**Esfuerzo:** Bajo (1 hr)
**Archivos:** `Backend/source/cron-task/`

**Situacion actual:** El cron de devolucion de stock se ejecuta cada minuto (`* * * * *`), lo cual genera queries constantes a la base de datos.

**Propuesta:**
1. Cambiar el intervalo a cada 5 minutos (`*/5 * * * *`) como minimo razonable
2. Usar la variable de entorno `TIEMPO_CONTROL_STOCK_MINUTOS` (que ya existe pero podria no estar siendo usada) para controlar el intervalo
3. Agregar un log condicional para no llenar los logs del contenedor

**Criterio de aceptacion:**
- [ ] El cron se ejecuta con el intervalo configurado por variable de entorno
- [ ] La funcionalidad de devolucion de stock sigue operando correctamente
- [ ] Los logs no se saturan con ejecuciones cada minuto

---

### TICKET 3.3 — Agregar healthcheck a los contenedores

**Estado:** Pendiente
**Esfuerzo:** Bajo (1 hr)

**Acciones:** Agregar healthcheck a `docker-compose.yml`:

```yaml
activa-backend:
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:3032/api/health"]
    interval: 30s
    timeout: 10s
    retries: 3

activa-db:
  healthcheck:
    test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
    interval: 30s
    timeout: 10s
    retries: 5
```

Tambien crear un endpoint `/api/health` basico en el backend que responda `200 OK`.

**Criterio de aceptacion:**
- [ ] `docker compose ps` muestra el estado de salud de cada servicio
- [ ] El backend no arranca hasta que la DB esta healthy (usar `depends_on` con `condition: service_healthy`)

---

### TICKET 3.4 — Configurar redirect HTTP a HTTPS en Nginx

**Estado:** Pendiente
**Esfuerzo:** Bajo (30 min)
**Archivos:** `nginx/conf.d/base.conf`

**Situacion actual:** Nginx escucha en puerto 80 y 443 en el mismo bloque `server`, sin forzar HTTPS.

**Propuesta:** Separar en dos bloques server:
```nginx
# Redirect HTTP -> HTTPS
server {
    listen 80;
    server_name activafitness.com.ar dashboard.activafitness.com.ar;
    return 301 https://$host$request_uri;
}

# HTTPS - web publica
server {
    listen 443 ssl;
    server_name activafitness.com.ar;
    # ... (configuracion SSL y proxy al backend)
}

# HTTPS - dashboard
server {
    listen 443 ssl;
    server_name dashboard.activafitness.com.ar;
    # ... (configuracion SSL y archivos estaticos)
}
```

**Criterio de aceptacion:**
- [ ] Acceder a `http://activafitness.com.ar` redirige a `https://`
- [ ] Acceder a `http://dashboard.activafitness.com.ar` redirige a `https://`
- [ ] Las rutas internas siguen funcionando normalmente

---

## FASE 4: CI/CD Real (GitHub Actions)

> **Meta:** Cada push a `main` construye, pushea y despliega automaticamente.

### TICKET 4.1 — Configurar GitHub Container Registry (GHCR)

**Estado:** Pendiente
**Esfuerzo:** Medio (1-2 hs)

**Acciones:**
1. Habilitar GitHub Packages en el repositorio (viene habilitado por defecto)
2. Crear un Personal Access Token (PAT) con permisos `write:packages` y `read:packages`
3. Agregar los siguientes secretos en el repo (Settings > Secrets and variables > Actions):
   - `SERVER_HOST` — IP o dominio del servidor de produccion
   - `SERVER_USER` — usuario SSH del servidor
   - `SERVER_SSH_KEY` — clave privada SSH para conectarse
   - `BACKEND_ENV` — contenido del archivo `Backend/.env` de produccion
4. Probar login al registry:
   ```bash
   echo $PAT | docker login ghcr.io -u USERNAME --password-stdin
   ```

**Criterio de aceptacion:**
- [ ] Se puede hacer `docker push ghcr.io/USUARIO/activa-backend:latest` desde local
- [ ] Los secretos estan configurados en GitHub

---

### TICKET 4.2 — Crear docker-compose.prod.yml para el servidor

**Estado:** Pendiente
**Esfuerzo:** Medio (1-2 hs)

**Proposito:** El servidor de produccion usara un compose que descarga imagenes pre-construidas (no compila localmente).

```yaml
# docker-compose.prod.yml
services:
  activa-db:
    image: mysql:8.0
    container_name: activa-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: ${DATABASE_NAME}
      MYSQL_USER: ${DATABASE_USER}
      MYSQL_PASSWORD: ${DATABASE_PASSWORD}
    volumes:
      - activa-db-data:/var/lib/mysql
    ports:
      - "3307:3306"
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 30s
      timeout: 10s
      retries: 5

  activa-backend:
    image: ghcr.io/USUARIO/activa-backend:latest
    container_name: activa-backend
    env_file: ./Backend/.env
    restart: always
    ports:
      - "3032:3032"
    depends_on:
      activa-db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3032/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  activa-nginx:
    image: ghcr.io/USUARIO/activa-nginx:latest
    container_name: activa-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./nginx/cert:/etc/letsencrypt
      - ./nginx/logs:/var/log/nginx
    depends_on:
      - activa-backend

volumes:
  activa-db-data:
```

**Criterio de aceptacion:**
- [ ] `docker compose -f docker-compose.prod.yml pull` descarga las imagenes
- [ ] `docker compose -f docker-compose.prod.yml up -d` levanta los 3 servicios
- [ ] Todo funciona identico al setup actual

---

### TICKET 4.3 — Crear workflow de CI/CD en GitHub Actions

**Estado:** Pendiente
**Esfuerzo:** Alto (3-4 hs)
**Depende de:** Tickets 4.1, 4.2
**Archivos:** `.github/workflows/deploy.yml` (reescribir)

**Workflow propuesto:**

```yaml
name: Build & Deploy

on:
  push:
    branches: ["main"]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  BACKEND_IMAGE: ghcr.io/${{ github.repository_owner }}/activa-backend
  NGINX_IMAGE: ghcr.io/${{ github.repository_owner }}/activa-nginx

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout codigo
        uses: actions/checkout@v4

      - name: Login a GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build y Push - Backend
        uses: docker/build-push-action@v5
        with:
          context: ./Backend
          push: true
          tags: |
            ${{ env.BACKEND_IMAGE }}:latest
            ${{ env.BACKEND_IMAGE }}:${{ github.sha }}

      - name: Build y Push - Nginx (con Frontend compilado)
        uses: docker/build-push-action@v5
        with:
          context: .
          file: ./nginx/Dockerfile
          push: true
          tags: |
            ${{ env.NGINX_IMAGE }}:latest
            ${{ env.NGINX_IMAGE }}:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest

    steps:
      - name: Deploy via SSH al servidor
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /ruta/al/proyecto
            docker compose -f docker-compose.prod.yml pull
            docker compose -f docker-compose.prod.yml up -d
            docker image prune -f
            echo "Deploy completado: $(date)"
```

**Criterio de aceptacion:**
- [ ] Un push a `main` dispara el build automaticamente
- [ ] Las imagenes se suben a GHCR con tag `latest` y con el SHA del commit
- [ ] El servidor actualiza los contenedores sin downtime perceptible
- [ ] Si el build falla, el deploy NO se ejecuta

---

### TICKET 4.4 — Agregar rollback rapido

**Estado:** Pendiente
**Esfuerzo:** Bajo (1 hr)

**Acciones:**
1. Crear script `scripts/rollback.sh` en el servidor:
   ```bash
   #!/bin/bash
   # Uso: ./rollback.sh <sha-del-commit>
   SHA=${1:?Uso: ./rollback.sh <sha-del-commit>}
   OWNER="USUARIO"

   docker compose -f docker-compose.prod.yml down

   # Cambiar las imagenes al tag del commit anterior
   BACKEND_IMAGE="ghcr.io/$OWNER/activa-backend:$SHA"
   NGINX_IMAGE="ghcr.io/$OWNER/activa-nginx:$SHA"

   docker pull $BACKEND_IMAGE
   docker pull $NGINX_IMAGE

   BACKEND_TAG=$SHA NGINX_TAG=$SHA docker compose -f docker-compose.prod.yml up -d
   echo "Rollback a $SHA completado"
   ```

2. Documentar el proceso de rollback en el README

**Criterio de aceptacion:**
- [ ] Se puede volver a cualquier version anterior con un solo comando
- [ ] El rollback tarda menos de 2 minutos

---

### TICKET 4.5 — Agregar notificacion de deploy (opcional)

**Estado:** Pendiente
**Esfuerzo:** Bajo (30 min)

**Acciones:** Agregar un paso final al workflow que notifique el resultado del deploy. Opciones:
- **GitHub:** El propio workflow muestra el estado (verde/rojo)
- **Telegram:** Agregar bot notification (si usan Telegram)
- **Webhook:** Notificar a un endpoint generico

Ejemplo con GitHub Deployment Status:
```yaml
- name: Notificar deploy exitoso
  if: success()
  run: echo "::notice::Deploy exitoso - $(date)"
```

**Criterio de aceptacion:**
- [ ] El equipo es notificado cuando un deploy se completa o falla

---

## Orden de Ejecucion Recomendado

```
Semana 1: FASE 1 (Tickets 1.1 → 1.4)
  |
  v
Semana 2: FASE 2 (Tickets 2.1 → 2.3, luego 2.4)
  |
  v
Semana 3: FASE 3 (Tickets 3.1 → 3.4) — se puede hacer en paralelo con Fase 2
  |
  v
Semana 4: FASE 4 (Tickets 4.1 → 4.5)
  |
  v
Ticket 1.5: Eliminar script compilar_frontend.sh (solo despues de Fase 2+4)
```

### Diagrama de dependencias

```
1.1 ──> 1.2 ──> 1.4
                  |
1.3 (paralelo)   |
                  v
            2.1 ──> 2.3 ──> 2.4 ──> 1.5
            2.2 (paralelo)
                  |
            3.1, 3.2, 3.3, 3.4 (paralelo con Fase 2)
                  |
                  v
            4.1 ──> 4.2 ──> 4.3 ──> 4.4 ──> 4.5
```

---

## Riesgos y Mitigacion

| Riesgo | Impacto | Mitigacion |
|--------|---------|------------|
| Downtime durante migracion a Nginx sin Flask | Los usuarios del dashboard no pueden acceder | Hacer el cambio en horario de baja actividad (noche/madrugada). Tener Flask listo para restaurar si falla |
| Certificados SSL no se renuevan con el nuevo Nginx | El sitio deja de funcionar con HTTPS | Probar `certbot renew` manualmente antes de eliminar Flask. Mantener el script `renew.sh` |
| Secretos mal configurados en GitHub Actions | El deploy falla o expone credenciales | Usar solo GitHub Secrets (nunca hardcodear). Probar el workflow con `workflow_dispatch` antes de confiar en push automatico |
| La imagen de Docker del backend es mas grande de lo esperado | Mayor tiempo de build y deploy | Usar multi-stage builds (Ticket 2.2) y `.dockerignore` |
| Base de datos incompatible despues de un rollback | Datos corruptos o migraciones perdidas | Siempre hacer backup antes de un deploy que incluya cambios de DB. Los rollbacks solo afectan codigo, no schema |

---

## Metricas de Exito

- **Antes:** Deploy manual ~15-30 min con riesgo de error humano
- **Despues:** Deploy automatico ~5 min, triggered por push a main
- **Servicios Docker:** De 4 a 3 (eliminando Flask)
- **Tamano de imagenes:** Reduccion estimada ~50% con multi-stage
- **Rollback:** De "revertir commits + recompilar" a un solo comando (~1 min)
