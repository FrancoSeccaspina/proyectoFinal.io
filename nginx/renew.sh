#!/bin/bash
certbot certonly --nginx \
  -d activafitness.com.ar \
  -d dashboard.activafitness.com.ar \
  --non-interactive
