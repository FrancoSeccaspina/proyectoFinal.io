# Auditoría Técnica — Gimnasio Activa (activafitness.com.ar)

**Fecha:** 2026-02-08
**Repositorio:** `proyectoFinal.io`
**Rama principal:** `main`

---

## 1. Stack Tecnológico

### Frontend
| Capa | Tecnología |
|---|---|
| Framework | React 19 (Create React App) |
| Routing | React Router DOM 6 |
| HTTP Client | Axios 1.9 |
| Lenguaje | JavaScript (JSX) |
| Build tool | react-scripts 5.0.1 |

### Backend
| Capa | Tecnología |
|---|---|
| Runtime | Node.js 22 |
| Framework | Express 4.21 |
| Lenguaje | TypeScript 5.8 |
| Template engine | EJS 3.1 |
| ORM | Sequelize 6.37 + mysql2 3.14 |
| Auth | JWT (jsonwebtoken 9) + express-session |

### Base de datos
| Motor | Versión | Puerto |
|---|---|---|
| MySQL | 8.0 | 3307 → 3306 (Docker) |

### Infraestructura
| Componente | Tecnología |
|---|---|
| Reverse proxy | Nginx 1.21.6 |
| SPA host | Flask (Python 3.13) + Gunicorn |
| SSL | Let's Encrypt / Certbot |
| Contenedores | Docker Compose |
| CI/CD | GitHub Actions (verificación básica) |

---

## 2. Arquitectura

### Servicios Docker (docker-compose.yml)

```
activafitness.com.ar          dashboard.activafitness.com.ar
         |                               |
    activa-nginx (80/443)
         |                               |
activa-backend:3032          activa-flask:5000
         |
    activa-db:3306 (MySQL)
```

| Servicio | Imagen base | Puerto | Rol |
|---|---|---|---|
| `activa-db` | mysql:8.0 | 3307:3306 | Base de datos principal |
| `activa-backend` | node:22-alpine | 3032:3032 | API REST + vistas EJS |
| `activa-flask` | python:3.13.3-alpine3.21 | 5000:5000 | Sirve el build estático de React |
| `activa-nginx` | nginx:1.21.6 | 80/443 | Reverse proxy con SSL |

### Estructura de carpetas clave

```
proyectoFinal.io/
├── Backend/
│   ├── source/
│   │   ├── app.ts                  # Entry point: monta middlewares y rutas
│   │   ├── configEnv.ts            # Lectura y validación de variables de entorno
│   │   ├── controllers/
│   │   │   ├── api/                # 16 controllers para la REST API (dashboard)
│   │   │   └── *.ts                # Controllers para vistas EJS (web pública)
│   │   ├── database/
│   │   │   ├── connection/         # Conexión Sequelize
│   │   │   └── models/             # 19 modelos Sequelize
│   │   ├── middlewares/            # isAuthenticated, verificarToken, rutaNoEncontrada
│   │   ├── routes/
│   │   │   ├── api/                # 16 archivos de rutas bajo prefijo /api
│   │   │   └── *.ts                # Rutas web (EJS)
│   │   ├── validations/            # Esquemas express-validator
│   │   ├── services/               # Lógica de negocio (carrito, sesión)
│   │   ├── cron-task/              # Job de devolución de stock (cada 1 minuto)
│   │   ├── constants/              # Roles y estados (enums)
│   │   └── config/mailer.ts        # Configuración Nodemailer
│   ├── public/                     # Assets estáticos (CSS, imágenes, docs)
│   └── Dockerfile
├── frontend/
│   └── src/
│       ├── App.jsx                 # Router principal (20 rutas)
│       ├── component/              # Páginas (Home, Productos, Reservas, etc.)
│       ├── ABM/                    # Formularios CRUD (Alta, Edición, Eliminación)
│       ├── charts/                 # Visualizaciones (Recharts, Lightweight Charts)
│       ├── css/                    # Hojas de estilo
│       ├── utils/ y constants/     # Helpers y constantes
│       └── main.jsx
├── flask/
│   ├── app/app.py                  # Flask SPA host (catch-all → index.html)
│   └── Dockerfile
├── nginx/
│   ├── conf.d/base.conf            # Virtual hosts con SSL
│   └── Dockerfile                  # Nginx + Certbot instalado
├── scripts/                        # Utilidades: compilar frontend, backups DB
├── docker-compose.yml
├── .env                            # Variables para Docker Compose (MySQL)
└── .github/workflows/deploy.yml    # Pipeline CI (verificación estructural)
```

### Patrones de diseño identificados

- **MVC** en el backend: controllers, models (Sequelize), views (EJS).
- **Repository-like** implícito: los controllers de API acceden directamente a los modelos Sequelize, sin capa Repository formal.
- **Middleware chain**: autenticación por cookies JWT, validación de roles (`verificarTokenPorRol`), validación de entrada (`express-validator`).
- **RBAC (Role-Based Access Control)**: roles `admin`, `cliente`, `invitado`, `jubilado`, `socio` definidos como enum.
- **SPA + API híbrida**: la web pública usa SSR con EJS; el dashboard de gestión es una SPA React que consume la misma API.
- **Cron job**: `node-cron` ejecuta cada minuto la devolución de stock de reservas vencidas.

