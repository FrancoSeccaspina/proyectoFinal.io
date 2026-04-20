# Recuperar la base de datos tras borrar el volumen

Este procedimiento aplica cuando el volumen `activa-db-data` fue eliminado (con `docker compose down -v`) o cuando MySQL rechaza la conexión con `Access denied` porque las credenciales del volumen no coinciden con las del `.env`.

---

## 1. Ingresar al contenedor de MySQL como root

```bash
docker exec -it activa-db mysql -u root -p<MYSQL_ROOT_PASSWORD>
```

> Reemplazá `<MYSQL_ROOT_PASSWORD>` con el valor de la variable `MYSQL_ROOT_PASSWORD` del archivo `.env`.

---

## 2. Resetear usuario y permisos

Dentro de MySQL ejecutar:

```sql
ALTER USER 'activa_user'@'%' IDENTIFIED BY '<DATABASE_PASSWORD>';
GRANT ALL PRIVILEGES ON gimnasio_activa.* TO 'activa_user'@'%';
FLUSH PRIVILEGES;
EXIT;
```

> Reemplazá `activa_user` con `DATABASE_USER` y `<DATABASE_PASSWORD>` con `DATABASE_PASSWORD` del `.env`.

---

## 3. Importar el schema desde el dump

Desde el host del VPS:

```bash
docker exec -i activa-db mysql -u root -p<MYSQL_ROOT_PASSWORD> gimnasio_activa < /root/proyectoFinal.io/gimnasio_activa.sql
```

Si no hay salida de error, las tablas quedaron creadas correctamente.

---

## 4. Verificar

```bash
docker logs activa-backend --tail 20
```

Debería aparecer `Servidor corriendo en http://localhost:3032` sin errores de `AccessDeniedError`.
