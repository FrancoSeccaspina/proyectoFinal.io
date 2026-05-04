# Refactor: Normalización de URLs a estándar REST

**Issue**: #20 — `refactor(api): normalizar URLs a estándar REST con sustantivos en plural`

## Motivación

El proyecto tenía una mezcla inconsistente de estilos en las URLs de la API:
- Verbos en rutas: `/agregar`, `/mostrar`, `/eliminar`, `/editar`
- camelCase: `/productoEditar`, `/editarCuota`, `/gestionPagoProveedores`
- Singulares: `/actividad`, `/reserva`
- Mayúsculas: `/Productos`, `/Rutinas` (frontend React Router)

El principio REST establece que el verbo lo aporta el método HTTP (GET, POST, PUT, PATCH, DELETE) y la URL debe ser un sustantivo en plural, minúsculas y kebab-case.

---

## Cambios aplicados

### Backend — Rutas API (`Backend/source/routes/api/`)

| URL anterior | Nueva URL | Método | Archivo |
|---|---|---|---|
| `GET /api/categoriaProductos` | `GET /api/categorias-productos` | GET | `categoria.api.routes.ts` |
| `GET /api/categoriaRecetas` | `GET /api/categorias-recetas` | GET | `categoriaReceta.api.routes.ts` |
| `GET /api/categoriaGrupoMuscular` | `GET /api/categorias-grupos-musculares` | GET | `categoriaGrupoMuscular.api.routes.ts` |
| `PUT /api/productoEditar/:id` | `PUT /api/productos/:id` | PUT | `products.api.routes.ts` |
| `PUT /api/recetaEditar/:id` | `PUT /api/recetas/:id` | PUT | `receta.api.routes.ts` |
| `PUT /api/ejercicioEditar/:id` | `PUT /api/ejercicios/:id` | PUT | `ejercicio.api.routes.ts` |
| `PUT /api/proveedorEditar/:id` | `PUT /api/proveedores/:id` | PUT | `proveedores.api.routes.ts` |
| `PUT /api/empleadoEditar/:id` | `PUT /api/empleados/:id` | PUT | `empleados.api.routes.ts` |
| `PUT /api/usuarioEditar/:id` | `PUT /api/usuarios/:id` | PUT | `users.api.routes.ts` |
| `POST /api/usuariosChangePassword` | `POST /api/usuarios/cambiar-contrasena` | POST | `users.api.routes.ts` |
| `GET /api/actividad` | `GET /api/actividades` | GET | `actividad.api.routes.ts` |
| `POST /api/actividad` | `POST /api/actividades` | POST | `actividad.api.routes.ts` |
| `PUT /api/editarActividad/:id` | `PUT /api/actividades/:id` | PUT | `actividad.api.routes.ts` |
| `DELETE /api/eliminarActividad/:id` | `DELETE /api/actividades/:id` | DELETE | `actividad.api.routes.ts` |
| `GET /api/cuotasdelUsuario/:id` | `GET /api/usuarios/:id/cuotas` | GET | `cuota.api.routes.ts` |
| `GET /api/estadisticas` | `GET /api/cuotas/estadisticas` | GET | `cuota.api.routes.ts` |
| `POST /api/calculoCuotas` | `POST /api/cuotas/calcular` | POST | `cuota.api.routes.ts` |
| `PUT /api/editarCuota/:id` | `PUT /api/cuotas/:id` | PUT | `cuota.api.routes.ts` |
| `GET /api/precioCuota` | `GET /api/precios-cuota` | GET | `precioCuota.api.routes.ts` |
| `POST /api/precioCuota` | `POST /api/precios-cuota` | POST | `precioCuota.api.routes.ts` |
| `GET /api/precioCuota/ultima` | `GET /api/precios-cuota/ultima` | GET | `precioCuota.api.routes.ts` |
| `GET /api/gestionPagoProveedores` | `GET /api/pagos-proveedores` | GET | `gestion_pago_proveedores.routes.ts` |
| `POST /api/gestionPagoProveedores` | `POST /api/pagos-proveedores` | POST | `gestion_pago_proveedores.routes.ts` |
| `GET /api/reservas/mostrar` | `GET /api/reservas` | GET | `reservas.api.routes.ts` |
| `PUT /api/reservas/confirmar/:id` | `PATCH /api/reservas/:id/confirmar` | PATCH | `reservas.api.routes.ts` |
| `PUT /api/reservas/cancelar/:id` | `PATCH /api/reservas/:id/cancelar` | PATCH | `reservas.api.routes.ts` |
| `GET /api/reserva/:id/confirmar` | `GET /api/reservas/:id` | GET | `reservas.api.routes.ts` |
| `GET /api/reservas/estadisticasPorProducto` | `GET /api/reservas/estadisticas` | GET | `reservas.api.routes.ts` |
| `GET /api/membresias/mostrar` | `GET /api/membresias` | GET | `membresia.api.routes.ts` |
| `GET /api/transacciones/mostrar` | `GET /api/transacciones` | GET | `transacciones.api.routes.ts` |

