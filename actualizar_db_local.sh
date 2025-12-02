#!/bin/bash

# === CONFIG LOCAL ===
SERVER="root@168.181.185.23"
PORT="5538"

LOCAL_CONTAINER="activa-db"
LOCAL_DB_NAME="gimnasio_activa"


BACKUP_FILE=$(ssh -p "$PORT" "$SERVER" "/root/proyectoFinal.io/generar-backup-gimnasio-activa.sh")

REMOTE_PATH=/root/backups/"$BACKUP_FILE"

if [ -z "$BACKUP_FILE" ]; then
    echo "ERROR: hubo un error al correr crear_backup_gimnasio_activa.sh." >&2
    exit 1
fi

echo "Descargando backup desde el servidor remoto..."
scp -P $PORT "$SERVER:$REMOTE_PATH" ./"$BACKUP_FILE"

if [ $? -ne 0 ]; then
    echo "ERROR: descargando el archivo : $BACKUP_FILE"
    exit 1
fi

echo "Backup guardado: $BACKUP_FILE"
echo "Ejecutando contenedor $LOCAL_CONTAINER ..."

docker compose up "$LOCAL_CONTAINER" -d
echo "mysql - "

# Borrar y recrear la base de datos
docker exec -it activa-db sh -c "mysql -u root -p -e \"DROP DATABASE IF EXISTS \\\`gimnasio_activa\\\`; CREATE DATABASE \\\`gimnasio_activa\\\`;\""

# Importar el backup
docker exec -i "$LOCAL_CONTAINER" sh -c "MYSQL_PWD=\"\$MYSQL_ROOT_PASSWORD\" mysql -u root \"$LOCAL_DB_NAME\"" < "$BACKUP_FILE"

echo "Base de datos actualizada"
echo "Cerrando $LOCAL_CONTAINER .."

docker compose down activa-db