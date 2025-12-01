#!/bin/bash

# === CONFIG LOCAL ===
SERVER="root@168.181.185.23"
PORT="5538"
CONTAINER="activa-db-container"
REMOTE_BACKUP_DIR="/var/lib/mysql/backups"

LOCAL_CONTAINER="activa-db-container"
LOCAL_DB_NAME="gimnasio_activa"


echo -n "Contraseña SSH del servidor: "
read -s SSH_PASS
echo

# === 1. Listar backups disponibles en el servidor ===
echo "Backups disponibles en el servidor:"
sshpass -p "$SSH_PASS" ssh -p$PORT $SERVER "ls -1 $REMOTE_BACKUP_DIR/*.sql"

echo
read -p "Ingrese SOLO el nombre del archivo (ej: backup_20250101.sql): " BACKUP_NAME

REMOTE_PATH="$REMOTE_BACKUP_DIR/$BACKUP_NAME"
LOCAL_PATH="./$BACKUP_NAME"

# === 2. Descargar ===
echo "Descargando backup..."
sshpass -p "$SSH_PASS" scp -P$PORT "$SERVER:$REMOTE_PATH" "$LOCAL_PATH"

if [ $? -ne 0 ]; then
    echo "Error descargando el backup."
    exit 1
fi

echo "Backup guardado en: $LOCAL_PATH"


# === 3. Restaurar en el contenedor LOCAL ===
echo "Importando backup en tu contenedor local..."

# Borrar y recrear la DB
docker exec $LOCAL_CONTAINER sh -c "mysql -u root -p\"\$MYSQL_ROOT_PASSWORD\" -e \"DROP DATABASE IF EXISTS $LOCAL_DB_NAME; CREATE DATABASE $LOCAL_DB_NAME;\""
# Importar
docker exec -i $LOCAL_CONTAINER sh -c "mysql -u root -p\"\$MYSQL_ROOT_PASSWORD\" $LOCAL_DB_NAME" < "$LOCAL_PATH"

echo "Base de datos local actualizada con éxito."
