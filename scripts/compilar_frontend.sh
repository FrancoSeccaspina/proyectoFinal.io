#!/bin/bash
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