**Nota sobre orden de rutas en `cuota.api.routes.ts`**: se reordenaron las rutas para que las rutas con segmentos literales (`/cuotas/estadisticas`, `/cuotas/calcular`) se registren antes que las parametrizadas (`/cuotas/:id`), evitando que Express interprete `estadisticas` como un valor de `:id`.

---

### Frontend React — Llamadas HTTP (`frontend/src/`)

Se actualizaron todas las referencias a las URLs en los componentes consumidores:

| Archivo | URLs actualizadas |
|---|---|
| `component/Productos.jsx` | `categoriaProductos` → `categorias-productos` |
| `ABM/AltaProd.jsx` | `categoriaProductos` → `categorias-productos` |
| `ABM/EdicionProd.jsx` | `productoEditar/:id` → `productos/:id` |
| `component/Recetas.jsx` | `categoriaRecetas` → `categorias-recetas` |
| `ABM/AltaRece.jsx` | `categoriaRecetas` → `categorias-recetas` |
| `ABM/EdicionRece.jsx` | `categoriaRecetas` → `categorias-recetas`, `recetaEditar/:id` → `recetas/:id` |
| `component/Rutinas.jsx` | `categoriaGrupoMuscular` → `categorias-grupos-musculares` |
| `ABM/AltaRuti.jsx` | `categoriaGrupoMuscular` → `categorias-grupos-musculares` |
| `ABM/EdicionRuti.jsx` | `ejercicioEditar/:id` → `ejercicios/:id` |
| `ABM/EdicionUsu.jsx` | `usuarioEditar/:id` → `usuarios/:id` |
| `component/CuotaFormulario.jsx` | `cuotasdelUsuario/:id` → `usuarios/:id/cuotas` |
| `ABM/AltaCuota.jsx` | `precioCuota/ultima` → `precios-cuota/ultima` |
| `ABM/EdicionCuota.jsx` | `editarCuota/:id` → `cuotas/:id` |
| `component/PrecioCuota.jsx` | `precioCuota` → `precios-cuota` (todas las ocurrencias) |
| `ABM/AltaPrecioCuota.jsx` | `precioCuota` → `precios-cuota` (todas las ocurrencias) |
| `ABM/EdicionProveedor.jsx` | `proveedorEditar/:id` → `proveedores/:id` |
| `ABM/EdicionEmpleado.jsx` | `empleadoEditar/:id` → `empleados/:id` |
| `component/Reservas.jsx` | `reservas/mostrar` → `reservas` |
| `component/ReservaCard.jsx` | `PUT reservas/confirmar/:id` → `PATCH reservas/:id/confirmar`, `PUT reservas/cancelar/:id` → `PATCH reservas/:id/cancelar` |
| `component/ReservaPorId.jsx` | `GET reserva/:id/confirmar` → `GET reservas/:id` |
| `component/Actividad.jsx` | `actividad` → `actividades`, `editarActividad/:id` → `actividades/:id`, `eliminarActividad/:id` → `actividades/:id` |
| `charts/ManualChartProveedor.jsx` | `gestionPagoProveedores` → `pagos-proveedores` |
| `charts/CuadroCuotaAbonada.jsx` | `estadisticas` → `cuotas/estadisticas` |
| `charts/CuadroTotalVendido.jsx` | `reservas/estadisticasPorProducto` → `reservas/estadisticas` |

