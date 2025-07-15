# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production (runs TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Project Architecture

This is a React + TypeScript + Vite rental property platform called UBIKHA with a multi-tenant architecture supporting three user types:

### Application Structure

**Core App Flow:**
- `src/main.tsx` → `src/App.tsx` → `src/router/AppRouter.tsx`
- Uses React Router for client-side routing with role-based login pages

**Component Architecture:**
- **Layout Components** (`src/components/layout/`): Header, Footer, MainContent, Features
- **UI Components** (`src/components/ui/`): Input, Button, LoginForm, Modal
- **Feature Components** (`src/components/features/`): PropertyCard
- **Role-specific Components** (`src/components/`): administrador/, arrendador/, arrendatario/

**Pages Structure:**
- `HomePage` - Main landing page with features showcase
- `LoginArrendadorPage` - Landlord login
- `LoginArrendatarioPage` - Tenant login  
- `LoginAdministradorPage` - Admin login

### Key Routes
- `/` - Homepage
- `/login-arrendador` - Landlord login
- `/login-arrendatario` - Tenant login
- `/login-administrador` - Admin login

### Component Export Pattern
All components use centralized exports via `index.ts` files in each directory, exporting both components and their TypeScript types.

### Styling
Uses CSS modules with component-specific stylesheets (e.g., `Component.css` alongside `Component.tsx`).

### TypeScript Configuration
- Strict TypeScript settings enabled
- Uses ES2022 target with DOM libraries
- Bundler module resolution for Vite compatibility