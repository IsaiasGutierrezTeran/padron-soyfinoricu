# Consulta al Padrón Electoral — Soy Finor

Front-end para consultar el padrón electoral universitario, con la identidad visual de **S.F. Soy Finor** (ICU 2026-2028). Mismo proyecto base que [padron-ia](https://github.com/IsaiasGutierrezTeran/padron-ia), re-skineado en la paleta azul institucional del partido.

## Qué incluye

- Banner con el afiche de campaña real, a la cabeza de la página, responsivo.
- Logo real (con fondo transparente) en el header, splash screen y favicon.
- Consulta por número de registro contra la API del padrón de la UAGRM.
- Soporte para estudiantes con varias carreras.
- Estados de carga, error y "registro no encontrado".
- Contador de visitas (ícono de ojo, esquina inferior derecha) compartido entre dispositivos.
- Meta tags Open Graph / Twitter Card con imagen de preview.
- Diseño responsivo probado en 320px, 375px, 768px, 1280px y 1920px.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- lucide-react

## Paleta de marca (`src/index.css`)

| Uso | Hex |
|---|---|
| Azul institucional (principal) | `#043F84` |
| Azul profundo (navbar / fondos oscuros) | `#042A61` |
| Azul medio (cards / degradados) | `#1B67BE` |
| Azul eléctrico (botones / destacados) | `#0A51A0` |
| Celeste (brillos / detalles) | `#2DADF0` |
| Celeste claro (hover / fondos suaves) | `#8DD8FF` |
| Texto fuerte | `#081231` |

## Contenido editable (`src/brand.ts`)

Nombre del partido, sigla, eslogan, período y los 4 candidatos (nombre, cargo y foto) viven en un solo archivo — `src/brand.ts` — para editarlos sin tocar el resto del código. Las fotos de los candidatos están recortadas del afiche original en `src/assets/candidatos/`.

## API

```
GET https://eleccionesuagrm.superficct.com/api/buscar.php?registro=<numero>
```

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├─ brand.ts                 # Nombre del partido, sigla, eslogan y candidatos
├─ api.ts                   # Cliente de la API del padrón
├─ types.ts                 # Tipos de la respuesta de la API
├─ App.tsx                  # Layout principal y máquina de estados
├─ assets/
│  ├─ banner.jpg             # Afiche de campaña (hero de la página)
│  ├─ logo.png                # Logo oficial (fondo transparente)
│  ├─ fondo-textura-azul.png  # Textura de fondo generada
│  └─ candidatos/             # Fotos recortadas de los 4 candidatos
└─ components/
   ├─ SplashScreen.tsx      # Pantalla de carga animada con el logo
   ├─ HeroBanner.tsx        # Afiche de campaña responsivo, a la cabeza de la página
   ├─ SearchForm.tsx        # Formulario de búsqueda por registro
   ├─ InfoPanel.tsx         # Panel de avisos y recomendaciones
   ├─ ResultCard.tsx        # Tarjeta de resultado (mesa, recinto, aula, habilitación)
   ├─ ResultSkeleton.tsx    # Estado de carga tipo skeleton
   ├─ StatusBadge.tsx       # Badge de habilitado / no habilitado
   ├─ StatusMessage.tsx     # Estado de error / registro no encontrado
   ├─ VisitCounter.tsx      # Contador de visitas (esquina inferior derecha)
   └─ Logo.tsx              # Logo del partido
```
