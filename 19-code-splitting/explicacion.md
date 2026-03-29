# Code Splitting — No lleves toda la mudanza en un solo viaje

---

## El problema que resuelve

Cuando React construye tu app, empaqueta **todo el código** en un solo archivo (bundle). Si tu app tiene un editor de código (300KB), un dashboard con gráficos (200KB), y una página de configuración (100KB), el usuario descarga los **600KB completos** antes de ver algo — aunque solo quiera ver la página de inicio.

Code splitting divide ese bundle en **pedazos más pequeños** que se cargan bajo demanda.

---

## La analogía: La mudanza

Imagina que te mudas de casa. Puedes:

- **Sin code splitting**: meter TODO en un solo camión gigante. Tarda mucho en llegar, y la mayoría de las cajas no las necesitas el primer día.
- **Con code splitting**: llevar primero lo esencial (cama, cocina) y después traer el resto cuando lo necesites.

```
  Sin splitting:                     Con splitting:
  ┌──────────────────────┐           Viaje 1: ┌──────┐ (lo esencial)
  │ Home + Dashboard +   │           Viaje 2: ┌──────────┐ (cuando navega)
  │ Settings + Editor +  │           Viaje 3: ┌────────────────┐ (cuando abre editor)
  │ Admin + Charts ...   │
  │ 600KB ⏳              │
  └──────────────────────┘
```

---

## React.lazy + Suspense — lo básico

### Antes (importación normal)

```jsx
// Se carga SIEMPRE, aunque el usuario nunca abra Settings
import Settings from "./Settings";
import Dashboard from "./Dashboard";

function App() {
  const [page, setPage] = useState("dashboard");
  return page === "dashboard" ? <Dashboard /> : <Settings />;
}
```

### Después (carga bajo demanda)

```jsx
import { lazy, Suspense } from "react";

// Se cargan SOLO cuando el usuario los necesita
const Settings = lazy(() => import("./Settings"));
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <Suspense fallback={<p>Cargando...</p>}>
      {page === "dashboard" ? <Dashboard /> : <Settings />}
    </Suspense>
  );
}
```

### ¿Cómo funciona?

1. `lazy(() => import("./Settings"))` le dice a React: "no cargues este módulo ahora, cárgalo cuando se necesite"
2. Cuando `Settings` se renderiza por primera vez, React inicia la descarga del chunk
3. Mientras se descarga, `Suspense` muestra el `fallback`
4. Cuando la descarga termina, React renderiza el componente real
5. Las siguientes veces que se renderice, ya está cargado — sin espera

---

## Dónde poner Suspense

### A nivel de ruta (lo más común)

```jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const Admin = lazy(() => import("./pages/Admin"));

function App() {
  return (
    <BrowserRouter>
      <nav>...</nav>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

El nav siempre está visible. Solo el contenido de la página muestra "Cargando...".

### A nivel de componente pesado

```jsx
// Un editor de markdown de 300KB — no lo cargues hasta que el usuario lo abra
const MarkdownEditor = lazy(() => import("./MarkdownEditor"));

function PostEditor() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <button onClick={() => setShowEditor(true)}>Abrir editor</button>
      {showEditor && (
        <Suspense fallback={<p>Cargando editor...</p>}>
          <MarkdownEditor />
        </Suspense>
      )}
    </div>
  );
}
```

---

## Next.js: dynamic imports

En Next.js, usas `next/dynamic` en vez de `React.lazy`:

```jsx
import dynamic from "next/dynamic";

// Carga lazy + desactiva SSR (útil para componentes que usan window/document)
const MonacoEditor = dynamic(() => import("./MonacoEditor"), {
  ssr: false,
  loading: () => <p>Cargando editor...</p>,
});

function CodePage() {
  return <MonacoEditor />;
}
```

### ¿Cuándo usar `ssr: false`?

Cuando el componente usa APIs del navegador (`window`, `document`, `localStorage`) que no existen en el servidor.

---

## Qué separar y qué no

### ✅ Sí separa:

| Caso | Por qué |
|---|---|
| Rutas/páginas | Cada página es un chunk independiente |
| Componentes pesados (editores, gráficos, mapas) | 100KB+ que no todos necesitan |
| Modales y drawers complejos | No se ven hasta que el usuario interactúa |
| Funcionalidad de admin | Solo un % pequeño de usuarios la usa |

### ❌ No separa:

| Caso | Por qué |
|---|---|
| Componentes pequeños (botones, inputs) | El overhead de la carga lazy es mayor que el ahorro |
| Componentes que siempre se muestran | Se cargarían de todas formas |
| Componentes críticos del primer render | El usuario vería un flash de "Cargando..." |

---

## Precargar un chunk (preload)

Si sabes que el usuario probablemente va a necesitar un componente, puedes precargarlo mientras hoverea un botón:

```jsx
const Settings = lazy(() => import("./Settings"));

function Nav() {
  // Precarga cuando el mouse pasa por encima
  const preloadSettings = () => import("./Settings");

  return (
    <button
      onMouseEnter={preloadSettings}
      onClick={() => setPage("settings")}
    >
      Configuración
    </button>
  );
}
```

Así cuando el usuario hace clic, el chunk ya está descargado o casi descargado.

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es code splitting? | Dividir el bundle en pedazos que se cargan bajo demanda |
| ¿Cómo se hace en React? | `React.lazy` + `Suspense` |
| ¿Cómo en Next.js? | `next/dynamic` con opciones como `ssr: false` |
| ¿Dónde es más útil? | Rutas, componentes pesados, modales, features de admin |
| ¿Dónde NO usarlo? | Componentes pequeños o que siempre se muestran |
| ¿Se puede precargar? | Sí — con `import()` en onMouseEnter o similar |
