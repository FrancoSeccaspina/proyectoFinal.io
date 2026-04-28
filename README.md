# Gimnasio Activa

Sistema de gestión de gimnasio con sitio público y panel de administración, desplegado mediante Docker Compose con CI/CD automático en GitHub Actions.

## Estructura del proyecto

```
proyectoFinal.io/
├── Backend/          # API REST + vistas EJS (Node.js, TypeScript, Express, Sequelize)
├── frontend/         # SPA de administración (React 19, CRA)
├── nginx/            # Dockerfile multi-stage (compila React + Nginx + Certbot)
├── scripts/          # Scripts de utilidad (backups, actualización DB local)
├── doc/              # Documentación técnica y plan de deploy
├── docker-compose.yml       # Stack de desarrollo/staging
├── docker-compose.prod.yml  # Stack de producción (usa imágenes de GHCR)
└── gimnasio_activa.sql      # Dump del esquema de base de datos
```

## Arquitectura

```
Nginx (80/443, SSL via Let's Encrypt)
  ├── activafitness.com.ar           → activa-backend:3032 (Express + EJS + API REST)
  └── dashboard.activafitness.com.ar → /usr/share/nginx/html/dashboard/ (SPA React estática)

activa-backend ↔ activa-db (MySQL 8.0, puerto 3307)
```


## Guía para desarrolladores

### 1. Requisitos previos

- Node.js 22+
- npm
- Docker y Docker Compose (para levantar la DB o el stack completo)
- MySQL 8.0 (opcional, si preferís una instalación local)

### 2. Clonar e instalar dependencias

```bash
git clone <url-del-repo>
cd proyectoFinal.io

cd Backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 3. Configurar variables de entorno

Los valores de las variables de entorno (secrets) están en el siguiente archivo de Drive compartido del equipo:

**[Variables de entorno — Google Drive](https://drive.google.com/drive/u/0/folders/1p05LDm85nADgg41L0SL6mpleKfAAs1qI)**

Copiar los valores correspondientes en cada archivo:

| Archivo | Descripción |
|---------|-------------|
| `.env` | Variables para Docker Compose (MySQL) |
| `Backend/.env` | Variables del servidor Express (DB, JWT, sesión, URLs) |
| `frontend/.env` | Variables del frontend React (URLs de backend y frontend) |

### 4. Levantar la base de datos

**Opción A — Solo el contenedor de DB (recomendado para desarrollo):**

```bash
docker compose up activa-db

docker exec -i activa-db mysql -uroot -proot gimnasio_activa < gimnasio_activa.sql     
                                                                                           
# Correlo desde el directorio donde está el archivo .sql.  
```

MySQL queda disponible en `localhost:3307`. En `.env` usar `DATABASE_HOST=localhost`.


**Opción B — MySQL instalado localmente:**

Crear la base de datos y luego importar el esquema:

```sql
CREATE DATABASE gimnasio_activa;
```

```bash
mysql -u root -p gimnasio_activa < gimnasio_activa.sql
```

En `.env` usar `DATABASE_HOST=localhost` y el puerto por defecto (3306).

### 5. Correr en desarrollo

El valor de `DATABASE_HOST` en `.env` depende de cómo levantás el proyecto:

| Modo | `DATABASE_HOST` |
|---|---|
| Backend como proceso local (DB en Docker o local) | `localhost` |
| Producción (backend y DB dentro del mismo docker network) | `activa-db` |

**Opción A — Backend y frontend como procesos locales (recomendado):**

```bash
# Terminal 1 — Backend con recarga automática (nodemon)
cd Backend
npm run start:dev

# Terminal 2 — Frontend
cd frontend
npm start
```

En `.env` usar `DATABASE_HOST=localhost`.

**Opción B — Ambos simultáneamente desde la raíz:**

```bash
npm start
```

En `.env` usar `DATABASE_HOST=localhost`.

**Opción C — Stack completo con Docker (DB + Backend + Nginx):**

```bash
docker compose up
docker compose down   # para detener
```

En `Backend/.env` usar `DATABASE_HOST=activa-db` solo si el backend también corre dentro del docker network (producción). Para desarrollo local usar `localhost`.

### 6. Comandos útiles del backend

```bash
cd Backend
npm run start:dev   # desarrollo con nodemon + ts-node
npm run build       # compilar TypeScript a dist/
npm start           # ejecutar build compilado (producción)
```

### 7. Comandos útiles del frontend

```bash
cd frontend
npm start           # servidor de desarrollo (CRA, puerto 3000)
npm test            # Jest + React Testing Library
npm run build       # build de producción
```

> Solo válidas en entornos de desarrollo con los datos de `gimnasio_activa.sql` cargados.

---

## Flujo de trabajo con Git y deploy

> Para una explicación detallada del flujo completo de CI/CD, variables de entorno y resolución de problemas comunes ver [`doc/flujo-de-trabajo-deploy-github-action.md`](doc/flujo-de-trabajo-deploy-github-action.md).

```
feature/mi-cambio  →  (Pull Request o merge directo)  →  main  →  deploy automático a producción
```

1. Crear una rama desde `main` con nombre descriptivo
2. Hacer los cambios y abrir un Pull Request hacia `main` — o mergear directamente a `main` para aplicar los cambios a producción de forma inmediata
3. Una vez mergeado a `main`, **GitHub Actions despliega automáticamente**:
   - Compila y sube las imágenes Docker a GHCR (backend + nginx con frontend incluido)
   - Se conecta al servidor por SSH y ejecuta `docker compose pull && up -d`

Para forzar un deploy sin cambios de código: **GitHub → Actions → Build & Deploy → Run workflow**.

### Deploy

El workflow de GitHub Actions puede terminar en verde y aun así los contenedores no estar corriendo. Esto ocurre cuando el paso SSH completó sin error pero los servicios fallaron al iniciarse después (timeout de healthcheck, crash del contenedor, error al leer el `.env`, etc.).

**Cómo detectarlo:** entrás al servidor y los contenedores no están corriendo o están en estado `Restarting`.

```bash
docker ps -a
```

# Ver por qué falló
docker compose -f docker-compose.prod.yml logs --tail=50

# Volver a levantar sin re-descargar imágenes (si el pull ya se hizo)
docker compose -f docker-compose.prod.yml up -d

# O desde cero: descargar imágenes y levantar
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

### Deploy manual en el servidor

Si el contenedor del backend sigue corriendo una imagen vieja después de un deploy automático (por ejemplo, el servidor no descargó la imagen nueva de GHCR), ejecutar esto directamente en el servidor:

```bash
cd /root/proyectoFinal.io
git pull origin main
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```