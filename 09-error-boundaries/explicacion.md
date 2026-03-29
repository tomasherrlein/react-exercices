# Error Boundaries — El try/catch de la UI

---

## El problema que resuelve

En JavaScript, si algo falla dentro de una función, usás `try/catch` para atrapar el error y manejarlo. Pero en React, un error en un componente **rompe todo el árbol** — el usuario ve una pantalla blanca:

```jsx
function UserProfile({ user }) {
  // Si user es null, esto explota y TODA la app desaparece
  return <h1>{user.name}</h1>;
}
```

Sin Error Boundaries, un error en **un solo componente** destruye la app entera. Error Boundaries son el `try/catch` de la UI: atrapan el error y muestran un fallback en vez de una pantalla blanca.

---

## La analogía: Los fusibles eléctricos

Tu casa tiene un tablero de fusibles. Si un cortocircuito ocurre en la cocina, **solo salta el fusible de la cocina** — el resto de la casa sigue con luz.

Sin fusibles (sin Error Boundaries): un cortocircuito en la cocina apaga **toda la casa**.

```
  Sin Error Boundary:          Con Error Boundary:
  ┌────────────────────┐       ┌────────────────────┐
  │ App                │       │ App                │
  │ ┌──────┐ ┌──────┐ │       │ ┌──────┐ ┌──────┐ │
  │ │Sidebar│ │Main  │ │       │ │Sidebar│ │Main  │ │
  │ │      │ │ 💥   │ │       │ │ (ok) │ │ ⚠️   │ │
  │ │      │ │      │ │       │ │      │ │"Algo │ │
  │ └──────┘ └──────┘ │       │ │      │ │falló"│ │
  │                    │       │ └──────┘ └──────┘ │
  │  💀 PANTALLA BLANCA │       │  Sidebar funciona  │
  └────────────────────┘       └────────────────────┘
```

---

## Cómo funciona

Un Error Boundary es un componente de **clase** (es el único caso donde necesitás clases en React moderno) que atrapa errores en sus hijos:

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Se llama cuando un hijo lanza un error durante el render
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Para logging (enviar el error a un servicio como Sentry)
  componentDidCatch(error, errorInfo) {
    console.error("Error atrapado:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Algo salió mal.</h1>;
    }
    return this.props.children;
  }
}
```

### Uso:

```jsx
function App() {
  return (
    <div>
      <Navbar />  {/* Si Navbar falla, la app entera muere */}

      <ErrorBoundary fallback={<p>Error cargando el perfil</p>}>
        <UserProfile />  {/* Si falla, solo este bloque muestra el error */}
      </ErrorBoundary>

      <ErrorBoundary fallback={<p>Error cargando el feed</p>}>
        <Feed />  {/* Independiente — si falla, UserProfile sigue bien */}
      </ErrorBoundary>
    </div>
  );
}
```

---

## ¿Por qué una clase y no un hook?

React **no tiene un hook** equivalente a `componentDidCatch` o `getDerivedStateFromError`. Es el único caso en React moderno donde necesitás un componente de clase. Pero no te preocupes — lo escribís una vez (o usás una librería) y después lo usás como componente normal.

---

## La librería: react-error-boundary

En vez de escribir la clase a mano, usá `react-error-boundary` — es el estándar de la comunidad:

```bash
npm install react-error-boundary
```

```jsx
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Algo salió mal</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Intentar de nuevo</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        // Enviar a Sentry, LogRocket, etc.
        console.error(error, info);
      }}
      onReset={() => {
        // Limpiar estado, refetch, etc.
      }}
    >
      <MiApp />
    </ErrorBoundary>
  );
}
```

### Ventajas sobre la clase manual:

- **resetErrorBoundary**: botón "intentar de nuevo" integrado
- **onError**: callback para logging
- **onReset**: callback para limpiar estado al reintentar
- **resetKeys**: se resetea automáticamente cuando cambian ciertas props

---

## Qué atrapan y qué NO atrapan

### ✅ SÍ atrapan:

- Errores en el **render** de componentes hijos
- Errores en **lifecycle methods** (useEffect, etc.)
- Errores en **constructores** de componentes hijos

### ❌ NO atrapan:

- **Event handlers** (onClick, onChange) — usá try/catch normal
- **Código asíncrono** (setTimeout, fetch) — usá try/catch o .catch()
- **Server-side rendering**
- **Errores del propio Error Boundary** (ponelo más arriba)

```jsx
// Para event handlers, usá try/catch normal:
function Button() {
  function handleClick() {
    try {
      riskyOperation();
    } catch (error) {
      // Manejar el error aquí
      showToast("Error: " + error.message);
    }
  }

  return <button onClick={handleClick}>Acción riesgosa</button>;
}
```

---

## Dónde poner Error Boundaries

### Estrategia: múltiples niveles

```jsx
function App() {
  return (
    // Nivel 1: Boundary global — último recurso
    <ErrorBoundary fallback={<FullPageError />}>
      <Navbar />

      {/* Nivel 2: Por sección — aisla secciones independientes */}
      <ErrorBoundary fallback={<p>Error en el sidebar</p>}>
        <Sidebar />
      </ErrorBoundary>

      <main>
        {/* Nivel 3: Por feature — lo más granular */}
        <ErrorBoundary fallback={<WidgetError />}>
          <StatsWidget />
        </ErrorBoundary>

        <ErrorBoundary fallback={<WidgetError />}>
          <ChartWidget />
        </ErrorBoundary>
      </main>
    </ErrorBoundary>
  );
}
```

### Regla general:

- **Un boundary global** como último recurso (envuelve toda la app)
- **Un boundary por ruta/página** (si una página falla, las otras siguen)
- **Un boundary por widget/feature independiente** (granular)

No pongas un boundary en cada componente — eso es overkill. Ponelos en **límites naturales** de la app.

---

## Error Boundary + Suspense = manejo completo

Error Boundary atrapa **errores**. Suspense maneja **loading**. Juntos cubren todos los estados de un fetch:

```jsx
<ErrorBoundary fallback={<p>Error cargando datos</p>}>
  <Suspense fallback={<p>Cargando...</p>}>
    <DataComponent />
  </Suspense>
</ErrorBoundary>
```

```
Estado:          Lo que se muestra:
─────────        ──────────────────
Cargando     →   "Cargando..." (Suspense)
Error        →   "Error cargando datos" (Error Boundary)
Éxito        →   <DataComponent /> con los datos
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es un Error Boundary? | Un componente que atrapa errores de sus hijos y muestra un fallback |
| ¿Por qué es necesario? | Sin él, un error en un componente rompe TODA la app |
| ¿Es un hook? | No — es el único caso donde necesitás un componente de clase |
| ¿Qué librería usar? | `react-error-boundary` — estándar de la comunidad |
| ¿Atrapa errores en onClick? | No — para event handlers usá try/catch normal |
| ¿Dónde ponerlos? | Global + por ruta + por feature independiente |
| ¿Se combina con Suspense? | Sí — Suspense para loading, Error Boundary para errores |
