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
RUN pecl install xdebug
RUN echo "xdebug.remote_enable=1\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)\n" > /usr/local/etc/php/conf.d/xdebug.ini \
         "xdebug.remote_autostart=1\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "xdebug.remote_connect_back=0\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "xdebug.remote_host=host.docker.internal\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "xdebug.remote_handler=dbgp\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "xdebug.max_nesting_level=1500\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "xdebug.remote_port=9000\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
         "xdebug.idekey=VSCODE\n" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN docker-php-ext-enable xdebug
