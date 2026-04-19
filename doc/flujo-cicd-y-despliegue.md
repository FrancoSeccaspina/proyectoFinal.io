# 🚀 Cómo Funciona el Despliegue Automático — Gimnasio Activa

> **Lectura rápida:** Hacés `git push` a `main` → GitHub compila todo → el servidor descarga y reinicia. Vos no tocás el servidor.

---

## Glosario: Qué es cada cosa

Antes de entender el flujo, es importante saber qué rol cumple cada herramienta.

### Git

Sistema de control de versiones. Registra cada cambio en el código con un historial completo. Las ramas (`branches`) permiten trabajar en paralelo sin romper lo que ya funciona.

```
main ──────●──────●──────●──────●   ← versión estable, lo que está en producción
            \            /
feature      ●──────●───            ← trabajo en progreso, no afecta producción
```

**La regla:** `main` siempre tiene código listo para producción. Nunca se trabaja directamente sobre `main`.

---

### GitHub

Plataforma en la nube que aloja el repositorio Git. Además del código, provee:
- **Issues**: seguimiento de tareas y bugs
- **Pull Requests**: revisión de código antes de mergear a `main`
- **Actions**: automatización que se dispara ante eventos (ver abajo)
- **Packages / GHCR**: almacén de imágenes Docker (ver abajo)

---

### CI/CD — ¿Qué significa?

**CI = Continuous Integration (Integración Continua)**
Cada vez que alguien sube código, se ejecutan automáticamente pasos que verifican y construyen el proyecto. El objetivo es detectar problemas rápido, antes de que lleguen a producción.

**CD = Continuous Delivery/Deployment (Entrega/Despliegue Continuo)**
El código verificado se despliega automáticamente al servidor sin intervención manual.

```
Sin CI/CD:                          Con CI/CD:
  Código listo                        Código listo
      ↓                                   ↓
  Desarrollador compila               GitHub compila automáticamente
      ↓                                   ↓
  Desarrollador sube al servidor      GitHub verifica que compile bien
      ↓                                   ↓
  Desarrollador reinicia servicios    GitHub sube al servidor y reinicia
      ↓                                   ↓
  ~30 min, propenso a errores         ~5 min, repetible y confiable
```

---

### GitHub Actions

Es el motor de CI/CD de GitHub. Funciona con archivos `.yml` en `.github/workflows/`. Cada archivo define:

- **`on`**: cuándo se dispara (ej: push a `main`, manualmente, cada hora)
- **`jobs`**: bloques de trabajo que pueden correr en paralelo o en secuencia
- **`steps`**: pasos dentro de cada job (comandos bash, o "actions" reutilizables)

```yaml
# Ejemplo simplificado de cómo funciona
on:
  push:
    branches: ["main"]       # ← se dispara cuando hay push a main

jobs:
  construir:
    runs-on: ubuntu-latest   # ← corre en una máquina virtual de GitHub

    steps:
      - uses: actions/checkout@v4          # descarga el código
      - run: npm install && npm run build  # compila
      - run: docker build ...              # empaqueta en imagen Docker
      - run: docker push ...               # sube la imagen al registry
```

Cada "máquina virtual" (runner) es desechable: se crea limpia para cada ejecución y se destruye al terminar. Esto garantiza que el build es siempre reproducible.

---

### GitHub Container Registry (GHCR)

Es el almacén de imágenes Docker de GitHub, disponible en `ghcr.io`. Funciona igual que Docker Hub pero integrado con el repositorio.

**¿Por qué usarlo?**
- Las imágenes quedan versionadas junto al código (mismo SHA de commit)
- El servidor solo necesita hacer `docker pull` para obtener la versión exacta que se construyó
- Cada imagen es inmutable: una vez subida con un tag, no cambia

```
GitHub Actions construye           →   ghcr.io/francoseccaspina/activa-backend:latest
y sube la imagen                   →   ghcr.io/francoseccaspina/activa-backend:abc1234
                                   →   ghcr.io/francoseccaspina/activa-nginx:latest
                                   →   ghcr.io/francoseccaspina/activa-nginx:abc1234

Servidor de producción descarga    ←   docker pull ghcr.io/.../activa-backend:latest
la imagen y levanta el contenedor  ←   docker compose up -d
```

El tag `:latest` siempre apunta a la versión más reciente. El tag `:<sha>` (ej: `:abc1234`) permite hacer rollback a cualquier versión anterior exacta.

---

### Docker y Docker Compose

**Docker**: empaqueta una aplicación con todo lo que necesita para correr (Node, dependencias, archivos compilados) en una "imagen". Esa imagen puede ejecutarse en cualquier servidor como un "contenedor" aislado.

**Docker Compose**: orquesta múltiples contenedores que trabajan juntos. Define qué servicios levantar, en qué orden, con qué variables de entorno y qué volúmenes compartir.

**Dockerfile multi-stage**: técnica para construir imágenes livianas. Un primer stage compila el código (necesita todas las herramientas) y un segundo stage solo copia el resultado compilado (sin herramientas de desarrollo).

