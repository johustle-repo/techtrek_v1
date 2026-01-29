# Stage 1: Build React/Vite Assets
FROM node:20-alpine as build-assets
WORKDIR /app

# 1. Install PHP essentials (Clean and simple)
RUN apk add --no-cache php83 php83-ctype php83-fileinfo php83-mbstring php83-openssl php83-phar php83-tokenizer php83-xml php83-dom php83-xmlwriter php83-curl php83-zip
RUN ln -sf /usr/bin/php83 /usr/bin/php

# 2. Copy dependency files first
COPY package*.json ./
RUN npm ci 

# 3. Copy everything else
COPY . .

# 4. Create a dummy .env file to prevent Laravel errors during Vite build
# Ito ang magsasabi sa Laravel na huwag maghanap ng database sa build stage
RUN echo "APP_KEY=base64:$(node -e 'console.log(require("crypto").randomBytes(32).toString("base64"))')" > .env && \
    echo "DB_CONNECTION=sqlite" >> .env && \
    echo "DB_DATABASE=:memory:" >> .env

# 5. Compile assets
RUN npm run build

# --- Stage 2: Final Runtime ---
FROM php:8.2-fpm-alpine
WORKDIR /var/www/html

# Install runtime dependencies
RUN apk add --no-cache nginx wget libpng-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo pdo_mysql gd bcmath

# Copy project files from source and build assets from Stage 1
COPY . .
COPY --from=build-assets /app/public /var/www/html/public

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && php-fpm