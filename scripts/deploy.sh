#!/bin/bash
set -e

if [ ! -f .env ]; then
  echo "ERROR: Falta .env. Cópialo desde .env.production.example y rellena los valores."
  exit 1
fi

docker compose -f docker-compose.prod.yml up -d --build
echo "Hecho. App disponible en el puerto 3000."
