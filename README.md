# CLAMP Light Rental - Sitio Web y Panel de Administración

Una solución completa para gestionar un negocio de alquiler de material de iluminación profesional. Incluye sitio web optimizado para SEO, catálogo de productos y panel de administración para gestionar el inventario.

## Características

✅ **Sitio Web Profesional**
- Página principal con llamada a la acción
- Catálogo de productos dinámico
- Página de contacto con formulario
- Diseño responsive y moderno
- Optimizado para SEO

✅ **Panel de Administración**
- Autenticación segura con JWT
- Gestión completa de productos (CRUD)
- Interfaz intuitiva y fácil de usar
- Base de datos MongoDB

✅ **Stack Tecnológico**
- Next.js 16+ con App Router
- TypeScript para seguridad de tipos
- Tailwind CSS para estilos
- Prisma ORM para base de datos
- MongoDB para persistencia
- JWT para autenticación

## Instalación Rápida

### Requisitos
- Node.js 18+
- MongoDB Atlas account (gratuito)

### Pasos

1. **Variables de entorno** - Edita `.env.local`:
   ```
   DATABASE_URL="mongodb+srv://usuario:contraseña@cluster.mongodb.net/clamp"
   JWT_SECRET="tu-clave-secreta-aqui"
   ```

2. **Instala y ejecuta**:
   ```bash
   npm install
   npx prisma db push
   npm run dev
   ```

3. **Accede a**:
   - Sitio: http://localhost:3000
   - Admin: http://localhost:3000/admin

## Estructura del Proyecto

```
src/
├── app/                    # Páginas y API routes
│   ├── page.tsx           # Inicio
│   ├── catalogo/          # Catálogo de productos
│   ├── contacto/          # Formulario de contacto
│   ├── admin/             # Panel administrativo
│   └── api/               # API REST
├── components/            # Componentes React
└── lib/                   # Utilidades
```

## Credenciales por Defecto

Para crear el admin inicial, ejecuta:
```bash
npx prisma studio  # Para ver/crear datos en la BD
```

## Scripts

```bash
npm run dev       # Desarrollo (localhost:3000)
npm run build     # Compilar para producción
npm run start     # Ejecutar en producción
npm run lint      # Verificar código
```

## Documentación Completa

Ver [documentación detallada](./DOCUMENTATION.md) para guía completa de uso, despliegue y características avanzadas.
