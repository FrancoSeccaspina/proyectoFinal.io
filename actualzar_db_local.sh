#!/bin/bash

# === CONFIG LOCAL ===
SERVER="root@168.181.185.23"
PORT="5538"
REMOTE_BACKUP_DIR="/proyectoFinal"

LOCAL_CONTAINER="activa-db"
LOCAL_DB_NAME="gimnasio_activa"


BACKUP_FILE=$(ssh -p 5538 root@168.181.185.23 "/root/proyectoFinal.io/generar-backup-gimnasio-activa.sh")

LOCAL_PATH="backups/$BACKUP_FILE"
REMOTE_PATH=/root/"$LOCAL_PATH"


if [ -z "$BACKUP_FILE" ]; then
    echo "ERROR: hubo un error al correr el crear_backup_gimnasio_activa.sh." >&2
    exit 1
fi

echo "Descargando backup desde el servidor remoto..."
scp -P $PORT "$SERVER:$REMOTE_PATH" ./"$BACKUP_FILE"

if [ $? -ne 0 ]; then
    echo "ERROR: descargando el archivo : scp -P $PORT $SERVER:$REMOTE_PATH ./"$BACKUP_FILE""
    exit 1
fi

echo "Backup guardado: $BACKUP_FILE"

# === 3. Restaurar en el contenedor LOCAL ===
# echo "Importando backup en el contenedor local..."

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
