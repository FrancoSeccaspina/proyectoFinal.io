# [Issue #3 — 1.3] Crear archivos .env.example para cada servicio

**Fecha:** 2026-02-18

## Resumen

Creación de archivos `.env.example` para cada servicio del proyecto (Backend, frontend y raíz Docker Compose), con el objetivo de documentar qué variables de entorno son necesarias para levantar el sistema. Esto permite que cualquier desarrollador nuevo pueda copiar los archivos y arrancar sin necesidad de pedir credenciales.

## Cambios Principales

- Creado `Backend/.env.example` con todas las variables del servicio Express (DB, sesión, JWT, URLs y cron)
- Creado `frontend/.env.example` con las variables de CRA (dominio y URLs de API)
- Creado `.env.example` en la raíz con las variables de Docker Compose (MySQL y GITHUB_PAT)
- Corregido `.gitignore`: el patrón `.env.*` excluía también a los `.env.example`, se agregaron excepciones `!.env.example` y `!**/.env.example`

## Flujo de Trabajo

```
Desarrollador nuevo clona el repo
  → Copia .env.example        →  Completa valores reales  →  docker compose up
  → Copia Backend/.env.example →  Completa valores reales  →  npm run start:dev
  → Copia frontend/.env.example → Completa valores reales  →  npm start
```

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `.env.example` | Creado — variables para Docker Compose (MySQL + GITHUB_PAT) |
| `Backend/.env.example` | Creado — variables del servicio Express/Sequelize |
| `frontend/.env.example` | Creado — variables de React CRA |
| `.gitignore` | Modificado — excepciones para no ignorar los `.env.example` |

## Notas Técnicas

- Los valores sensibles (`SESSION_PASSWORD`, `JWT_SECRET`, `MYSQL_ROOT_PASSWORD`, etc.) se dejan vacíos en los `.env.example`; el desarrollador debe completarlos.
- Las URLs de producción (`https://activafitness.com.ar`) se incluyen comentadas como referencia.
- El `.env` raíz tenía un `GITHUB_PAT` real commiteado — ese token debe ser revocado en GitHub Settings > Developer settings > Personal access tokens.
- `GITHUB_PAT` se documenta en `.env.example` raíz ya que es referenciado por el workflow de CI/CD (`.github/workflows/deploy.yml`).