---

## 3. Dependencias Críticas

### Backend (`Backend/package.json`)

| Librería | Versión | Propósito |
|---|---|---|
| `express` | ^4.21.2 | Framework HTTP principal |
| `sequelize` | ^6.37.7 | ORM para MySQL |
| `mysql2` | ^3.14.0 | Driver MySQL para Sequelize |
| `jsonwebtoken` | ^9.0.2 | Generación y validación de tokens JWT |
| `express-session` | ^1.18.1 | Gestión de sesiones en vistas EJS |
| `bcryptjs` | ^3.0.2 | Hashing de contraseñas |
| `multer` | ^1.4.5-lts.2 | Upload de imágenes (productos, avatares, aptos médicos) |
| `nodemailer` | ^7.0.5 | Envío de emails (recuperación de contraseña) |
| `node-cron` | ^4.1.0 | Tareas programadas (stock de reservas) |
| `express-validator` | ^6.15.0 | Validación de formularios |
| `dotenv` | ^16.5.0 | Carga de variables de entorno |
| `ejs` | ^3.1.10 | Template engine para vistas web |
| `cors` | ^2.8.5 | Control de CORS entre dominio backend y frontend |
| `method-override` | ^3.0.0 | Soporte PUT/DELETE en formularios HTML |

### Frontend (`frontend/package.json`)

| Librería | Versión | Propósito |
|---|---|---|
| `react` | ^19.1.0 | Framework UI |
| `react-router-dom` | ^6.30.0 | Routing SPA |
| `axios` | ^1.9.0 | Cliente HTTP para consumir la API |
| `@fullcalendar/*` | ^6.1.19 | Calendario interactivo de reservas |
| `recharts` | ^2.15.3 | Gráficos (estadísticas de cuotas y ventas) |
| `lightweight-charts` | ^5.0.7 | Gráficos financieros/temporales (pago proveedores) |
| `react-toastify` | ^10.0.6 | Notificaciones toast |
| `xlsx` | ^0.18.5 | Exportación de datos a Excel |

### Infraestructura (Flask)

| Librería | Propósito |
|---|---|
| `flask` | Micro-framework para servir la SPA compilada |
| `gunicorn` | WSGI server en producción |

---

## 4. Endpoints / Rutas Principales

### API REST (`/api/*`) — requiere JWT en cookie `token`

| Recurso | Método | Ruta | Roles |
|---|---|---|---|
| Productos | GET | `/api/productos` | Público |
| Productos | GET | `/api/productos/:id` | Público |
| Productos | POST | `/api/productos` | Admin |
| Productos | PUT | `/api/productoEditar/:id` | Admin |
| Productos | DELETE | `/api/productos/:id` | Admin |
| Usuarios | GET | `/api/usuarios` | Público |
| Usuarios | GET | `/api/usuarios/:id` | Público |
| Usuarios | PUT | `/api/usuarioEditar/:id` | Admin |
| Usuarios | DELETE | `/api/usuarios/:id` | Admin |
| Usuarios | POST | `/api/usuariosChangePassword` | Admin |
| Ejercicios | GET/POST/PUT/DELETE | `/api/ejercicios[/:id]` | GET público, resto Admin |
| Recetas | GET/POST/PUT/DELETE | `/api/recetas[/:id]` | GET público, resto Admin |
| Reservas | GET | `/api/reservas/mostrar` | Admin |
| Reservas | PUT | `/api/reservas/confirmar/:id` | Admin |
| Reservas | PUT | `/api/reservas/cancelar/:id` | Admin |
| Reservas | DELETE | `/api/reservas/:id_reserva` | Admin + Cliente |
| Reservas | GET | `/api/reservas/estadisticasPorProducto` | Admin |
| Cuotas | GET | `/api/cuotas` | Admin |
| Cuotas | GET | `/api/cuotasdelUsuario/:id_usuario` | Público |
| Cuotas | POST/PUT/DELETE | `/api/cuotas[/:id]` | Admin |
| Cuotas | GET | `/api/estadisticas` | Público |
| Membresías | GET | `/api/membresias/mostrar` | Público |
| Transacciones | GET | `/api/transacciones/mostrar` | Público |
| Proveedores | GET/POST/PUT/DELETE | `/api/proveedores[/:id]` | GET público, resto Admin |
| Empleados | GET/POST/PUT/DELETE | `/api/empleados[/:id]` | Sin restricción de rol explícita |
| Precio Cuota | GET/POST | `/api/precioCuota` | Admin |
| Actividad | GET/POST/PUT/DELETE | `/api/actividad[/:id]` | Admin |
| Gestion Pagos | (CRUD) | `/api/...` | Admin |
| Categorías | (CRUD) | `/api/categorias[/:id]` | Mixto |

### Rutas web EJS (activafitness.com.ar — web pública)

