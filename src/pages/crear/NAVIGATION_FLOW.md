# Flujo de Navegación - Crear Anuncio

## Flujo Completo

### PASO 1: Describe tu espacio
1. **PropertySetupIntro** (`/step1`)
   - ← Atrás: Home (`/`)
   - → Siguiente: Ubicación (`/step1/location`)

2. **PropertyLocationForm** (`/step1/location`)
   - ← Atrás: Intro Paso 1 (`/step1`)
   - → Siguiente: Capacidad (`/step1/capacity`)

3. **PropertyCapacityForm** (`/step1/capacity`)
   - ← Atrás: Ubicación (`/step1/location`)
   - → Siguiente: Intro Paso 2 (`/step2`)

### PASO 2: Haz que destaque
4. **PropertyPresentationIntro** (`/step2`)
   - ← Atrás: Capacidad (`/step1/capacity`)
   - → Siguiente: Comodidades (`/step2/amenities`)

5. **PropertyAmenitiesSelector** (`/step2/amenities`)
   - ← Atrás: Intro Paso 2 (`/step2`)
   - → Siguiente: Fotos (`/step2/photos`)

6. **PropertyPhotoUploader** (`/step2/photos`)
   - ← Atrás: Comodidades (`/step2/amenities`)
   - → Siguiente: Título (`/step2/title`)

7. **PropertyTitleEditor** (`/step2/title`)
   - ← Atrás: Fotos (`/step2/photos`)
   - → Siguiente: Descripción (`/step2/description`)

8. **PropertyDescriptionEditor** (`/step2/description`)
   - ← Atrás: Título (`/step2/title`)
   - → Siguiente: Intro Paso 3 (`/step3`)

### PASO 3: Terminar y publicar
9. **PropertyPublishingIntro** (`/step3`)
   - ← Atrás: Descripción (`/step2/description`)
   - → Siguiente: Precio (`/step3/price`)

10. **PropertyPricingCalculator** (`/step3/price`)
    - ← Atrás: Intro Paso 3 (`/step3`)
    - → Siguiente: Publicar (acción final)

## Resumen del Flujo

```
/step1 → /step1/location → /step1/capacity → 
/step2 → /step2/amenities → /step2/photos → /step2/title → /step2/description → 
/step3 → /step3/price → [PUBLICAR]
```

## Datos Capturados

### Paso 1
- **Ubicación**: Dirección, zona, referencias (Puerto Maldonado)
- **Capacidad**: Huéspedes, habitaciones, camas, baños

### Paso 2
- **Comodidades**: WiFi, cocina, estacionamiento, etc.
- **Fotos**: Hasta 5 imágenes
- **Título**: Nombre del anuncio
- **Descripción**: Detalles de la propiedad

### Paso 3
- **Precio**: Valor mensual del alquiler