```dockerfile
# Stage 1: compilar (imagen pesada, ~800MB)
FROM node:22-alpine AS build
RUN npm ci && npm run build       # instala TODO, compila

# Stage 2: producción (imagen liviana, ~200MB)
FROM node:22-alpine
COPY --from=build /app/dist ./dist  # solo copia lo compilado
RUN npm ci --omit=dev               # solo deps de producción
```

---

### GitHub Secrets

Variables de entorno cifradas almacenadas en GitHub. Los workflows de Actions pueden usarlas sin que el valor quede expuesto en el código ni en los logs.

```yaml
- name: Deploy via SSH
  with:
    host: ${{ secrets.SERVER_HOST }}      # ← GitHub inyecta el valor en tiempo de ejecución
    key: ${{ secrets.SERVER_SSH_KEY }}    # ← nunca aparece en logs
```

Se configuran en: **Settings > Secrets and variables > Actions** del repositorio.

---

### SSH y la clave de deploy

SSH es el protocolo para conectarse a servidores remotos de forma segura. GitHub Actions necesita conectarse al servidor para ejecutar los comandos de deploy.

Se usa una **clave SSH dedicada** (no la personal) para el CI/CD:
- La clave privada se guarda como secret en GitHub (`SERVER_SSH_KEY`)
- La clave pública se registra en el servidor (`~/.ssh/authorized_keys`)
- Así cualquier colaborador puede hacer push a `main` y el deploy funciona sin compartir claves personales

---

## El Principio Central: Inmutabilidad

El servidor de producción **nunca compila código**. Solo ejecuta "cajas cerradas" (imágenes Docker) que fueron construidas y verificadas antes. Lo que se construye es exactamente lo que se despliega.

```
❌ Antes (manual):          ✅ Ahora (automatizado):
  - SSH al servidor           - git push main
  - git pull                  - Esperar ~5 min
  - npm install               - Listo ✓
  - npm run build
  - reiniciar procesos
  - rezar para que funcione
```

---

## Arquitectura en Producción

```
                         INTERNET
                            │
                    ┌───────┴────────┐
                    │   Puerto 80    │  → redirect 301 a HTTPS
                    │   Puerto 443   │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │  activa-nginx  │  (contenedor Docker)
                    │   Nginx 1.21   │
                    └───────┬────────┘
                            │
              ┌─────────────┴──────────────┐
              │                            │
    ┌─────────▼──────────┐      ┌──────────▼──────────┐
    │  activafitness      │      │  dashboard.activa   │
    │  .com.ar            │      │  fitness.com.ar     │
    │                     │      │                     │
    │  Proxy → backend    │      │  Archivos estáticos │
    │  Express/EJS        │      │  React SPA          │
    └─────────┬───────────┘      └──────────┬──────────┘
              │                             │
              │              /api/* ────────┘
              │                    │
    ┌─────────▼───────────────────▼──────┐
    │          activa-backend             │  (contenedor Docker)
    │          Node.js + Express          │
    │          Puerto 3032                │
    └─────────────────┬───────────────────┘
                      │
             ┌────────▼────────┐
             │    activa-db    │  (contenedor Docker)
             │   MySQL 8.0     │
             │   Puerto 3307   │
             └─────────────────┘
```

### SSL / HTTPS

- Certificados gestionados por **Certbot** (instalado dentro del contenedor Nginx)
- Archivos en `nginx/cert/` → montados como volumen → persisten entre deploys
- Renovación automática via cron en el servidor:
  ```bash
  0 3 * * * docker exec activa-nginx certbot renew --quiet && docker exec activa-nginx nginx -s reload
  ```

---

## Flujo Completo de un Deploy

```
┌─────────────────────────────────────────────────────────────────────┐
│  DESARROLLADOR (tu máquina)                                         │
│                                                                     │
│   1. Trabajás en una rama:                                          │
│      git checkout -b feature/nueva-funcion                          │
│      ... escribís código ...                                        │
│      git push origin feature/nueva-funcion                          │
│                                                                     │
│   2. Cuando está listo, merge a main:                               │
│      git checkout main                                              │
│      git merge feature/nueva-funcion                                │
│      git push origin main          ◄──── Esto dispara todo         │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            │  push a main detectado
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  GITHUB ACTIONS  (.github/workflows/deploy.yml)                     │
│                                                                     │
│  Job 1: build-and-push                                              │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │  a. Checkout del código                                    │     │
│  │  b. Login a GitHub Container Registry (ghcr.io)           │     │
│  │  c. Build Backend:                                         │     │
│  │     - Stage 1: compila TypeScript → JavaScript            │     │
│  │     - Stage 2: imagen final solo con deps de producción   │     │
│  │     - Push → ghcr.io/francoseccaspina/activa-backend:latest│     │
│  │             → ghcr.io/francoseccaspina/activa-backend:<sha>│     │
│  │  d. Build Nginx + Frontend:                               │     │
│  │     - Stage 1: compila React (npm run build)              │     │
│  │     - Stage 2: Nginx con los archivos estáticos adentro   │     │
│  │     - Push → ghcr.io/francoseccaspina/activa-nginx:latest │     │
│  │             → ghcr.io/francoseccaspina/activa-nginx:<sha> │     │
│  └────────────────────────────────────────────────────────────┘     │
│                            │                                        │
│                    solo si Job 1 ✓                                  │
│                            │                                        │
│  Job 2: deploy                                                      │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │  e. Conexión SSH al servidor de producción                │     │
│  │  f. En el servidor ejecuta:                               │     │
│  │       docker compose -f docker-compose.prod.yml pull      │     │
│  │       docker compose -f docker-compose.prod.yml up -d     │     │
│  │       docker image prune -f                               │     │
│  └────────────────────────────────────────────────────────────┘     │
└───────────────────────────┬─────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────────┐
│  SERVIDOR DE PRODUCCIÓN                                             │
│                                                                     │
│   docker compose pull   → descarga las nuevas imágenes de ghcr.io  │
│   docker compose up -d  → reinicia los contenedores con las nuevas │
│                                                                     │
│   Tiempo total: ~30 segundos de downtime (solo el restart)         │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            ▼
                   ✅ Usuarios ven la nueva versión
                      Tiempo total desde push: ~5 minutos
```

