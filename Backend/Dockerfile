# --- Stage 1: Compilar TypeScript ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY source/ ./source/
RUN npm run build

# --- Stage 2: Imagen de producción ---
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY public ./public
COPY uploads ./uploads
EXPOSE 3032
CMD ["npm", "run", "start"]
