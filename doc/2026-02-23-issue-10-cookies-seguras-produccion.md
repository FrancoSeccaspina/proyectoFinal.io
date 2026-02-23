# [3.1] Forzar cookies seguras en producción

**Fecha:** 2026-02-23
**Issue:** #10 — Fase 3: Resolución de Deuda Técnica

## Resumen

Se implementó la configuración condicional de cookies seguras según el entorno de ejecución. En producción (Docker), las cookies del sitio y del JWT viajan únicamente por HTTPS con los flags `secure` y `sameSite` activos. En desarrollo local, las cookies funcionan sin HTTPS para no interrumpir el flujo de trabajo.

## Cambios Principales

- Nueva constante `IS_PRODUCTION` en `configEnv.ts`, derivada de `process.env.NODE_ENV === 'production'`
- Cookie de sesión (`express-session`) ahora usa `secure: IS_PRODUCTION` en lugar del valor hardcodeado `false`
- Cookie JWT (`token`) suma los flags `secure` y `sameSite` con valores condicionales según entorno
- `clearCookie` en el middleware de verificación de token ahora usa las mismas opciones que el `set`, garantizando que el borrado funcione en todos los browsers
- `docker-compose.yml`: agregado bloque `environment` con `NODE_ENV: production` para el servicio `activa-backend`, que tiene mayor prioridad que el `env_file`
- `Backend/.env.example`: documentada la nueva variable `NODE_ENV` con comentario explicativo

## Flujo de Trabajo

**Punto de entrada:** `configEnv.ts` — al arrancar el servidor, `IS_PRODUCTION` se evalúa una vez a partir de `NODE_ENV`

```
[process.env.NODE_ENV] → IS_PRODUCTION (boolean)
        ↓
┌───────────────────────────────────────────────────┐
│ IS_PRODUCTION = true  → secure: true, sameSite: strict  │  Docker / producción
│ IS_PRODUCTION = false → secure: false, sameSite: lax    │  npm run start:dev
└───────────────────────────────────────────────────┘
        ↓
  [session cookie]  [JWT cookie set]  [JWT cookie clear]
```

**¿Cómo se controla por entorno?**

| Entorno | Cómo se define `NODE_ENV` | Valor |
|---|---|---|
| Desarrollo local | `Backend/.env` | `development` |
| Docker (producción) | `docker-compose.yml → environment:` | `production` |

El bloque `environment:` del compose pisa el valor del `env_file`, por lo que un único archivo `.env` sirve para ambos contextos sin necesidad de duplicarlo.

## Archivos Afectados

| Archivo | Cambio |
|---------|--------|
| `Backend/source/configEnv.ts` | Nueva constante `IS_PRODUCTION` exportada |
| `Backend/source/app.ts` | Session cookie: `secure: IS_PRODUCTION` |
| `Backend/source/controllers/usersController.ts` | JWT cookie: agrega `secure` y `sameSite` condicionales |
| `Backend/source/middlewares/verificarToken.ts` | `clearCookie`: mismas opciones que el `set` |
| `docker-compose.yml` | Bloque `environment: NODE_ENV: production` en `activa-backend` |
| `Backend/.env.example` | Documenta la variable `NODE_ENV=development` |

## Notas Técnicas

- **`sameSite: 'lax'` en desarrollo**: el valor `'strict'` bloquea la cookie en redirects cross-origin, lo que rompe el flujo de login local (Express redirige al frontend en un dominio distinto). En producción se usa `'strict'` porque todo está bajo el mismo dominio con SSL.
- **`clearCookie` debe reflejar el `set`**: los browsers solo borran una cookie si las opciones del `clear` coinciden con las del `set`. Antes, `clearCookie` en `verificarToken.ts` tenía `sameSite: 'strict'` hardcodeado pero el `set` no tenía `sameSite`, lo cual era inconsistente.
- **`Backend/.env` no se committea**: fue resuelto en el issue #1 ([1.1] Limpiar .gitignore). El cambio local a `Backend/.env` existe solo en disco y no ingresa al historial de Git.
