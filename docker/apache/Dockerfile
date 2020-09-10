FROM php:7.2-apache

RUN apt-get update && apt-get install -y unzip libmemcached-dev zlib1g-dev \
    && pecl install memcached-3.0.4 \
    && docker-php-ext-enable memcached
RUN docker-php-ext-install mysqli pdo_mysql
RUN apt-get install -y gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN cp /etc/apache2/mods-available/rewrite.load /etc/apache2/mods-enabled/
ENV APACHE_DOCUMENT_ROOT /var/www/html/

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-enabled/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-enabled/*.conf
# COPY php.ini /usr/local/etc/php/
RUN echo "date.timezone = Europe/Brussels" >> /usr/local/etc/php/php.ini