---

### Frontend React — Rutas de React Router (`frontend/src/App.jsx` y `Sidebar.jsx`)

| Ruta anterior | Nueva ruta |
|---|---|
| `/Productos` | `/productos` |
| `/Usuarios` | `/usuarios` |
| `/Rutinas` | `/rutinas` |
| `/Recetas` | `/recetas` |
| `/Proveedores` | `/proveedores` |
| `/Reservas` | `/reservas` |
| `/Reserva/:id` | `/reservas/:id` |
| `/PrecioCuota` | `/precios-cuota` |
| `/Empleados` | `/empleados` |
| `/Actividad` | `/actividades` |
| `/productoNuevo` | `/productos/nuevo` |
| `/rutinaNueva` | `/rutinas/nueva` |
| `/recetaNueva` | `/recetas/nueva` |
| `/cuotaNueva/:idUsuario` | `/cuotas/nueva/:idUsuario` |
| `/proveedorNuevo` | `/proveedores/nuevo` |
| `/empleadoNuevo` | `/empleados/nuevo` |
| `/nuevoPrecioCuota` | `/precios-cuota/nuevo` |
| `/provedores/editar/:id` | `/proveedores/editar/:id` *(corrección de typo)* |
| `/cuota/editar/:id` | `/cuotas/editar/:id` |
| `/cuota/:id` | `/cuotas/:id` |

También se actualizaron todos los `navigate()`, `<Link to>` y `<a href>` internos en los componentes que referenciaban las rutas antiguas.

---

## Bugs adicionales detectados y corregidos

### 1. Typo en ruta de React Router (`App.jsx`)
- **Antes**: `/provedores/editar/:id` (faltaba una `o`)
- **Después**: `/proveedores/editar/:id`

### 2. Método HTTP incorrecto en `ReservaCard.jsx`
- **Antes**: El frontend usaba `axios.put()` para confirmar y cancelar reservas, pero el backend definía `PUT`. Con el refactor, ambos pasaron a `PATCH`, alineando semántica (modificación parcial de estado).

### 3. Link incorrecto en `EdicionEmpleado.jsx`
- **Antes**: El botón "Volver" apuntaba a `/Proveedores` (ruta equivocada)
- **Después**: Apunta correctamente a `/empleados`

---

## Bugs documentados (pendientes de corrección)

### Endpoint inexistente: `/api/abonadas-por-mes`
- **Archivo**: `frontend/src/component/CuotaFormulario.jsx`, línea 46
- **Problema**: El componente llama a `GET /api/abonadas-por-mes` pero este endpoint **no existe** en el backend
- **Impacto**: El gráfico de cuotas abonadas por mes en el detalle de usuario siempre falla silenciosamente
- **Acción requerida**: Crear el endpoint en el backend o redirigir al endpoint correcto (`/api/cuotas/estadisticas` con el parámetro `id_usuario`)

### Ruta SSR `/api/ejercicio.routes.ts` — punto en lugar de dos puntos
- **Archivo**: `Backend/source/routes/ejercicio.routes.ts`
- **Problema**: Ruta definida como `PUT /ejercicios/.id` (punto en vez de `:`) — nunca matchea ninguna petición
- **Acción requerida**: Corregir a `PUT /ejercicios/:id`

---

---

## Cambios adicionales: Rutas SSR en inglés → español

