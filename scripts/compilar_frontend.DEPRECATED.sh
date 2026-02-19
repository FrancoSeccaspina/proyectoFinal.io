#!/bin/bash
# =============================================================================
# DEPRECADO — No usar en flujos nuevos
# =============================================================================
# Este script fue el mecanismo manual para compilar el frontend de React y
# moverlo a flask/app/static/ para que Flask lo sirviera.
#
# Será reemplazado por el Dockerfile multi-stage de Nginx (Ticket 2.1) que
# compila React dentro de Docker y elimina la dependencia de Flask.
#
# Ver: doc/plan-de-deploy.md — TICKET 1.5 y TICKET 2.1
# Se eliminará definitivamente una vez que la Fase 2 esté funcionando.
# =============================================================================
set -e
cd ..
FRONTEND_DIR="$(pwd)/frontend"
FLASK_STATIC_DIR="$(pwd)/flask/app/static"
BUILD_DIR="$FRONTEND_DIR/build"

cd "$FRONTEND_DIR"
npm install
npm run build

if [ -d "$FLASK_STATIC_DIR" ]; then
    rm -rf "$FLASK_STATIC_DIR"
fi

mv "$BUILD_DIR" "$FLASK_STATIC_DIR"

echo "Build frontend completado y movido a flask/static."
