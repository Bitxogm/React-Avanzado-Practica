# Marketplace - React Avanzado

## Descripción
Aplicación de marketplace de anuncios construida con Next.js 16, React 19, Prisma 7 y PostgreSQL. Permite listar, filtrar y gestionar anuncios de compraventa.

## Stack
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS v4, Shadcn/ui
- **ORM**: Prisma 7 con adapter PG
- **Base de datos**: PostgreSQL 16
- **Local**: Docker
- **Cloud**: Supabase
- **Deploy**: Vercel

---

## Requisitos previos
- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)

---

## Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

### 2. Instalar dependencias
```bash
pnpm install
```

---

## Configuración de entornos

El proyecto separa el entorno local (Docker) del entorno cloud (Supabase).

### Entorno local (Docker)

Crea un `.env` en la raíz:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/marketplace_react_advanced_db?schema=public"
```

> El puerto puede variar si tienes conflictos. En este proyecto usamos `54320` para evitar colisiones con otros contenedores.

### Entorno cloud (Supabase)

Crea un `.env.supabase` en la raíz (nunca lo subas a git):
```env
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"
```

> **Importante**: Supabase requiere el **session pooler** (puerto 5432), no el transaction pooler (puerto 6543), para operaciones de migrate/push con Prisma.
> 
> La URL del session pooler la encuentras en: Supabase Dashboard → Project → Connect → Session pooler

---

## Base de datos local con Docker

### Levantar el contenedor
```bash
docker compose up -d
```

### Crear tablas
```bash
pnpm prisma:push:local
```

### Cargar datos de prueba
```bash
pnpm prisma:seed:local
```

---

## Base de datos cloud con Supabase

### Crear tablas en Supabase
```bash
pnpm prisma:push:cloud
```

### Cargar datos de prueba en Supabase
```bash
pnpm prisma:seed:cloud
```

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm dev` | Servidor de desarrollo (usa `.env` → Docker) |
| `pnpm build` | Build de producción |
| `pnpm prisma:generate` | Genera el cliente Prisma |
| `pnpm prisma:push:local` | Sincroniza schema con Docker |
| `pnpm prisma:push:cloud` | Sincroniza schema con Supabase |
| `pnpm prisma:seed:local` | Seed en Docker |
| `pnpm prisma:seed:cloud` | Seed en Supabase |

---

## Arrancar la app
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## Deploy en Vercel

La    app está desplegada en Vercel. Para configurar tu propio deploy:

1. Conecta el repositorio en [vercel.com](https://vercel.com)
2. Añade la variable de entorno en el dashboard de Vercel:
```
DATABASE_URL = <tu-session-pooler-url-de-supabase>
```
3. Vercel usará Supabase como base de datos en producción automáticamente.

---

## Estructura del proyecto
```
├── prisma/
│   ├── schema.prisma       # Modelos de datos
│   ├── seed.ts             # Datos de prueba
│   └── generated/          # Cliente Prisma generado (no subir a git)
├── src/
│   ├── app/                # App Router de Next.js
│   ├── components/         # Componentes React
│   ├── lib/                # Utilidades y cliente Prisma
│   └── types/              # Tipos TypeScript
├── .env                    # Variables locales (no subir a git)
├── .env.supabase           # Variables Supabase (no subir a git)
└── docker-compose.yml      # Configuración Docker
```