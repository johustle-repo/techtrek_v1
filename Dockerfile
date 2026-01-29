# Stage 1: Build React/Vite Assets
# Nagsimula tayo sa PHP image para siguradong may PHP command
FROM php:8.2-fpm-alpine as build-assets
WORKDIR /app

# 1. Install Node.js at system tools
RUN apk add --no-cache nodejs npm libpng-dev libxml2-dev zip unzip git

# 2. Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 3. Copy files at install dependencies
COPY . .
RUN composer install --no-dev --optimize-autoloader
RUN npm ci

# 4. Mag-generate ng APP_KEY para hindi mag-error ang Artisan
RUN cp .env.example .env && php artisan key:generate

# 5. Compile assets (Dito na papasok ang fix para sa wayfinder)
RUN npm run build

# --- Stage 2: Final Production Image ---
FROM php:8.2-fpm-alpine
WORKDIR /var/www/html

# Install runtime tools
RUN apk add --no-cache nginx libpng-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo pdo_mysql gd bcmath

# Copy project at yung compiled assets mula sa Stage 1
COPY . .
COPY --from=build-assets /app/public /var/www/html/public

# Final cleanup install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && php-fpm