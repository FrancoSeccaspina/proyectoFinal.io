# Resumen del Plan de Deploy y Flujo de Trabajo

**Repositorio:** `FrancoSeccaspina/proyectoFinal.io`
**Referencia:** `doc/plan-de-deploy.md` | `doc/configuracion-github-admin.md`
**Fecha:** 2026-02-08

---

## 1. Resumen Ejecutivo

### Que cambia?

```
╔══════════════════════════════════════════════════════════════════════════╗
║                           ANTES (hoy)                                  ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  Desarrollador                                                         ║
║       |                                                                ║
║       |-- 1. Edita codigo                                              ║
║       |-- 2. Compila frontend manualmente (compilar_frontend.sh)       ║
║       |-- 3. Commitea codigo + archivos compilados                     ║
║       |-- 4. git push                                                  ║
║       |-- 5. SSH al servidor manualmente                               ║
║       |-- 6. git pull en el servidor                                   ║
║       |-- 7. docker compose build (compila de nuevo en el servidor)    ║
║       |-- 8. docker compose up -d                                      ║
║       |-- 9. Reza que funcione                                         ║
║                                                                        ║
║  Problemas:                                                            ║
║  - Archivos compilados ensucian Git                                    ║
║  - El build depende del entorno de cada persona                        ║
║  - Deploy manual = errores humanos                                     ║
║  - Rollback = revertir commits + recompilar (~30 min)                  ║
║  - 4 contenedores (Flask es innecesario)                               ║
║                                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝

                              ↓ ↓ ↓

╔══════════════════════════════════════════════════════════════════════════╗
║                         DESPUES (propuesta)                            ║
╠══════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  Desarrollador                                                         ║
║       |                                                                ║
║       |-- 1. Edita codigo                                              ║
║       |-- 2. git push                                                  ║
║       |-- 3. (listo, GitHub hace el resto)                             ║
║                                                                        ║
║  Mejoras:                                                              ║
║  - Git solo guarda codigo fuente                                       ║
║  - El build es identico siempre (contenedor controlado)                ║
║  - Deploy 100% automatico                                              ║
║  - Rollback = 1 comando (~1 min)                                       ║
║  - 3 contenedores (sin Flask)                                          ║
║                                                                        ║
╚══════════════════════════════════════════════════════════════════════════╝
```

---

## 2. Arquitectura Antes vs Despues

### Arquitectura ACTUAL (4 servicios)

```
                    Internet
                       |
                       ▼
              ┌─────────────────┐
              │   activa-nginx  │  :80 / :443
              │   (reverse proxy)│
              └────┬───────┬────┘
                   │       │
        ┌──────────┘       └──────────┐
        ▼                             ▼
┌───────────────┐            ┌────────────────┐
│activa-backend │ :3032      │  activa-flask   │ :5000
│ Node/Express  │            │ Python/Gunicorn │
│ API + EJS     │            │ Sirve React SPA │
└───────┬───────┘            └────────────────┘
        │                     ▲
        ▼                     │ compilar_frontend.sh
┌───────────────┐            (manual, copia build/)
│  activa-db    │ :3306
│  MySQL 8.0    │
└───────────────┘

Servicios: 4
Flask solo sirve archivos estaticos (desperdicio de RAM)
```

### Arquitectura NUEVA (3 servicios)

```
                    Internet
                       |
                       ▼
              ┌──────────────────────┐
              │     activa-nginx     │  :80 / :443
              │  reverse proxy       │
              │  + SPA React (static)│  ← React compilado adentro
              └────┬────────────────┘
                   │
                   │  activafitness.com.ar → proxy al backend
                   │  dashboard.* → archivos estaticos locales
                   │
                   ▼
          ┌───────────────┐
          │activa-backend │ :3032
          │ Node/Express  │
          │ API + EJS     │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │  activa-db    │ :3306
          │  MySQL 8.0    │
          └───────────────┘

Servicios: 3
Flask ELIMINADO → Nginx sirve React directamente
```

---

## 3. Flujo de Trabajo del Desarrollador

### Dia a dia (despues de implementar el plan)

```
┌─────────────────────────────────────────────────────────┐
│                 FLUJO DEL DESARROLLADOR                  │
└─────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────┐     ┌──────────────────┐
  │  Editar  │────▶│  Commit  │────▶│  git push main   │
  │  codigo  │     │  (solo   │     │                  │
  │          │     │  fuente) │     │  (sin compilar   │
  └──────────┘     └──────────┘     │   nada manual)   │
                                    └────────┬─────────┘
                                             │
                          ┌──────────────────┘
                          ▼
              ┌───────────────────────┐
              │   GitHub detecta el   │
              │   push y arranca el   │
              │   workflow automatico │
              └───────────┬───────────┘
                          │
                          ▼
                   (ver seccion 4)
```

