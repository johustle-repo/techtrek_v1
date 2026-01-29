# Stage 1: Build React/Vite Assets
FROM php:8.4-fpm-alpine as build-assets
WORKDIR /app

# 1. Install Node.js at system tools
RUN apk add --no-cache nodejs npm libpng-dev libxml2-dev zip unzip git

# 2. Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 3. Copy files at install dependencies
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs
RUN npm ci

# 4. Mag-generate ng APP_KEY para sa Artisan
RUN cp .env.example .env && php artisan key:generate

# 5. Compile assets
RUN npm run build

# --- Stage 2: Final Production Image ---
FROM php:8.4-fpm-alpine
WORKDIR /var/www/html

# Install runtime tools at PHP extensions
RUN apk add --no-cache nginx libpng-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo pdo_mysql gd bcmath

# Copy lahat ng files mula sa root
COPY . .

# Kopyahin ang compiled assets mula sa Stage 1
COPY --from=build-assets /app/public /var/www/html/public

# 6. ✅ Permission Fixes (Sinisiguro na walang 500 errors)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 7. Final Composer install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# ✅ FINAL CMD: Inalis na ang --seed dahil may data na ang DB mo
CMD php artisan migrate --force && php-fpm -D && nginx -g 'daemon off;'