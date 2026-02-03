# Etapa 1: Build
FROM node:24.1.0-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
# Instalamos dependencias (incluyendo devDependencies para el CLI)
RUN npm install

# Copiar código fuente y construir
COPY . .
RUN npm run build

# Etapa 2: Servidor estático con Nginx
FROM nginx:alpine

# IMPORTANTE: En Angular v21, la salida por defecto suele ser dist/[nombre-app]/browser
# Según tu package.json, el nombre es 'lanhsahn-sis'
COPY --from=build /app/dist/lanhsahn-sis/browser /usr/share/nginx/html

# Copiamos la configuración de Nginx para manejar el enrutamiento (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]