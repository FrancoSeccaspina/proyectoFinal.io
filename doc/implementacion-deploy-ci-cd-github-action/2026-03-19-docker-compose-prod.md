# Separación de entornos: docker-compose.prod.yml [Ticket 4.2]

**Fecha:** 2026-03-19

## Resumen

Se crea `docker-compose.prod.yml` para que el servidor de producción descargue imágenes pre-construidas desde GitHub Container Registry (GHCR) en lugar de compilarlas localmente. Esto es el paso previo al flujo CI/CD del Ticket 4.3, donde GitHub Actions compilará y publicará las imágenes automáticamente. Adicionalmente, se unificó la convención de build contexts en `docker-compose.yml`.

## Cambios Principales

- Creado `docker-compose.prod.yml` con imágenes desde GHCR y healthchecks ajustados a 30s
- `docker-compose.yml`: build context de `activa-nginx` cambiado de `context: .` a `context: ./nginx` con `additional_contexts` para el frontend
- `nginx/Dockerfile`: rutas de `COPY` ajustadas al nuevo contexto (`--from=frontend` y sin prefijo `nginx/`)
- `doc/plan-de-deploy.md`: Ticket 4.2 marcado como Completado

## Flujo de Trabajo

### Desarrollo local (`docker-compose.yml`)
```
docker compose build → compila Backend y nginx (con React embebido) localmente
docker compose up    → levanta db + backend + nginx desde imágenes locales
```

### Producción (`docker-compose.prod.yml`)
```
GitHub Actions (Ticket 4.3)
  → compila imágenes
  → pushea a GHCR (ghcr.io/francoseccaspina/activa-backend:latest
                    ghcr.io/francoseccaspina/activa-nginx:latest)

Servidor de producción
  → docker compose -f docker-compose.prod.yml pull   (descarga imágenes)
  → docker compose -f docker-compose.prod.yml up -d  (levanta servicios)
```

### Build de nginx con nuevo contexto
```
context: ./nginx  +  additional_contexts: frontend: ./frontend
         │                                          │
         └── renew.sh, conf.d/, Dockerfile          └── package.json, src/, etc.
                                    │
                    COPY --from=frontend . ./   ← inyectado como contexto nombrado
                    RUN npm run build
                    COPY --from=frontend-build /app/build → /usr/share/nginx/html/dashboard
```

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `docker-compose.prod.yml` | Creado — orquestación para producción con imágenes de GHCR |
| `docker-compose.yml` | Build context de `activa-nginx`: `context: .` → `context: ./nginx` + `additional_contexts` |
| `nginx/Dockerfile` | `COPY frontend/...` → `COPY --from=frontend ...`; rutas `renew.sh` y `conf.d/` sin prefijo `nginx/` |
| `doc/plan-de-deploy.md` | Ticket 4.2 → Completado |

## Notas Técnicas

- **`additional_contexts`** es una feature de Docker BuildKit. Permite inyectar un directorio externo al build context principal bajo un nombre arbitrario, referenciable con `COPY --from=<nombre>`. Requiere BuildKit activo (por defecto en Docker 23+).
- Los healthcheck intervals en producción son 30s (vs 10–15s en desarrollo) para reducir carga innecesaria en el servidor.
- `docker-compose.prod.yml` no tiene sección `build:` en ningún servicio — si se ejecuta `docker compose -f docker-compose.prod.yml build` por error, no hará nada.
- El volumen `activa-db-data` se declara en ambos compose files; Docker los trata como volúmenes independientes si se usan en proyectos distintos. En el servidor se debe usar siempre el mismo archivo para preservar los datos.
