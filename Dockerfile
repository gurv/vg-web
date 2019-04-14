FROM nginx:alpine

RUN mkdir -p /var/cache/nginx/client_temp
RUN mkdir -p /var/cache/nginx/proxy_temp
RUN mkdir -p /var/cache/nginx/fastcgi_temp
RUN mkdir -p /var/cache/nginx/uwsgi_temp
RUN mkdir -p /var/cache/nginx/scgi_temp

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY last-build/ .
