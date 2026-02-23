# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Idioma de comunicación

Toda comunicación con el usuario debe realizarse **en español**.

## Descripción del proyecto

Gimnasio Activa — sistema de gestión de gimnasio con dos interfaces web servidas mediante Docker Compose:
- **Sitio público** (`activafitness.com.ar`): páginas renderizadas por Express/EJS para clientes (login, productos, reservas, rutinas, recetas)
- **Panel de administración** (`dashboard.activafitness.com.ar`): SPA de React servida por Flask, se comunica con la API de Express vía REST

## Arquitectura

```
Nginx (80/443, SSL via Let's Encrypt)
  ├── activafitness.com.ar      → activa-backend:3032 (Express + EJS)
  └── dashboard.activafitness.com.ar → activa-flask:5000 (Flask sirviendo build de React)

activa-backend ↔ activa-db (MySQL 8.0, puerto 3307)
```

La SPA de React se compila y luego se mueve a `flask/app/static/`, donde Flask la sirve con enrutamiento fallback para SPA. La SPA realiza llamadas a la API del backend Express en `/api/*`.

## Stack tecnológico

- **Backend**: Node.js 22, TypeScript 5.8, Express 4, Sequelize 6, MySQL 8.0, plantillas EJS
- **Frontend**: React 19 (CRA/react-scripts 5), JSX, React Router 6, Axios, FullCalendar, Recharts
- **Flask**: Python 3.13, Gunicorn — solo sirve el build estático de React
- **Infraestructura**: Docker Compose, Nginx con Certbot

## Comandos de desarrollo

### Stack completo (Docker)
```bash
docker compose up          # Inicia todos los servicios (db, backend, nginx, flask)
```

### Solo backend (desarrollo local)
```bash
cd Backend
npm run start:dev          # nodemon + ts-node, observa source/
npm run build              # tsc + copia vistas y assets públicos a dist/
npm start                  # node dist/source/app.js (producción)
```

### Solo frontend (desarrollo local)
```bash
cd frontend
npm start                  # Servidor de desarrollo de React (CRA)
npm test                   # Jest + React Testing Library
npm run build              # Build de producción
```

### Build del frontend para despliegue
```bash
# DEPRECADO — ver scripts/compilar_frontend.DEPRECATED.sh
# Será reemplazado por Docker multi-stage (Ticket 2.1 del plan de deploy)
bash scripts/compilar_frontend.DEPRECATED.sh
```

### Ambos (concurrentemente)
```bash
npm start                  # Desde la raíz: ejecuta backend y frontend con concurrently
```

## Puntos de entrada clave

| Componente | Punto de entrada |
|------------|------------------|
| App backend | `Backend/source/app.ts` — registra middleware, rutas, cron, inicia el servidor |
| Modelos y asociaciones de DB | `Backend/source/database/models/index.ts` |
| Conexión a DB | `Backend/source/database/connection/connection.ts` |
| Configuración de entorno | `Backend/source/configEnv.ts` |
| Middleware JWT auth | `Backend/source/middlewares/verificarToken.ts` |
| Rutas API | `Backend/source/routes/api/*.ts` (16 módulos de rutas, todos bajo `/api`) |
| Cron job (devolución de stock) | `Backend/source/cron-task/devolver-stock-reservas-vencidas.ts` |
| Raíz de la app React | `frontend/src/App.jsx` (25+ rutas) |
| Servidor SPA Flask | `flask/app/app.py` |
| Configuración Nginx | `nginx/conf.d/base.conf` |
| Orquestación Docker | `docker-compose.yml` |

## Autenticación

Sistema de autenticación en dos capas:
- **Sitio EJS**: sesiones de Express (`express-session`)
- **API/Dashboard**: JWT almacenado en cookies, verificado por el middleware `verificarTokenPorRol()`
- Contraseñas hasheadas con bcryptjs
- Roles: `admin`, `cliente`, `invitado`, `jubilado`, `socio`

## Base de datos

- MySQL 8.0, nombre de base de datos `gimnasio_activa`
- 20 modelos Sequelize en `Backend/source/database/models/`
- Dump del esquema: `gimnasio_activa.sql`
- Entidades clave: Usuario, Autenticacion, Producto, Categoria, Ejercicio, Receta, Proveedor, Compra, Reserva, DetalleReserva, Cuota, Membresia, Transaccion, Empleado, Actividad

## Variables de entorno

- `Backend/.env`: credenciales de DB, secreto JWT, contraseña de sesión, dominios CORS, puerto 3032
- `frontend/.env`: `REACT_APP_BACKEND_DOMAIN_HOST`, `REACT_APP_FRONTEND_DOMAIN_HOST`
- `TIEMPO_CONTROL_STOCK_MINUTOS=30` — intervalo del cron para devolver stock de reservas vencidas

## 🛑 Restricciones de Ejecución (Strict Guardrails)

Como asistente técnico, debes seguir el principio de **Mínima Acción Necesaria**, A MENOS que exista una instrucción explícita y directa en el prompt actual que solicite lo contrario:

1. **Sin Tareas Fantasma:** No realices tareas adicionales no solicitadas. (Ej: Si pido "crear función X", no crees también "test_X.py" a menos que lo pida).
2. **Control de Git:** No ejecutes comandos de Git de forma autónoma. Solo puedes ejecutarlos si el prompt dice exactamente "haz commit" o "sube los cambios". De lo contrario, solo sugiere el comando.
3. **Escritura Silenciosa:** No generes documentación ni archivos auxiliares automáticamente, excepto cuando la tarea principal sea la documentación misma.
4. **Prioridad del Prompt:** Las instrucciones directas del chat actual tienen JERARQUÍA MÁXIMA y anulan estas restricciones preventivas. Si pido una refactorización masiva, ignora la restricción de "Mínima Acción" para esa tarea específica.
5. **Confirmación:** Si detectas una contradicción entre estas reglas y mi pedido, prioriza mi pedido pero infórmame brevemente antes de proceder.

## Deuda técnica conocida

- `node_modules/`, `build/` y `flask/app/static/` (React compilado) están commiteados — deberían estar en .gitignore
- Los archivos `.env` están commiteados en el repositorio
- El workflow de GitHub Actions (`.github/workflows/deploy.yml`) es un stub — aún no hay CI/CD real
- Plan de modernización registrado en `doc/plan-de-deploy.md` (18 tickets)
