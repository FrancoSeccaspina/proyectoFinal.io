# Eliminación del servicio Flask y limpieza de docker-compose

**Fecha:** 2026-02-23

## Resumen

Se elimina el servicio `activa-flask` del stack de Docker y sus archivos asociados, dado que Nginx ya sirve la SPA de React directamente desde su imagen multi-stage (implementado en el ticket 2.1). Flask fue un intermediario transitorio que ya no cumple ninguna función.

## Cambios Principales

- Eliminado `flask/Dockerfile` — ya no hay contenedor Flask que construir
- Eliminado `flask/app/app.py` — lógica de fallback SPA que ahora maneja Nginx con `try_files`
- Eliminado el bloque comentado de `activa-flask` en `docker-compose.yml`
- Agregado `depends_on: activa-backend` al servicio `activa-nginx`
- Agregado volumen `./nginx/conf.d:/etc/nginx/conf.d` para montar la configuración de Nginx en tiempo de ejecución
- Limpieza de comentarios redundantes en `docker-compose.yml`
- Agregada sección de **Restricciones de Ejecución** en `CLAUDE.md`

## Flujo de Trabajo

**Antes (con Flask):**
```
Navegador → Nginx (dashboard.activafitness.com.ar)
           → proxy_pass activa-flask:5000 (Gunicorn + Flask)
              → serve_from_directory('static', 'index.html')
```

**Después (solo Nginx):**
```
Navegador → Nginx (dashboard.activafitness.com.ar)
           → root /usr/share/nginx/html/dashboard
              → try_files $uri $uri/ /index.html
```

Nginx utiliza el directorio `/usr/share/nginx/html/dashboard`, donde el build de React fue copiado durante la etapa multi-stage del `Dockerfile` de Nginx.

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `flask/Dockerfile` | **Eliminado** — contenedor Flask descartado |
| `flask/app/app.py` | **Eliminado** — servidor SPA reemplazado por Nginx |
| `docker-compose.yml` | Eliminado servicio `activa-flask`, agregado `depends_on` y volumen de conf para Nginx |
| `CLAUDE.md` | Agregada sección de Restricciones de Ejecución |

## Notas Técnicas

- El directorio `flask/app/static/` (donde vivía el build de React antes) sigue existiendo en el repositorio pero ya no es el destino de despliegue.
- La lógica SPA fallback (`try_files`) es equivalente a lo que hacía `app.py` pero sin overhead de Python/Gunicorn.
- El volumen `./nginx/conf.d:/etc/nginx/conf.d` permite modificar `base.conf` sin reconstruir la imagen de Nginx.
- El orden de arranque correcto queda garantizado: `activa-db → activa-backend → activa-nginx`.
