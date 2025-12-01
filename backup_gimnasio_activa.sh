#!/bin/bash

echo "Ejecutando backup en el contenedor activa-db-container..."
BACKUP_FILE=$(docker exec activa-db-container bash /usr/local/bin/crear_backup_gimnasio_activa.sh)

if [ $? -ne 0 ]; then
    echo "ERROR: Falló la creación del backup en el contenedor" >&2
    exit 1
fi

if [ -z "$BACKUP_FILE" ]; then
    echo "ERROR: No se obtuvo el nombre del archivo de backup" >&2
    exit 1
fi

echo "Backup creado: $BACKUP_FILE"
echo "Copiando backup al host..."

docker cp activa-db-container:/var/lib/mysql/"$BACKUP_FILE" ./"$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "SUCCESS: Backup copiado exitosamente a ./$BACKUP_FILE"
    exit 0
else
    echo "ERROR: Falló la copia del backup al host" >&2
    exit 1
fi