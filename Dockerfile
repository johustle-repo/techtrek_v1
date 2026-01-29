# Stage 1: Build React/Vite Assets
FROM node:20 as build-assets
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: PHP Environment with Nginx
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