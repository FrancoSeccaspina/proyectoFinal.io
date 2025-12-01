#!/bin/bash

echo "Ejecutando backup en el contenedor activa-db-container..."
BACKUP_FILE=$(docker exec activa-db-container bash /usr/local/bin/mysqldump-backup.sh)

if [ $? -ne 0 ]; then
    echo "ERROR: Falló la creación del backup en el contenedor" >&2
    exit 1
fi

if [ -z "$BACKUP_FILE" ]; then
    echo "ERROR: No se obtuvo el nombre del archivo de backup" >&2
    exit 1
fi

echo "Backup creado: $BACKUP_FILE" >&2
echo "Copiando backup al host..." >&2

docker cp activa-db-container:/var/lib/mysql/backups/"$BACKUP_FILE" ./backups/"$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "$BACKUP_FILE"
    exit 0
else
    echo "ERROR: Falló la copia del backup al host" >&2
    exit 1
fi