| Ruta | Función |
|---|---|
| `POST /users/save` | Registro de usuario |
| `POST /users/login` | Login (sesión + cookie JWT) |
| `GET /users/logout` | Cierre de sesión |
| `GET /users/show/:id` | Perfil de usuario |
| `POST /users/update-password` | Solicitud recuperación de contraseña |
| `POST /users/change-password/:token` | Cambio de contraseña por token |
| `GET /users/change-password/:token` | Render formulario cambio contraseña |

### Rutas SPA React (dashboard.activafitness.com.ar)

| Ruta | Componente |
|---|---|
| `/` | Home (métricas generales) |
| `/Productos` | Listado y gestión de productos |
| `/Usuarios` | Listado y gestión de usuarios |
| `/Rutinas` | Gestión de ejercicios/rutinas |
| `/Recetas` | Gestión de recetas |
| `/Proveedores` | Gestión de proveedores |
| `/Reservas` | Listado de reservas |
| `/Reserva/:id` | Detalle de reserva |
| `/PrecioCuota` | Configuración de precios de cuota |
| `/Empleados` | Gestión de empleados |
| `/Actividad` | Gestión de actividades |
| `/productoNuevo`, `/rutinaNueva`, etc. | Formularios de alta |
| `/productos/editar/:id`, etc. | Formularios de edición |
| `/cuota/:id` | Formulario de pago de cuota |

---

## 5. Configuraciones de Entorno y Despliegue

### Variables de entorno

**`/.env`** (para Docker Compose — MySQL)
```env
MYSQL_ROOT_PASSWORD=...
DATABASE_NAME=gimnasio_activa
DATABASE_USER=...
DATABASE_PASSWORD=...
```

**`/Backend/.env`** (cargado por el servicio `activa-backend`)
```env
DATABASE_NAME=
DATABASE_USER_CONECT=
DATABASE_PASSWORD_CONECT=
DATABASE_HOST=
PORT=
SESSION_PASSWORD=
JWT_SECRET=
REACT_APP_FRONTEND_DOMAIN_HOST=
REACT_APP_BACKEND_DOMAIN_HOST=
TIEMPO_CONTROL_STOCK_MINUTOS=
```

**`/frontend/.env`**
```env
REACT_APP_FRONTEND_DOMAIN_HOST=
REACT_APP_BACKEND_DOMAIN_HOST=
```

### Dockerfiles

| Servicio | Base | Build |
|---|---|---|
| Backend | `node:22-alpine` | `tsc` → `dist/` + copia vistas y assets |
| Flask | `python:3.13.3-alpine3.21` | pip install flask + gunicorn |
| Nginx | `nginx:1.21.6` | Instala Certbot para renovación SSL |

### Nginx (nginx/conf.d/base.conf)

- `activafitness.com.ar` → proxy a `activa-backend:3032`
- `dashboard.activafitness.com.ar` → proxy a `activa-flask:5000`
- SSL: certificados en `/etc/letsencrypt/live/activafitness.com.ar/`

### CI/CD (.github/workflows/deploy.yml)

- Trigger: push a `main` o manual (`workflow_dispatch`)
- Ejecución: `ubuntu-latest`
- Estado actual: **pipeline de verificación estructural** (checkout + simulación de build). No hay despliegue automático configurado.

### Scripts de utilidad (scripts/)

| Script | Función |
|---|---|
| `compilar_frontend.sh` | Build de React y copia a `flask/app/static/` |
| `actualizar_db_local.sh` | Actualización de base de datos local |
| `generar-backup-gimnasio-activa.sh` | Backup completo de la base de datos |
| `mysqldump-backup.sh` | Dump de MySQL (montado en el contenedor `activa-db`) |

### Modelos de base de datos (Sequelize)

19 modelos inicializados al arranque:

`Usuario`, `Autenticacion`, `Producto`, `Categoria`, `Ejercicio`, `Receta`, `CategoriaReceta`, `GrupoMuscular`, `Proveedor`, `Compra`, `Reserva`, `DetalleReserva`, `Cuota`, `Membresia`, `Precio_Cuota`, `Transaccion`, `Empleado`, `GestionPagoProveedores`, `Actividad`

La asociación de modelos se ejecuta dinámicamente al inicializar (`model.associate(models)` si existe el método estático).

---

## Observaciones técnicas

1. **Autenticación dual**: El sistema usa `express-session` para las vistas EJS (web pública) y JWT en cookie `HttpOnly` para la API consumida por el dashboard React. El middleware `verificarTokenPorRol` lee el token desde `req.cookies.token`.

2. **CORS**: Configurado para permitir únicamente el origen definido en `REACT_APP_FRONTEND_DOMAIN_HOST` con `credentials: true`.

3. **Cron job**: La tarea `devolver-stock-reservas-vencidas` se ejecuta **cada minuto** (`* * * * *`), lo que puede generar carga innecesaria en base de datos. Considerar aumentar el intervalo o usar un trigger de base de datos.

4. **Pipeline CI/CD incompleto**: El workflow de GitHub Actions solo verifica estructura y no despliega. El despliegue al servidor de producción se realiza manualmente via Docker Compose.

5. **Cookie de sesión insegura**: En `app.ts` la cookie de sesión tiene `secure: false` con un comentario de "Cambiar a true en producción". Esto debe corregirse para el entorno productivo detrás de HTTPS.