---

## Los Dos docker-compose

| Archivo | Uso | Qué hace |
|---------|-----|----------|
| `docker-compose.yml` | **Desarrollo local** | Compila las imágenes desde el código fuente local |
| `docker-compose.prod.yml` | **Servidor de producción** | Descarga imágenes pre-construidas desde ghcr.io |

El servidor **nunca usa** `docker-compose.yml`. Solo usa `docker-compose.prod.yml`.

---

## Qué Necesita el Servidor (Solo Una Vez)

```
/ruta/al/proyecto/
├── docker-compose.prod.yml     ← viene del repo (git clone)
├── .env                        ← creado manualmente en el servidor
│                                  (MYSQL_ROOT_PASSWORD, DATABASE_NAME, etc.)
├── Backend/
│   └── .env                   ← creado manualmente en el servidor
│                                  (DATABASE_HOST, JWT_SECRET, etc.)
└── nginx/
    ├── conf.d/
    │   └── base.conf           ← viene del repo
    ├── cert/                   ← generado por Certbot (una sola vez)
    │   └── live/activafitness.com.ar/
    │       ├── fullchain.pem
    │       └── privkey.pem
    └── logs/
```

### Setup SSL (se hace una sola vez)

El problema: Nginx no arranca sin certificados, y Certbot no puede generarlos sin Nginx corriendo.

**Solución:**

```bash
# 1. Comentar las líneas SSL en nginx/conf.d/base.conf
#    ssl_certificate ...
#    ssl_certificate_key ...

# 2. Levantar el stack SIN SSL
docker compose -f docker-compose.prod.yml up -d

# 3. Obtener los certificados
docker exec activa-nginx certbot --nginx \
  -d activafitness.com.ar \
  -d dashboard.activafitness.com.ar

# 4. Restaurar base.conf con las líneas SSL y reiniciar
docker compose -f docker-compose.prod.yml restart activa-nginx

# 5. Configurar renovación automática (en crontab del servidor)
0 3 * * * docker exec activa-nginx certbot renew --quiet && docker exec activa-nginx nginx -s reload
```

A partir de ahí los certificados quedan en `nginx/cert/` (volumen montado) y **sobreviven todos los deploys futuros**.

---

## Rollback a una Versión Anterior

Cada deploy genera una imagen tagueada con el SHA del commit:
```
ghcr.io/francoseccaspina/activa-backend:abc1234
ghcr.io/francoseccaspina/activa-nginx:abc1234
```

Para volver a una versión anterior:
```bash
./scripts/rollback.sh abc1234   # SHA del commit al que querés volver
```

---

## Transición desde el Stack Actual

Los contenedores actuales corren con `docker-compose.yml` (compilación local). La migración al nuevo flujo se hace **una sola vez**, cuando el CI/CD esté configurado y las imágenes ya estén en GHCR:

```bash
# 1. Detener el stack actual
docker compose down

# 2. Levantar con el nuevo compose (imágenes desde registry)
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

**No detener el stack actual hasta que el CI/CD esté funcionando** y las imágenes estén disponibles en ghcr.io.

---

## Resumen de Secretos Necesarios en GitHub

Configurar en **Settings > Secrets and variables > Actions**:

| Secreto | Descripción |
|---------|-------------|
| `SERVER_HOST` | IP del servidor de producción |
| `SERVER_USER` | Usuario Linux (ej: `root`) |
| `SERVER_SSH_KEY` | Clave privada SSH dedicada al CI/CD |
| `SERVER_SSH_PORT` | Puerto SSH del servidor |
| `BACKEND_ENV` | Contenido del `Backend/.env` de producción |

---

## Estado Actual del Plan

| Fase | Estado |
|------|--------|
| Fase 1 — Unificación y limpieza | ✅ Completa |
| Fase 2 — Dockerización multi-stage | ✅ Completa |
| Fase 3 — Deuda técnica | ✅ Completa |
| Fase 4 — CI/CD con GitHub Actions | ⏳ En progreso — Ticket 4.3 ✅ ([deploy.yml](../.github/workflows/deploy.yml)) |
