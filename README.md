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

Todas las variables viven en un único archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

#### `.env` — variables requeridas

| Variable | Descripción | Valor en desarrollo |
|---|---|---|
| `MYSQL_ROOT_PASSWORD` | Contraseña root de MySQL | _(la del equipo)_ |
| `DATABASE_NAME` | Nombre de la base de datos | `gimnasio_activa` |
| `DATABASE_USER` | Usuario de MySQL | `root` |
| `DATABASE_PASSWORD` | Contraseña de MySQL | _(la del equipo)_ |
| `DATABASE_HOST` | Host de MySQL | `localhost` (dev local) o `activa-db` (Docker) |
| `PORT` | Puerto del backend Express | `3032` |
| `SESSION_PASSWORD` | Secreto para cifrar sesiones EJS | _(string largo aleatorio)_ |
| `JWT_SECRET` | Secreto para firmar tokens JWT | _(string largo aleatorio)_ |
| `REACT_APP_BACKEND_DOMAIN_HOST` | URL base del backend (CORS y frontend) | `http://localhost:3032` |
| `REACT_APP_FRONTEND_DOMAIN_HOST` | URL base del frontend | `http://localhost:3000` |
| `TIEMPO_CONTROL_STOCK_MINUTOS` | Intervalo del cron de devolución de stock | `30` |
| `NODE_ENV` | Entorno de ejecución | `development` |
| `BROWSER` | Evita que CRA abra el navegador automáticamente | `none` |

El archivo `.env` **no está commiteado** (está en `.gitignore`).

### 4. Levantar la base de datos

**Opción A — Solo el contenedor de DB (recomendado para desarrollo):**

```bash
docker compose up activa-db
```

MySQL queda disponible en `localhost:3307`. En `.env` usar `DATABASE_HOST=localhost`.

Importar el esquema inicial:

```bash
mysql -u root -p -P 3307 gimnasio_activa < gimnasio_activa.sql
```

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
| `npm run start:dev` (proceso local) | `localhost` |
| `docker compose up` (Docker local) | `activa-db` |
| Producción | `activa-db` |

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

En `.env` usar `DATABASE_HOST=activa-db`.

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

### 8. Credenciales de prueba

| Campo | Valor |
|---|---|
| Email | `admin@activafitness.com` |
| Password | `admin123` |

> Solo válidas en entornos de desarrollo con los datos de `gimnasio_activa.sql` cargados.

---

## Flujo de trabajo con Git y deploy

```
feature/mi-cambio  →  (Pull Request)  →  main  →  deploy automático a producción
```

1. Crear una rama desde `main` con nombre descriptivo: `feature/`, `fix/`, `chore/`
2. Hacer los cambios y abrir un Pull Request hacia `main`
3. Una vez mergeado a `main`, **GitHub Actions despliega automáticamente**:
   - Compila y sube las imágenes Docker a GHCR (backend + nginx con frontend incluido)
   - Se conecta al servidor por SSH y ejecuta `docker compose pull && up -d`

Para forzar un deploy sin cambios de código: **GitHub → Actions → Build & Deploy → Run workflow**.

---

## Scripts de utilidad

| Script | Descripción |
|---|---|
| `scripts/actualizar_db_local.sh` | Sincroniza la base de datos local desde producción |
| `scripts/generar-backup-gimnasio-activa.sh` | Genera un dump de la base de datos |
| `mysqldump-backup.sh` | Script de backup usado por el contenedor de DB |
| `scripts/compilar_frontend.DEPRECATED.sh` | Deprecado — reemplazado por el build multi-stage de Docker |
