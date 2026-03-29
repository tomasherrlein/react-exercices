# Context API — El canal de radio de React

---

## El problema que resuelve

En el tema anterior aprendiste a subir estado al padre. Pero ¿qué pasa cuando el dato lo necesita un componente que está **5 niveles más abajo**? Tienes que pasar la prop por cada componente intermedio, aunque esos componentes no la usen. Eso es **prop drilling** y hace el código frágil y difícil de mantener.

Context resuelve esto: permite que un componente comparta datos con **cualquier descendiente**, sin importar la profundidad, sin pasar props manualmente.

---

## La analogía: Canal de radio

Imagina una emisora de radio:

- El **Provider** es la **antena transmisora** — emite la señal (los datos)
- Los componentes que usan `useContext` son las **radios receptoras** — sintonizan la señal
- Los componentes intermedios no necesitan hacer nada — la señal los atraviesa

```
  ┌──── Provider (antena) ────────────────┐
  │         value = { user, theme }       │
  │                                       │
  │   ┌─── Layout ─────────────────────┐  │
  │   │  (no usa context, no le importa)│  │
  │   │                                 │  │
  │   │   ┌─── Sidebar ─────────────┐  │  │
  │   │   │  (no usa context)       │  │  │
  │   │   │                         │  │  │
  │   │   │   ┌─── UserAvatar ───┐  │  │  │
  │   │   │   │  useContext(📻)   │  │  │  │
  │   │   │   │  "¡Tengo user!"  │  │  │  │
  │   │   │   └──────────────────┘  │  │  │
  │   │   └─────────────────────────┘  │  │
  │   └────────────────────────────────┘  │
  └───────────────────────────────────────┘
```

---

## Cómo funciona Context — 3 pasos

### Paso 1: Crear el contexto

```jsx
import { createContext } from "react";

// Crea el "canal de radio" con un valor por defecto
const ThemeContext = createContext("light");
```

El valor por defecto (`"light"`) se usa solo si un componente lee el contexto **sin tener un Provider arriba**. En la práctica, siempre tendrás un Provider.

### Paso 2: Proveer el valor (Provider = antena)

```jsx
function App() {
  const [theme, setTheme] = useState("light");

  return (
    // Envuelve el árbol que necesita acceso al valor
    <ThemeContext.Provider value={theme}>
      <Layout />
    </ThemeContext.Provider>
  );
}
```

Todo componente dentro de `<ThemeContext.Provider>` puede acceder a `theme`.

### Paso 3: Consumir el valor (useContext = radio)

```jsx
import { useContext } from "react";

function Button() {
  const theme = useContext(ThemeContext);  // "sintoniza" el canal

  return (
    <button style={{
      background: theme === "dark" ? "#333" : "#fff",
      color: theme === "dark" ? "#fff" : "#333",
    }}>
      Soy un botón {theme}
    </button>
  );
}
```

`Button` puede estar a 10 niveles de profundidad — no importa. Si hay un Provider arriba, lo encuentra.

---

## Patrón recomendado: Context + custom hook

En vez de exportar el contexto y que cada consumidor haga `useContext(MiContext)`, crea un **custom hook** que encapsule todo:

```jsx
// ThemeContext.jsx — todo el contexto en un archivo
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

// El Provider como componente reutilizable
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(t => t === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — lo único que los consumidores importan
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }
  return context;
}
```

```jsx
// App.jsx
import { ThemeProvider } from "./ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
```

```jsx
// Cualquier componente descendiente
import { useTheme } from "./ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header>
      <p>Tema actual: {theme}</p>
      <button onClick={toggleTheme}>Cambiar tema</button>
    </header>
  );
}
```

### ¿Por qué el custom hook?

1. **Validación**: lanza error si alguien usa `useTheme()` fuera del Provider
2. **Encapsulación**: los consumidores no importan `ThemeContext` directamente
3. **Autocompletado**: el IDE sabe qué retorna `useTheme()`

---

## Cuándo usar Context y cuándo NO

### SÍ usa Context para:

- **Tema** (dark/light mode)
- **Usuario autenticado** (datos de sesión)
- **Idioma** (internacionalización)
- **Configuración global** que muchos componentes leen

### NO uses Context para:

- **Estado que cambia frecuentemente** (posición del mouse, timers) — cada cambio re-renderiza TODOS los consumidores
- **Estado que solo 2-3 componentes comparten** — lifting state up es más simple
- **Datos del servidor** (listas, productos) — usa React Query/SWR en su lugar

### La trampa del re-render

```jsx
// ❌ Si count cambia 60 veces por segundo, TODOS los consumidores se re-renderizan
<MyContext.Provider value={{ count, user, theme }}>
```

Cada vez que el `value` del Provider cambia, **todos** los componentes que usan `useContext` se re-renderizan, aunque solo usen una parte del valor.

**Solución:** separa contextos por frecuencia de cambio:

```jsx
// ✅ Dos contextos — cambios en uno no afectan al otro
<CounterContext.Provider value={count}>
  <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>
</CounterContext.Provider>
```

---

## Múltiples Providers (anidados)

Puedes combinar varios contextos:

```jsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <Layout />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

Cada Provider es independiente. Un componente puede consumir uno, varios, o todos.

---

## Context vs Props: guía de decisión

```
¿Solo 1-2 componentes necesitan el dato?
  → Props directas o lifting state up

¿Pasas props por 2+ componentes que no las usan?
  → Context

¿El dato cambia muy frecuentemente (mouse, scroll, timers)?
  → useRef o estado local, NO Context

¿Son datos del servidor (listas, productos, API)?
  → React Query / SWR, NO Context
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es Context? | Un mecanismo para compartir datos con cualquier descendiente sin prop drilling |
| ¿Cuándo usarlo? | Tema, usuario, idioma — datos que muchos componentes leen |
| ¿Cuándo NO usarlo? | Datos que cambian muy frecuentemente, o datos del servidor |
| ¿Qué son los 3 pasos? | createContext → Provider (con value) → useContext |
| ¿Por qué custom hook? | Validación, encapsulación, mejor autocompletado |
| ¿Qué pasa si el value cambia? | TODOS los consumidores se re-renderizan |
| ¿Cómo evitar re-renders innecesarios? | Separar en múltiples contextos por frecuencia de cambio |