### Backend — Rutas de usuarios SSR (`Backend/source/routes/users.routes.ts`)

| URL anterior | Nueva URL | Método |
|---|---|---|
| `GET /users/form` | `GET /usuarios/formulario` | GET |
| `POST /users/save` | `POST /usuarios/guardar` | POST |
| `POST /users/login` | `POST /usuarios/iniciar-sesion` | POST |
| `GET /users/show/:id` | `GET /usuarios/mostrar/:id` | GET |
| `GET /users/logout` | `GET /usuarios/cerrar-sesion` | GET |
| `GET /users/change-password/:token` | `GET /usuarios/cambiar-contrasena/:token` | GET |
| `POST /users/change-password/:token` | `POST /usuarios/cambiar-contrasena/:token` | POST |
| `POST /users/update-password` | `POST /usuarios/actualizar-contrasena` | POST |
| `POST /users/:id` | `POST /usuarios/:id` | POST |
| `DELETE /users/:id` | `DELETE /usuarios/:id` | DELETE |
| `PUT /users/:id` | `PUT /usuarios/:id` | PUT |

### Backend — Rutas de vistas SSR (`Backend/source/routes/view.routes.ts`)

| URL anterior | Nueva URL |
|---|---|
| `GET /listaProductos` | `GET /lista-productos` |
| `GET /productDetail` | `GET /detalle-producto` |
| `GET /login` | `GET /iniciar-sesion` |
| `GET /register` | `GET /registrar` |
| `GET /mPago` | `GET /metodo-pago` |
| `GET /finalizarCompra` | `GET /finalizar-compra` |

### Frontend y EJS — Referencias actualizadas a nuevas rutas SSR

| Archivo | Cambio |
|---|---|
| `component/Sidebar.jsx` | `/users/logout` → `/usuarios/cerrar-sesion` |
| `component/Usuario.jsx` | `/register` → `/registrar` |
| `ABM/EliminaRutin.jsx` | `navigate('/Rutinas')` → `navigate('/rutinas')` |
| `ABM/EliminarProd.jsx` | `navigate('/Productos')` → `navigate('/productos')` |
| `ABM/EdicionCuota.jsx` | `navigate('/Usuarios')` → `navigate('/usuarios')` |
| `ABM/AltaCuota.jsx` | `navigate('/Usuarios')` → `navigate('/usuarios')` (2 ocurrencias) |
| `component/Empleados.jsx` | `/empleadoNuevo` → `/empleados/nuevo` |
| `component/Proveedores.jsx` | `/proveedorNuevo` → `/proveedores/nuevo`, typo `/provedores/editar` → `/proveedores/editar` |
| `views/login.ejs` | `action="/users/login"` → `action="/usuarios/iniciar-sesion"`, `/register` → `/registrar`, `modalAction` → `/usuarios/actualizar-contrasena` |
| `views/register.ejs` | `action="/users/save"` → `action="/usuarios/guardar"` |
| `views/changePassword.ejs` | `action="/users/change-password/..."` → `action="/usuarios/cambiar-contrasena/..."` |
| `views/perfilEditar.ejs` | `action="/users/<%= id %>"` → `action="/usuarios/<%= id %>"` |
| `views/partials/header.ejs` | `/register` → `/registrar`, `/login` → `/iniciar-sesion`, `/users/logout` → `/usuarios/cerrar-sesion` |
| `views/partials/modalReserva.ejs` | `/login` → `/iniciar-sesion`, `/register` → `/registrar` |
| `views/partials/modalMensaje.ejs` | `/login` → `/iniciar-sesion` |
| `views/home.ejs` | `/register` → `/registrar` |

---

## Rutas SSR no incluidas en este refactor

Las rutas SSR de `Backend/source/routes/reserva.routes.ts` (usadas por las vistas EJS del servidor) conservan su nomenclatura original ya que no forman parte del issue #20. Su normalización es parte de la Fase 4 del issue.