**Lo que el desarrollador YA NO hace:**
- ~~Ejecutar `compilar_frontend.sh`~~
- ~~Conectarse por SSH al servidor~~
- ~~Hacer `docker compose build` en el servidor~~
- ~~Commitear carpetas `dist/` o `build/`~~

---

## 4. Flujo de CI/CD (GitHub Actions)

### Que pasa cuando se hace push a main

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PIPELINE CI/CD (GitHub Actions)                    │
└─────────────────────────────────────────────────────────────────────┘

  git push main
       │
       ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  JOB 1: build-and-push                          ~4 min     │
  │                                                             │
  │  ┌─────────────────────────────────────────────────────┐   │
  │  │ Step 1: Checkout codigo                             │   │
  │  │   Descarga todo el repo                             │   │
  │  └──────────────────────┬──────────────────────────────┘   │
  │                         ▼                                   │
  │  ┌─────────────────────────────────────────────────────┐   │
  │  │ Step 2: Login a GHCR                                │   │
  │  │   docker login ghcr.io (con GITHUB_TOKEN)           │   │
  │  └──────────────────────┬──────────────────────────────┘   │
  │                         ▼                                   │
  │  ┌─────────────────────────────────────────────────────┐   │
  │  │ Step 3: Build & Push — Backend                      │   │
  │  │                                                     │   │
  │  │   Stage 1: npm ci + tsc (compilar TypeScript)       │   │
  │  │   Stage 2: Imagen liviana solo con dist/ + node_mod │   │
  │  │                                                     │   │
  │  │   → Push a ghcr.io/francoseccaspina/activa-backend   │   │
  │  │     Tags: :latest + :abc123 (SHA del commit)        │   │
  │  └──────────────────────┬──────────────────────────────┘   │
  │                         ▼                                   │
  │  ┌─────────────────────────────────────────────────────┐   │
  │  │ Step 4: Build & Push — Nginx + Frontend             │   │
  │  │                                                     │   │
  │  │   Stage 1: npm ci + npm run build (compilar React)  │   │
  │  │   Stage 2: Nginx con build/ + Certbot               │   │
  │  │                                                     │   │
  │  │   → Push a ghcr.io/francoseccaspina/activa-nginx     │   │
  │  │     Tags: :latest + :abc123 (SHA del commit)        │   │
  │  └─────────────────────────────────────────────────────┘   │
  └──────────────────────────┬──────────────────────────────────┘
                             │
                     ¿Build OK? ─── NO ──▶ ❌ Se detiene. No despliega.
                             │
                            SI
                             │
                             ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  JOB 2: deploy                                  ~1 min     │
  │                                                             │
  │  ┌─────────────────────────────────────────────────────┐   │
  │  │ Step 1: SSH al servidor de produccion               │   │
  │  │                                                     │   │
  │  │   $ docker compose -f docker-compose.prod.yml pull  │   │
  │  │     → Descarga las imagenes nuevas de GHCR          │   │
  │  │                                                     │   │
  │  │   $ docker compose -f docker-compose.prod.yml up -d │   │
  │  │     → Reemplaza los contenedores con las nuevas     │   │
  │  │       imagenes (la DB no se toca)                   │   │
  │  │                                                     │   │
  │  │   $ docker image prune -f                           │   │
  │  │     → Limpia imagenes viejas del disco              │   │
  │  └─────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────┘
                             │
                             ▼
                     ✅ Deploy completado
                     (~5 min total desde el push)
