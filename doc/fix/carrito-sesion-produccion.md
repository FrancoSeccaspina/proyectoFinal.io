# Fix: Carrito no persistía en producción

**Fecha:** 2026-04-22  
**Branch:** deploy-test  
**Estado:** Resuelto

---

## Síntoma

En desarrollo el carrito funcionaba correctamente. En producción (HTTPS a través de nginx) los productos no se agregaban al carrito — el carrito siempre aparecía vacío.

---

## Causa raíz

La sesión de Express estaba configurada con `secure: true` en producción (`IS_PRODUCTION = true`). Esto hace que `express-session` solo envíe la cookie `connect.sid` si considera que la conexión es segura (`req.secure === true`).

El tráfico llega al backend como HTTP interno (nginx termina el SSL), por lo que Express veía `req.secure = false` y **no enviaba el header `Set-Cookie`**. Sin cookie de sesión, el carrito nunca se guardaba en el browser.

El fix de `trust proxy` ya estaba en el código del backend (`app.set('trust proxy', 1)`), pero **el archivo `nginx/conf.d/base.conf` en el servidor no estaba actualizado** porque el script de deploy no hacía `git pull` — solo regeneraba el `.env` y ejecutaba `docker compose pull/up`.

### Diagrama del problema

```
Browser (HTTPS)
     ↓
nginx (termina SSL) → HTTP interno → Express backend
                                         ↓
                              IS_PRODUCTION = true
                              secure: true
                              req.secure = false  ← problema
                                         ↓
                              express-session NO envía Set-Cookie
                                         ↓
                              Browser nunca recibe cookie de sesión
                                         ↓
                              Carrito siempre vacío
```

---

## Archivos modificados

### 1. `nginx/conf.d/base.conf`
Agregado el header `X-Forwarded-Proto` para que Express sepa que la conexión original es HTTPS:

```nginx
proxy_set_header X-Forwarded-Proto $scheme;
```

### 2. `Backend/source/app.ts`
Agregado `trust proxy` para que Express lea el header `X-Forwarded-Proto` del proxy:

```typescript
app.set('trust proxy', 1);
```

### 3. `Backend/source/controllers/carritoController.ts`
Agregado `req.session.save()` explícito antes de renderizar, para garantizar que la sesión se persiste antes de enviar el response:

```typescript
SessionService.agregarProductoAlCarrito(req, id_producto, cantidadNum);
req.session.save((err) => {
    if (err) console.error("Error al guardar sesión:", err);
    res.render('productDetail', { message: "Producto agregado al carrito", producto: producto });
});
```

También corregida la comparación de stock usando `cantidadNum` (número) en lugar de `cantidad` (string del form).

### 4. `Backend/source/services/serivicioSesion.ts`
`obtenerCarrito` dejó de escribir en la sesión al leer — antes inicializaba `req.session.carrito = []` como efecto secundario en cada lectura:

```typescript
// Antes
obtenerCarrito(req) {
    if (!req.session.carrito) {
        req.session.carrito = [];  // efecto secundario
    }
    return req.session.carrito;
}

// Ahora
obtenerCarrito(req) {
    return req.session.carrito ?? [];
}
```

### 5. `.github/workflows/deploy.yml`
Agregado `git pull origin deploy-test` en el script de deploy SSH para que los archivos de configuración del servidor (nginx conf, docker-compose, etc.) se actualicen en cada deploy:

```yaml
cd /root/proyectoFinal.io
git pull origin deploy-test        # ← agregado
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

---

## Cómo se diagnosticó

1. `docker exec activa-backend printenv NODE_ENV` → `production` ✓
2. `docker exec activa-backend grep -r "trust proxy" /app/dist/source/app.js` → presente ✓
3. `cat /root/proyectoFinal.io/nginx/conf.d/base.conf | grep X-Forwarded` → **sin output** ← problema confirmado
4. El archivo en el servidor estaba desactualizado porque el deploy script no hacía `git pull`

---

## Lección aprendida

El script de deploy SSH debe incluir `git pull` antes de `docker compose up` para que los archivos de configuración montados como volúmenes (nginx conf, etc.) se mantengan sincronizados con el repositorio.
