## Comando para iniciar como desarrollador

### correr docker compose
```
docker compose down
```
```
docker compose up
```
### backend

```
npm run start:dev
```

### frontend

```
npm start
```
### Compular frontend
Se usa build_frontend.sh desde la carpeta raiz para compitar frontend y mover la carpeta compilada  de /frontend/build a flask/app/static.

```
    $ ./build_frontend.sh
```

### concurrently frontend y brackend correr comando desde el directorio raiz

```
npm start
```

## credenciales ADMIN

admin@activafitness.com
admin123

## tiempo de vida de una reserva .env

TIEMPO_CONTROL_STOCK_MINUTOS=30
