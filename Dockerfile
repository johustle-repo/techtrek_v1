# Stage 1: Build React/Vite Assets
FROM node:20-alpine as build-assets
WORKDIR /app

# 1. ✅ MAGDAGDAG NG PHP DITO (Kailangan ng vite-plugin-wayfinder)
RUN apk add --no-cache php82 php82-common php82-ctype php82-fileinfo php82-mbstring php82-openssl php82-phar php82-session php82-tokenizer php82-xml php82-xmlwriter php82-dom php82-xmlreader php82-posix php82-intl php82-curl php82-zip php82-pdo php82-pdo_mysql php82-bcmath

# Gawaing 'php' ang command name (compatibility)
RUN ln -sf /usr/bin/php82 /usr/bin/php

COPY package*.json ./
RUN npm ci 
COPY . .

# 2. ✅ Ngayon, gagana na ang build dahil may 'php' na sa environment
RUN npm run build

# Stage 2: PHP Environment with Nginx (Mananatili itong pareho)
FROM php:8.2-fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache nginx wget libpng-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo pdo_mysql gd bcmath

COPY . .
COPY --from=build-assets /app/public /var/www/html/public

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && php-fpm