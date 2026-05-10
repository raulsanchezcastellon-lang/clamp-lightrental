# CLAMP Light Rental - Guía Completa de Instalación y Uso

## ✅ Estado del Proyecto

Tu nuevo sitio web CLAMP está **100% listo**. El proyecto ha sido compilado y verificado exitosamente.

### Lo que se ha creado:

✅ Sitio web profesional con:
- Página de inicio con llamada a la acción
- Catálogo de productos dinámico (filtrable por categorías)
- Página de contacto con formulario funcional
- Diseño responsive y moderno con Tailwind CSS
- SEO optimizado con meta tags

✅ Panel de administración completo:
- Autenticación segura con JWT
- Gestión de productos (CRUD: Crear, Leer, Actualizar, Eliminar)
- Interfaz intuitiva y profesional
- Base de datos MongoDB integrada

## 🚀 Cómo Ejecutar Localmente

### Paso 1: Configurar Variables de Entorno

Abre el archivo `.env.local` en la raíz del proyecto y configura:

```env
# Base de datos MongoDB (obtén una cuenta gratuita en mongodb.com/cloud/atlas)
DATABASE_URL="mongodb+srv://usuario:contraseña@cluster.mongodb.net/clamp?retryWrites=true&w=majority"

# Clave secreta para JWT (cámbiala por algo seguro)
JWT_SECRET="tu-clave-secreta-super-segura-aqui-123"

# URL base (local en desarrollo)
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Paso 2: Iniciar Servidor

Abre una terminal en el directorio `/Users/raulsanchez/Desktop/clamp-website` y ejecuta:

```bash
npm run dev
```

### Paso 3: Accede a tu sitio

- **Sitio web**: http://localhost:3000
- **Panel admin**: http://localhost:3000/admin

## 🔐 Crear Usuario Administrador

Como el sistema es nuevo, necesitas crear tu primer usuario admin. Hay dos opciones:

### Opción A: Usar Prisma Studio (Recomendado)

```bash
npx prisma studio
```

Esto abrirá una interfaz visual en http://localhost:5555 donde puedes:
1. Ir a la tabla "Admin"
2. Crear un nuevo registro con:
   - email: tu@email.com
   - password: (cualquier contraseña - será hasheada automáticamente)
   - name: Tu Nombre

### Opción B: Script Personalizado

Crea un archivo `scripts/create-admin.ts`:

```typescript
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

async function main() {
  const password = await hashPassword("tucontraseña123");
  
  const admin = await prisma.admin.create({
    data: {
      email: "admin@clamp-lightrental.es",
      password: password,
      name: "Admin",
    },
  });

  console.log("✅ Admin creado:", admin);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
```

Luego ejecuta:
```bash
npx ts-node scripts/create-admin.ts
```

## 📱 Estructura de la Aplicación

```
clamp-website/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 🏠 Página principal
│   │   ├── catalogo/page.tsx     # 📦 Catálogo de productos
│   │   ├── contacto/page.tsx     # 📧 Formulario de contacto
│   │   ├── admin/
│   │   │   ├── page.tsx          # 🔑 Login de admin
│   │   │   └── products/page.tsx # 🛠️ Gestión de productos
│   │   └── api/
│   │       ├── auth/             # Autenticación
│   │       ├── products/         # CRUD de productos
│   │       └── contact/          # Formulario contacto
│   ├── components/
│   │   ├── Header.tsx            # Navegación
│   │   └── Footer.tsx            # Pie de página
│   └── lib/
│       ├── prisma.ts             # Cliente de BD
│       ├── auth.ts               # JWT utilities
│       └── password.ts           # Hash de contraseñas
├── prisma/
│   └── schema.prisma             # Esquema base de datos
└── package.json
```

## 🎯 Funcionalidades del Panel Admin

Una vez logueado en `/admin`:

### Ver Productos
Tabla con todos tus productos. Muestra:
- Nombre
- Categoría
- Precio (€/día)
- Stock disponible

### Crear Producto
Botón "+ Agregar Producto" con campos:
- Nombre (ej: LED PAR 64)
- Descripción
- Categoría (Proyectores, Reflectores, Geles, etc.)
- Precio por día
- Stock disponible
- Disponible (sí/no)

### Editar Producto
Click en "Editar" para modificar cualquier información

### Eliminar Producto
Click en "Eliminar" (pedirá confirmación)

## 🌐 Páginas del Sitio Web

### Página Principal
- Hero section con imagen de fondo
- 3 características principales
- CTA (Llamadas a la acción) a catálogo y contacto
- Responsive en todos los dispositivos

### Catálogo
- Grid de productos con imágenes placeholder
- Filtrado por categorías
- Información de precio y descripción
- Botón "Solicitar"

### Contacto
- Formulario: Nombre, Email, Teléfono, Mensaje
- Información de contacto (dirección, teléfono, horario)
- Validación de campos
- Mensaje de confirmación al enviar

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ JWT con expiración de 7 días
- ✅ Cookies HttpOnly y Secure
- ✅ Validación de datos en frontend y backend
- ✅ Protección de rutas API

## 📦 Dependencias Principales

```json
{
  "next": "16.2.4",              // Framework web
  "react": "19",                  // UI library
  "tailwindcss": "3.4.x",        // CSS framework
  "typescript": "5",              // Type safety
  "prisma": "5.21.1",             // ORM
  "@prisma/client": "5.21.1",    // BD client
  "mongodb": "^6",                // Driver MongoDB
  "jsonwebtoken": "^9",           // JWT auth
  "bcryptjs": "^2",               // Password hashing
  "zod": "^3"                     // Data validation
}
```

## 📝 Scripts NPM

```bash
npm run dev       # Desarrollo (http://localhost:3000)
npm run build     # Compilar para producción
npm run start     # Ejecutar build en producción
npm run lint      # Verificar código con ESLint
```

## 🚢 Despliegue a Producción

### Opción 1: Vercel (Recomendado)

1. Sube tu código a GitHub
2. Conecta repo a vercel.com
3. Configura variables de entorno
4. Vercel despliega automáticamente

### Opción 2: Tu propio servidor

```bash
npm run build
npm run start
```

## 🆘 Solución de Problemas

### "Error de conexión a MongoDB"
- ✓ Verifica tu CONNECTION_STRING
- ✓ Asegúrate que tu IP está en whitelist en MongoDB Atlas
- ✓ Comprueba credenciales de usuario

### "Error 401 en login"
- ✓ Verifica que el admin existe en la base de datos
- ✓ Comprueba que el email y contraseña son correctos
- ✓ Limpia cookies del navegador (Ctrl+Shift+Delete)

### Puerto 3000 en uso
```bash
# Usa otro puerto
PORT=3001 npm run dev
```

## 🎨 Personalización

### Cambiar colores
Edita `src/app/globals.css` o usa clases Tailwind. El color principal es azul (`bg-blue-600`).

### Cambiar logo
Reemplaza el logo en `src/components/Header.tsx` (línea con "CLAMP")

### Agregar más categorías
Edita `CATEGORIES` en `src/app/catalogo/page.tsx`

### Cambiar información de contacto
Edita `src/app/contacto/page.tsx` con tu información real

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)

## ✨ Próximos Pasos Recomendados

1. Crear tu base de datos MongoDB
2. Crear usuario admin inicial
3. Personalizar información de empresa
4. Agregar tus productos al catálogo
5. Cambiar imágenes placeholder por reales
6. Desplegar en Vercel o tu servidor

---

**¡Tu sitio web CLAMP está listo para despegar! 🚀**

Si tienes preguntas, consulta el README.md o la documentación de las librerías utilizadas.
