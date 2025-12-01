#!/bin/bash

BACKUP_DIR="/var/lib/mysql/backups"
BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y%m%d).sql"

echo "Creando directorio de respaldo ($BACKUP_DIR) si no existe..."
mkdir -p "$BACKUP_DIR"
echo "Iniciando mysqldump de la base de datos '$MYSQL_DATABASE'..."

MYSQL_PWD="$MYSQL_ROOT_PASSWORD" mysqldump -u root "$MYSQL_DATABASE" > "$BACKUP_FILE"

# Verificar el código de salida ($?) para asegurar que mysqldump fue exitoso
if [ $? -eq 0 ]; then
    echo "Respaldo completado y guardado en: $BACKUP_FILE"
else
    echo "¡ERROR! Falló la ejecución de mysqldump." >&2
fi