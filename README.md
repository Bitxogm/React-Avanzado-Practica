# Marketplace - React Avanzado

## Descripción
...

## Requisitos previos
- Docker Desktop
- Node.js
- pnpm

## Instalación y puesta en marcha

### 1. Clonar el repositorio
```bash
git clone ...
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Variables de entorno
Crea un `.env` en la raíz:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:54320/marketplace_react_advanced_db?schema=public"
```

### 4. Levantar la base de datos
```bash
docker compose up -d
```

### 5. Crear tablas y cargar datos
```bash
pnpm db:migrate
pnpm db:seed
```

### 6. Arrancar la app
```bash
pnpm dev
```