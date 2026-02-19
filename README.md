# Gimnasio Activa — Repositorio único

Este es el **único repositorio** del proyecto. Contiene el backend, frontend, servidor Flask, configuración de Nginx y scripts de despliegue en un monorepo.

## Estructura del proyecto

```
proyectoFinal.io/
├── Backend/          # API REST + vistas EJS (Node.js, TypeScript, Express, Sequelize)
├── frontend/         # SPA de administración (React 19, CRA)
├── flask/            # Servidor Flask que sirve el build de React
├── nginx/            # Configuración de Nginx (proxy inverso + SSL)
├── scripts/          # Scripts de automatización (compilar frontend, etc.)
├── doc/              # Documentación técnica y de cambios
├── docker-compose.yml
└── gimnasio_activa.sql  # Dump del esquema de base de datos
```

## Arquitectura

```
Nginx (80/443, SSL via Let's Encrypt)
  ├── activafitness.com.ar           → Backend Express :3032 (EJS + API REST)
  └── dashboard.activafitness.com.ar → Flask :5000 (sirve build de React)

Backend ↔ MySQL 8.0 (puerto 3307)
```

La SPA de React se compila con `scripts/compilar_frontend.sh` y se copia a `flask/app/static/`.

---

## Comandos de desarrollo

### Stack completo (Docker)

```bash
docker compose up
docker compose down
```

### Solo backend

```bash
cd Backend
npm run start:dev   # nodemon + ts-node (modo desarrollo)
npm run build       # compilar TypeScript a dist/
npm start           # ejecutar en producción
```

### Solo frontend

```bash
cd frontend
npm start           # servidor de desarrollo (CRA)
npm test            # Jest + React Testing Library
npm run build       # build de producción
```

### Compilar frontend para despliegue

```bash
bash scripts/compilar_frontend.sh
```

Compila React y mueve el output a `flask/app/static/`.

### Backend y frontend concurrentemente (desde raíz)

```bash
npm start
```

---

## Variables de entorno

Cada componente requiere su propio archivo `.env`. Copiar los `.env.example` correspondientes y completar con los valores del equipo:

```bash
cp .env.example .env
cp Backend/.env.example Backend/.env
cp frontend/.env.example frontend/.env
```

Los archivos `.env` **no están commiteados** en el repositorio (están en `.gitignore`).

---

## Credenciales de desarrollo (seed)

```
Email:    admin@activafitness.com
Password: admin123
```

> Solo válidas en entornos de desarrollo con los datos de `gimnasio_activa.sql` cargados.
