# Stage 1: Build React/Vite Assets
FROM node:20-alpine as build-assets
WORKDIR /app
COPY package*.json ./
# Ginagamit ang ci para sa mas stable na install sa production
RUN npm ci 
COPY . .
RUN npm run build

# Stage 2: PHP Environment with Nginx
FROM php:8.2-fpm-alpine
WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache nginx wget libpng-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo pdo_mysql gd bcmath

# Copy project files
COPY . .
# Kopyahin ang compiled assets mula sa Stage 1
COPY --from=build-assets /app/public /var/www/html/public

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Nginx configuration
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && php-fpm