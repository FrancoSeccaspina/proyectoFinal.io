# Flujo de Trabajo: Deploy con GitHub Actions

## Resumen

El deploy está dividido en dos jobs que corren en secuencia en GitHub Actions. El código de la aplicación **no se ejecuta directamente desde el repo del servidor** — se compila en GitHub, se empaqueta en imágenes Docker y se sube a GHCR (GitHub Container Registry). El servidor solo descarga esas imágenes y las levanta.

---

## Disparadores del workflow

El workflow `.github/workflows/deploy.yml` se activa en dos situaciones:

- Push a `main` (automático)
- `workflow_dispatch` (manual desde la UI de GitHub Actions, permite elegir el branch)

---

## Etapa 1: Job `build-and-push` (corre en GitHub)

Se ejecuta en el servidor de GitHub (`ubuntu-latest`), **no en tu VPS**.

### Pasos

1. **Checkout del código** — descarga el código del branch que disparó el workflow
2. **Login a GHCR** — usando `GITHUB_TOKEN` (automático, no requiere secret manual)
3. **Build y Push del backend** — compila el TypeScript a JS dentro de la imagen Docker y la sube como `ghcr.io/francoseccaspina/activa-backend:latest`
4. **Build y Push de nginx** — compila el frontend React y lo incluye en la imagen nginx, la sube como `ghcr.io/francoseccaspina/activa-nginx:latest`

> Las imágenes quedan etiquetadas con `:latest` y con el SHA del commit.

---

## Etapa 2: Job `deploy` (corre en GitHub, actúa sobre el VPS)

Se ejecuta después de que `build-and-push` termina correctamente. Se conecta al VPS por SSH y ejecuta un script.

### Paso 1 — Login a GHCR en el servidor

```bash
echo "${PAT_PRODUCCION}" | docker login ghcr.io -u francoseccaspina --password-stdin
```

Usa el Personal Access Token de Franco para que el servidor pueda bajar imágenes privadas de GHCR.

### Paso 2 vallores secretos en github

```bash
cat > /root/proyectoFinal.io/.env << ENVEOF
MYSQL_ROOT_PASSWORD=...
DATABASE_NAME=...
DATABASE_USER=...
DATABASE_PASSWORD=...
DATABASE_HOST=activa-db
PORT=3032
SESSION_PASSWORD=...
JWT_SECRET=...
TIEMPO_CONTROL_STOCK_MINUTOS=30
...
ENVEOF
```

Los valores vienen de los **GitHub Secrets** configurados en el repositorio. Este archivo se usa en dos lugares:
- Docker Compose lo lee para pasar variables a los contenedores (`env_file: .env`)
- La base de datos MySQL lo usa para su configuración inicial

### Paso 3 — Actualizar el repo en el servidor

```bash
git pull origin <brach>
```

Actualiza los archivos de configuración: `docker-compose.prod.yml`, configuración de nginx, scripts de backup, etc.

### Paso 4 — Bajar las imágenes nuevas y levantar contenedores

```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
docker image prune -f
```

---

## Etapa 3: Docker Compose levanta los contenedores en el VPS

### Orden de inicio (por dependencias de healthcheck)

```
activa-db (MySQL)
  └── healthcheck: mysqladmin ping cada 30s, hasta 5 reintentos
  
activa-backend (Node.js) ← espera a que activa-db esté healthy
  └── recibe variables de entorno via "env_file: .env"
  └── healthcheck: GET /api/health cada 30s
  
activa-nginx ← espera a que activa-backend esté healthy
  └── sirve el frontend estático y hace proxy al backend
```

> El backend puede tardar hasta ~2.5 minutos en arrancar si MySQL demora en inicializarse.

---

## Variables de entorno en el backend

El backend usa `dotenv` para leer variables, pero en producción las variables llegan por otro camino:

1. Docker Compose carga el `.env` del servidor → las variables quedan disponibles en `process.env` dentro del contenedor
2. El `dotenv.config()` del código intenta leer `/app/dist/.env` dentro del contenedor → ese archivo **no existe**, pero falla silenciosamente
3. Las variables ya están en `process.env` por el paso 1, así que `validarVariablesDeEntorno()` las encuentra correctamente

---

## Problema común: imagen desactualizada

**Síntoma:** el servidor arranca con código viejo aunque el workflow haya corrido.

**Causa:** el job `build-and-push` compila el código del branch seleccionado **en GitHub** (no local). Si el branch en GitHub no tiene los últimos cambios (porque no se hizo `git push`), la imagen se construye con código desactualizado.


**Solución:** asegurarse de que el branch en GitHub esté actualizado antes de triggear el workflow:

```bash
git push origin <branch>
```

---

## Relación entre branches y deploy

| Branch | Deploy automático | Notas |
|--------|-------------------|-------|
| `main` | Sí, en cada push | Branch principal, siempre debe tener código estable |
| `otro branch` | No (solo manual) | Para probar el flujo de deploy antes de mergear a main |

### Opciones para aplicar cambios a producción

**Opció n A — Pull Request (recomendado para cambios revisados):**
```bash
git push origin feature/mi-cambio
# Abrir PR en GitHub → mergear a main → deploy automático
```

**Opción B — Merge directo a main (para cambios rápidos o urgentes):**
```bash
git checkout main
git merge feature/mi-cambio
git push origin main
# El push a main dispara el deploy automáticamente
```

Si un branch queda desincronizado con `main`, sincronizarlo antes de deployar:

```bash
git checkout <branch>
git merge main
git push origin <branch>
```

---

## Secrets requeridos en GitHub

| Secret | Uso |
|--------|-----|
| `MYSQL_ROOT_PASSWORD` | Password root de MySQL |
| `DATABASE_NAME` | Nombre de la base de datos |
| `DATABASE_USER` | Usuario de la base de datos |
| `DATABASE_PASSWORD` | Password del usuario de BD |
| `SESSION_PASSWORD` | Clave para encriptar sesiones |
| `JWT_SECRET` | Clave para firmar tokens JWT |
| `TIEMPO_CONTROL_STOCK_MINUTOS` | Intervalo del cron de stock |
| `REACT_APP_FRONTEND_DOMAIN_HOST` | Dominio del frontend (usado en build) |
| `REACT_APP_BACKEND_DOMAIN_HOST` | Dominio del backend (usado en build) |
| `PAT_PRODUCCION` | Personal Access Token de Franco para GHCR |
| `SERVER_HOST` | IP o dominio del VPS |
| `SERVER_USER` | Usuario SSH del VPS |
| `SERVER_SSH_KEY` | Clave privada SSH |
| `SERVER_SSH_PORT` | Puerto SSH del VPS |
