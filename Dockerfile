# Stage 1: Build React/Vite Assets
# ✅ In-update natin sa php:8.4 para mag-match sa composer.lock mo
FROM php:8.4-fpm-alpine as build-assets
WORKDIR /app

# 1. Install Node.js at system tools
RUN apk add --no-cache nodejs npm libpng-dev libxml2-dev zip unzip git

# 2. Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 3. Copy files at install dependencies
COPY . .

# ✅ Nagdagdag tayo ng --ignore-platform-reqs para mas sigurado sa build stage
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs
RUN npm ci

# 4. Mag-generate ng APP_KEY para sa Artisan
RUN cp .env.example .env && php artisan key:generate

# 5. Compile assets (Fix para sa wayfinder plugin)
RUN npm run build

# --- Stage 2: Final Production Image ---
# ✅ Dapat 8.4 din ang runtime image mo
FROM php:8.4-fpm-alpine
WORKDIR /var/www/html

# Install runtime tools at PHP extensions
RUN apk add --no-cache nginx libpng-dev libxml2-dev zip unzip
RUN docker-php-ext-install pdo pdo_mysql gd bcmath

# Copy project at compiled assets mula sa Stage 1
COPY . .
COPY --from=build-assets /app/public /var/www/html/public

# Final Composer install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Nginx config
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD nginx && php-fpm