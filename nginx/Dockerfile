# --- Stage 1: Compilar el frontend React ---
FROM node:22-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG REACT_APP_FRONTEND_DOMAIN_HOST
ARG REACT_APP_BACKEND_DOMAIN_HOST
ENV REACT_APP_FRONTEND_DOMAIN_HOST=$REACT_APP_FRONTEND_DOMAIN_HOST
ENV REACT_APP_BACKEND_DOMAIN_HOST=$REACT_APP_BACKEND_DOMAIN_HOST
RUN CI=false npm run build

# --- Stage 2: Nginx con el build + Certbot ---
FROM nginx:1.21.6

# Copiar build de React al directorio que Nginx servirá
COPY --from=frontend-build /app/build /usr/share/nginx/html/dashboard

# Copiar script de renovación de certificados
COPY nginx/renew.sh /
RUN chmod +x /renew.sh

# Instalar Certbot (mantener funcionalidad actual)
RUN apt update && apt install -y python3 python3-venv libaugeas0
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot

# Copiar configuración de Nginx
COPY nginx/conf.d/base.conf /etc/nginx/conf.d/default.conf
