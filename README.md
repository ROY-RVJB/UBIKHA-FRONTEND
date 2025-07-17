# 🏠 UBIKHA Frontend

Sistema de gestión de alquileres inmobiliarios desarrollado con React + TypeScript + Vite.

## 📋 Tabla de Contenidos

- [🚀 Inicio Rápido](#-inicio-rápido)
- [⚙️ Configuración](#️-configuración)
- [🛠️ Tecnologías](#️-tecnologías)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🌍 Variables de Entorno](#-variables-de-entorno)
- [🚀 Despliegue](#-despliegue)

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.0.0 o superior
- npm o yarn

### Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd UBIKHA-FRONTEND
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   # Copia el archivo de ejemplo
   cp .env.example .env
   
   # Edita el archivo .env con tus configuraciones
   # VITE_BACKEND_URL=http://localhost:8000
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador en** `http://localhost:5175`

## ⚙️ Configuración

### Variables de Entorno

El proyecto utiliza variables de entorno para la configuración. **NUNCA** commitees el archivo `.env` al repositorio.

#### Configuración Inicial

1. Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus valores:
   ```env
   # Desarrollo local
   VITE_BACKEND_URL=http://localhost:8000
   VITE_APP_ENV=development
   
   # Servidor de desarrollo
   # VITE_BACKEND_URL=http://26.196.154.46:8000
   
   # Producción
   # VITE_BACKEND_URL=https://api.ubikha.com
   ```

#### Variables Disponibles

| Variable | Descripción | Valores |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | URL del API backend | URL completa |
| `VITE_APP_ENV` | Entorno de la aplicación | development, staging, production |
| `VITE_LOG_LEVEL` | Nivel de logs | error, warn, info, debug |

## 🛠️ Tecnologías

- **React 19.1.0** - Biblioteca de UI
- **TypeScript 5.8.3** - Tipado estático
- **Vite 7.0.4** - Build tool y dev server
- **React Router DOM 7.6.3** - Enrutamiento
- **ESLint** - Linting de código
- **CSS Modules** - Estilos modulares

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── layout/          # Componentes de layout (Header, Footer, etc.)
│   ├── ui/              # Componentes de UI básicos (Button, Input, etc.)
│   └── features/        # Componentes específicos de funcionalidades
├── pages/               # Páginas de la aplicación
├── router/              # Configuración de rutas
├── assets/              # Recursos estáticos (imágenes, iconos)
├── types/               # Definiciones de tipos TypeScript
├── utils/               # Utilidades y helpers
├── hooks/               # Custom hooks de React
└── constants/           # Constantes de la aplicación
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Construcción
npm run build        # Construye la aplicación para producción
npm run preview      # Preview de la build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Ejecuta ESLint y corrige errores automáticamente

# Tipo checking
npm run type-check   # Verifica tipos con TypeScript
```

## 🌍 Variables de Entorno

### Configuración por Entorno

#### Desarrollo Local
```env
VITE_BACKEND_URL=http://localhost:8000
VITE_APP_ENV=development
VITE_LOG_LEVEL=debug
```

#### Servidor de Desarrollo
```env
VITE_BACKEND_URL=http://26.196.154.46:8000
VITE_APP_ENV=development
VITE_LOG_LEVEL=info
```

#### Producción
```env
VITE_BACKEND_URL=https://api.ubikha.com
VITE_APP_ENV=production
VITE_LOG_LEVEL=error
```

### 🔒 Seguridad

- ✅ Nunca commitees archivos `.env` al repositorio
- ✅ Usa `.env.example` para documentar las variables necesarias
- ✅ Las variables de Vite deben empezar con `VITE_`
- ✅ No incluyas claves secretas en variables `VITE_` (son públicas)

## 🚀 Despliegue

### Build para Producción

```bash
# Construir la aplicación
npm run build

# Los archivos se generan en la carpeta 'dist'
```

### Variables de Entorno en Producción

Asegúrate de configurar las variables de entorno en tu plataforma de despliegue:

- **Vercel**: Configurar en el dashboard de Vercel
- **Netlify**: Configurar en Site settings > Environment variables
- **Docker**: Usar archivos `.env` o variables del sistema

## 📝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](#)
2. Busca en [Issues existentes](../../issues)
3. Crea un [nuevo Issue](../../issues/new)

---

**Desarrollado con ❤️ por el equipo UBIKHA**
