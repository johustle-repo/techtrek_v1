# Stage 1: Build React/Vite Assets
FROM node:20-alpine as build-assets
WORKDIR /app

# ✅ Fixed: Ginamit ang generic 'php83' o 'php82' dependencies na available sa standard Alpine
RUN apk add --no-cache \
    php83 \
    php83-common \
    php83-ctype \
    php83-fileinfo \
    php83-mbstring \
    php83-openssl \
    php83-phar \
    php83-session \
    php83-tokenizer \
    php83-xml \
    php83-xmlwriter \
    php83-dom \
    php83-xmlreader \
    php83-posix \
    php83-intl \
    php83-curl \
    php83-zip \
    php83-pdo \
    php83-pdo_mysql \
    php83-bcmath

# Siguraduhin na 'php' ang command name
RUN ln -sf /usr/bin/php83 /usr/bin/php

COPY package*.json ./
RUN npm ci 
COPY . .

# Ngayon, gagana na ang wayfinder plugin dahil may PHP na
RUN npm run build

# Stage 2: PHP Environment (Mananatili itong pareho)
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