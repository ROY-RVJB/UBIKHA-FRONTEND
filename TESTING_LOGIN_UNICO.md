# 🧪 TESTING SCRIPT - LOGIN ÚNICO

## **📋 CASOS DE PRUEBA OBLIGATORIOS**

### **✅ FUNCIONALIDAD CORE - Login Universal**

#### **Test 1: Admin Login**
- **URL**: `http://localhost:5175/login`
- **Credenciales**: 
  - Email: `user@example.com`
  - Password: `claveadmin321`
- **Resultado Esperado**: Redirección a `/admin-dashboard`

#### **Test 2: Owner Login**  
- **URL**: `http://localhost:5175/login`
- **Credenciales**:
  - Email: `pruebaubikha@gmail.com` 
  - Password: `prueba123`
- **Resultado Esperado**: Redirección a `/home-arrendador`

#### **Test 3: Client Login**
- **URL**: `http://localhost:5175/login`
- **Credenciales**:
  - Email: `luis@ubikha.pe`
  - Password: `luisback`
- **Resultado Esperado**: Redirección a `/home-arrendatario`

### **✅ CASOS EDGE**

#### **Test 4: Credenciales Incorrectas**
- **URL**: `http://localhost:5175/login`
- **Credenciales**: Email/password incorrectos
- **Resultado Esperado**: Error mostrado en UI

#### **Test 5: Navegación Header**
- **URL**: `http://localhost:5175/`
- **Acción**: Click en botones del header
- **Resultado Esperado**: Navegación a `/login`

### **✅ VALIDACIÓN DE ELIMINACIÓN**

#### **Test 6: URLs Antiguas Eliminadas**
- **URLs a probar**:
  - `http://localhost:5175/login-administrador` → Debe fallar (404)
  - `http://localhost:5175/login-arrendador` → Debe fallar (404)
  - `http://localhost:5175/login-arrendatario` → Debe fallar (404)

### **✅ REGRESIÓN - Funcionalidades Existentes**

#### **Test 7: HomePage**
- **URL**: `http://localhost:5175/`
- **Resultado Esperado**: Página principal funcional

#### **Test 8: Dashboards Post-Login**
- **Verificar acceso directo a**:
  - `/admin-dashboard`
  - `/home-arrendador` 
  - `/home-arrendatario`

---

## **🚀 COMANDOS PARA TESTING**

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5175/login
```

---

## **📊 CHECKLIST DE VALIDACIÓN**

- [ ] ✅ Login admin funciona y redirige correctamente
- [ ] ✅ Login owner funciona y redirige correctamente  
- [ ] ✅ Login client funciona y redirige correctamente
- [ ] ✅ Errores de credenciales muestran mensaje apropiado
- [ ] ✅ Header navega a `/login` correctamente
- [ ] ✅ URLs antigas devuelven 404
- [ ] ✅ HomePage sigue funcionando
- [ ] ✅ Dashboards accesibles post-login
- [ ] ✅ No hay errores en consola del navegador
- [ ] ✅ Aplicación compila sin errores

---

## **🐛 POSIBLES PROBLEMAS Y SOLUCIONES**

### **Error de Compilación:**
```bash
# Si hay imports faltantes:
npm run build
# Revisar errores de TypeScript
```

### **Error 404 en Rutas:**
- Verificar que `AppRouter.tsx` esté actualizado
- Verificar que `LoginPage.tsx` esté exportado correctamente

### **Error de Redirección:**
- Verificar que `authService.loginUniversal()` funcione
- Verificar que `getRedirectPath()` devuelva rutas correctas

---

**Fecha de creación**: $(date)
**Implementación**: Login Único - Opción A (Migración Completa)
**Estado**: ✅ Listo para testing