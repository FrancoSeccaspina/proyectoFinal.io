#!/bin/bash

echo "Ejecutando backup en el contenedor activa-db-container..."
BACKUP_NAME=$(docker exec activa-db-container bash /usr/local/bin/crear_backup_gimnasio_activa.sh)

if [ $? -ne 0 ]; then
    echo "ERROR: Falló la creación del backup en el contenedor" >&2
    exit 1
fi

if [ -z "$BACKUP_NAME" ]; then
    echo "ERROR: No se obtuvo el nombre del archivo de backup" >&2
    exit 1
fi

echo "Backup creado: $BACKUP_NAME"
echo "Copiando backup al host..."

docker cp activa-db-container:/var/lib/mysql/backups/"$BACKUP_NAME" ./"$BACKUP_NAME"

if [ $? -eq 0 ]; then
    echo "SUCCESS: Backup copiado exitosamente a ./$BACKUP_NAME"
    exit 0
else
    echo "ERROR: Falló la copia del backup al host" >&2
    exit 1
fi