```

---

## 5. Flujo del Build Multi-stage (Docker)

### Backend — Que pasa dentro del Dockerfile

```
┌────────────────────────────────────────────────────┐
│              BACKEND — Docker Multi-stage           │
└────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────┐
  │  STAGE 1: "build" (node:22-alpine)       │
  │                                          │
  │  package.json ──▶ npm ci                 │
  │  source/*.ts  ──▶ tsc (TypeScript)       │
  │                       │                  │
  │                       ▼                  │
  │                   dist/*.js              │
  │  (esta imagen se DESCARTA)               │
  └───────────────────────┬──────────────────┘
                          │ solo copia dist/
                          ▼
  ┌──────────────────────────────────────────┐
  │  STAGE 2: produccion (node:22-alpine)    │
  │                                          │
  │  package.json ──▶ npm ci --omit=dev      │
  │  dist/        ──▶ (JS compilado)         │
  │  source/views ──▶ (plantillas EJS)       │
  │  public/      ──▶ (assets estaticos)     │
  │  uploads/     ──▶ (archivos subidos)     │
  │                                          │
  │  CMD: npm run start                      │
  │                                          │
  │  ✅ Sin TypeScript                       │
  │  ✅ Sin devDependencies                  │
  │  ✅ ~50% mas liviana                     │
  └──────────────────────────────────────────┘
```

### Nginx + Frontend — Que pasa dentro del Dockerfile

```
┌────────────────────────────────────────────────────┐
│          NGINX + FRONTEND — Docker Multi-stage      │
└────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────┐
  │  STAGE 1: "frontend-build" (node:22)     │
  │                                          │
  │  frontend/package.json ──▶ npm ci        │
  │  frontend/src          ──▶ npm run build │
  │                               │          │
  │                               ▼          │
  │                          build/          │
  │                          ├── index.html  │
  │                          ├── static/     │
  │                          │   ├── js/     │
  │                          │   └── css/    │
  │                          └── ...         │
  │  (esta imagen se DESCARTA)               │
  └───────────────────────┬──────────────────┘
                          │ solo copia build/
                          ▼
  ┌──────────────────────────────────────────┐
  │  STAGE 2: nginx:1.21.6                   │
  │                                          │
  │  build/ ──▶ /usr/share/nginx/html/dash.  │
  │  base.conf ──▶ /etc/nginx/conf.d/        │
  │  Certbot ──▶ instalado para SSL          │
  │                                          │
  │  ✅ Sin Node.js                          │
  │  ✅ Sin node_modules                     │
  │  ✅ Sin Flask/Python                     │
  │  ✅ Solo Nginx + HTML/JS/CSS             │
  └──────────────────────────────────────────┘
```

---

## 6. Flujo de Nginx (como enruta las peticiones)

```
┌─────────────────────────────────────────────────────────────────┐
│                    NGINX — Enrutamiento                          │
└─────────────────────────────────────────────────────────────────┘

  Peticion HTTP (:80)
       │
       ▼
  ┌──────────────┐
  │ Redirect 301 │──▶ https://$host$uri
  │ HTTP → HTTPS │
  └──────────────┘

  Peticion HTTPS (:443)
       │
       ├── Host: activafitness.com.ar
       │        │
       │        ▼
       │   ┌─────────────────────────────────────────┐
       │   │  proxy_pass → activa-backend:3032       │
       │   │                                         │
       │   │  /              → Pagina publica (EJS)  │
       │   │  /api/productos → API REST (JSON)       │
       │   │  /users/login   → Login (EJS)           │
       │   │  /api/*         → Todos los endpoints   │
       │   └─────────────────────────────────────────┘
       │
       └── Host: dashboard.activafitness.com.ar
                │
                ▼
           ┌─────────────────────────────────────────┐
           │  Archivos estaticos locales (sin proxy)  │
           │                                         │
           │  /              → index.html (React)    │
           │  /Productos     → index.html (SPA)      │
           │  /Usuarios      → index.html (SPA)      │
           │  /static/js/*   → bundle.js (cache 1y)  │
           │  /static/css/*  → styles.css (cache 1y) │
           │                                         │
           │  try_files $uri $uri/ /index.html       │
           │  (todas las rutas caen al SPA)           │
           └─────────────────────────────────────────┘
```

---

## 7. Flujo de Rollback

### Si algo sale mal despues de un deploy

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE ROLLBACK                              │
└─────────────────────────────────────────────────────────────────┘

  ❌ Algo fallo en produccion
       │
       ▼
  ┌──────────────────────────────────────────────┐
  │ 1. Buscar el SHA del commit anterior         │
  │                                              │
  │    $ git log --oneline -5                    │
  │    abc1234 Deploy fallido  ← este fallo      │
  │    def5678 Version estable ← volver a este   │
  └──────────────────────┬───────────────────────┘
                         │
                         ▼
  ┌──────────────────────────────────────────────┐
  │ 2. En el servidor, ejecutar:                 │
  │                                              │
  │    $ ./scripts/rollback.sh def5678           │
  │                                              │
  │    Internamente hace:                        │
  │    - docker pull ghcr.io/.../backend:def5678 │
  │    - docker pull ghcr.io/.../nginx:def5678   │
  │    - docker compose up -d                    │
  └──────────────────────┬───────────────────────┘
                         │
                         ▼
                 ✅ Version anterior restaurada (~1 min)
                 (la base de datos NO se toca)
```

---

## 8. Resumen de las 4 Fases

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  FASE 1                FASE 2              FASE 3                │
│  Limpieza              Dockerizacion       Deuda tecnica         │
│                                                                  │
│  ┌──────────┐         ┌──────────┐        ┌──────────┐          │
│  │.gitignore│         │Dockerfile│        │ Cookies  │          │
│  │  limpio  │────────▶│ multi-   │   ┌───▶│ seguras  │          │
│  │          │         │ stage    │   │    └──────────┘          │
│  ├──────────┤         ├──────────┤   │    ┌──────────┐          │
│  │Artefactos│         │ Eliminar │   │    │ Cron job │          │
│  │ fuera de │         │  Flask   │   ├───▶│optimizado│          │
│  │   Git    │         │          │   │    └──────────┘          │
│  ├──────────┤         ├──────────┤   │    ┌──────────┐          │
│  │  .env    │         │  Nginx   │   │    │  Health  │          │
│  │ .example │         │ sirve la │   ├───▶│  checks  │          │
│  │          │         │   SPA    │   │    └──────────┘          │
│  └──────────┘         └────┬─────┘   │    ┌──────────┐          │
│                            │         │    │HTTP→HTTPS│          │
│  5 tickets                 │         └───▶│ redirect │          │
│  ~3 horas                  │              └──────────┘          │
│                            │                                     │
│                       4 tickets          4 tickets               │
│                       ~8 horas           ~3 horas                │
│                            │          (paralelo con F2)          │
│                            │                                     │
│                            ▼                                     │
│                                                                  │
│                       FASE 4                                     │
│                       CI/CD Real                                 │
│                                                                  │
│                       ┌──────────┐                               │
│                       │ Configurar│                              │
│                       │   GHCR   │                               │
│                       ├──────────┤                               │
│                       │ docker-  │                               │
│                       │ compose  │                               │
│                       │  .prod   │                               │
│                       ├──────────┤                               │
│                       │ GitHub   │                               │
│                       │ Actions  │                               │
│                       │ workflow │                               │
│                       ├──────────┤                               │
│                       │ Rollback │                               │
│                       │  script  │                               │
│                       └──────────┘                               │
│                                                                  │
│                       5 tickets                                  │
│                       ~7 horas                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

  TOTAL: 18 tickets | ~21 horas de trabajo | 4 semanas
```

---

## 9. Cronograma sugerido

```
         Semana 1        Semana 2        Semana 3        Semana 4
        ┌───────┐       ┌───────┐       ┌───────┐       ┌───────┐
        │       │       │       │       │       │       │       │
FASE 1  │███████│       │       │       │       │       │       │
        │       │       │       │       │       │       │       │
FASE 2  │       │       │███████│       │       │       │       │
        │       │       │       │       │       │       │       │
FASE 3  │       │       │░░░░░░░│░░░░░░░│       │       │       │
        │       │       │       │       │       │       │       │
FASE 4  │       │       │       │       │       │███████│       │
        │       │       │       │       │       │       │       │
        └───────┘       └───────┘       └───────┘       └───────┘

        ███ = trabajo principal
        ░░░ = en paralelo con otra fase
```

---

## 10. Tabla resumen de archivos que se modifican

| Archivo | Fase | Accion |
|---------|------|--------|
| `.gitignore` | 1 | Editar — agregar reglas faltantes |
| `Backend/.env.example` | 1 | Crear nuevo |
| `frontend/.env.example` | 1 | Crear nuevo |
| `.env.example` | 1 | Crear nuevo |
| `scripts/compilar_frontend.sh` | 1+2 | Eliminar (despues de Fase 2) |
| `nginx/Dockerfile` | 2 | Reescribir — multi-stage con React |
| `Backend/Dockerfile` | 2 | Reescribir — multi-stage |
| `nginx/conf.d/base.conf` | 2+3 | Reescribir — servir SPA + redirect HTTPS |
| `docker-compose.yml` | 2+3 | Editar — quitar Flask, agregar healthchecks |
| `flask/` (carpeta completa) | 2 | Eliminar |
| `Backend/source/app.ts` | 3 | Editar — cookies seguras |
| `Backend/source/cron-task/` | 3 | Editar — intervalo del cron |
| `docker-compose.prod.yml` | 4 | Crear nuevo |
| `.github/workflows/deploy.yml` | 4 | Reescribir — pipeline real |
| `scripts/rollback.sh` | 4 | Crear nuevo |
