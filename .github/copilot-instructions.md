# CLAMP Website - Guía de Desarrollo y Mantenimiento

## Descripción General
Sitio web y panel de administración para CLAMP Light Rental - alquiler de equipamiento de iluminación profesional.

## Características Implementadas ✅

### Frontend
- Homepage optimizado para conversiones
- Catálogo de productos con filtrado dinámico  
- Página de contacto con formulario
- Responsive design con Tailwind CSS
- SEO optimizado con metadata

### Backend & Admin
- Panel administrativo seguro
- CRUD de productos completamente funcional
- Autenticación JWT
- Base de datos MongoDB con Prisma ORM
- API REST para productos y contacto

### Seguridad
- Hashing de contraseñas con bcrypt
- JWT con expiración de 7 días
- Validación de datos
- Protección de rutas

## Stack Tecnológico
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Estilos**: Tailwind CSS
- **BD**: MongoDB + Prisma ORM
- **Auth**: JWT + bcryptjs

## Instrucciones de Inicio Rápido

### Desarrollo Local
```bash
npm run dev
# Accede a http://localhost:3000
```

### Crear Usuario Admin
```bash
npx prisma studio
# Crea registro en tabla "Admin"
```

## Estructura de Carpetas

```
src/
├── app/           # Páginas y API
│   ├── page.tsx           # Inicio
│   ├── catalogo/          # Productos
│   ├── contacto/          # Contacto
│   ├── admin/             # Admin
│   └── api/               # APIs REST
├── components/    # Componentes
└── lib/          # Utilidades
```

## Scripts

```bash
npm run dev       # Desarrollo
npm run build     # Compilar
npm run start     # Producción
npm run lint      # Verificar
```

## Despliegue

Vercel recomendado. Configura:
- DATABASE_URL
- JWT_SECRET

## Documentación Completa

Ver SETUP_GUIDE.md para instrucciones detalladas.
