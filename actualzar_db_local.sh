#!/bin/bash

# === CONFIG LOCAL ===
SERVER="root@168.181.185.23"
PORT="5538"
REMOTE_BACKUP_DIR="/var/lib/mysql/backups"

LOCAL_CONTAINER="activa-db-container"
LOCAL_DB_NAME="gimnasio_activa"


# BACKUP_FILE=$(ssh -p $PORT $SERVER "docker exec activa-db-container bash /usr/local/bin/crear_backup_gimnasio_activa.sh")
BACKUP_FILE="backup_20251201.sql"

REMOTE_PATH="$REMOTE_BACKUP_DIR/$BACKUP_FILE"
LOCAL_PATH="./$BACKUP_FILE"

# === 2. Descargar el backup ===
echo "Descargando backup desde el servidor remoto..."
scp -P $PORT "$SERVER:$REMOTE_PATH" "$LOCAL_PATH"

if [ $? -ne 0 ]; then
    echo "❌ Error descargando el backup."
    exit 1
fi

echo "Backup guardado localmente en: $LOCAL_PATH"

# === 3. Restaurar en el contenedor LOCAL ===
echo "Importando backup en el contenedor local..."

# # Comprobamos que la variable de entorno exista
# if [ -z "$MYSQL_ROOT_PASSWORD" ]; then
#     read -s -p "Ingrese la contraseña root de MySQL del contenedor local: " MYSQL_ROOT_PASSWORD
#     echo
# fi

# # Borrar y recrear la base de datos
# docker exec $LOCAL_CONTAINER sh -c "mysql -u root -p\"\$MYSQL_ROOT_PASSWORD\" -e \"DROP DATABASE IF EXISTS \\\`${LOCAL_DB_NAME}\\\`; CREATE DATABASE \\\`${LOCAL_DB_NAME}\\\`;\""

# # Importar el backup
# docker exec -i $LOCAL_CONTAINER sh -c "mysql -u root -p\"\$MYSQL_ROOT_PASSWORD\" \\\`${LOCAL_DB_NAME}\\\`" < "$LOCAL_PATH"

# echo "✅ Base de datos local '$LOCAL_DB_NAME' actualizada con éxito."
