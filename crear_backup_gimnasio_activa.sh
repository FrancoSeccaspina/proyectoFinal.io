#!/bin/bash

BACKUP_DIR="/var/lib/mysql/backups"
FILE_NAME="backup_$(date +%Y%m%d).sql"
BACKUP_FILE="$BACKUP_DIR/$FILE_NAME"

echo "Creando directorio de respaldo ($BACKUP_DIR) si no existe..."
mkdir -p "$BACKUP_DIR"
echo "Iniciando mysqldump de la base de datos '$MYSQL_DATABASE'..."

MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysqldump -u root "$MYSQL_DATABASE" > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "$FILE_NAME"
else
    echo "¡ERROR! Falló la ejecución de mysqldump." >&2
fi