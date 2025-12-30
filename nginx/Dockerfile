FROM nginx:1.21.6

ENV NGINX_VERSION   1.21.6

COPY renew.sh /
RUN chmod +x renew.sh

RUN apt update
RUN apt install -y python3 python3-venv libaugeas0
RUN python3 -m venv /opt/certbot/
RUN /opt/certbot/bin/pip install --upgrade pip
RUN /opt/certbot/bin/pip install certbot certbot-nginx
RUN ln -s /opt/certbot/bin/certbot /usr/bin/certbot
