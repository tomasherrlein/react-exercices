# Ruta de Aprendizaje para Dominar React

---

## Por qué aprender en este orden

React tiene una trampa común: la gente aprende la API antes de entender el modelo mental. Esta ruta construye primero los fundamentos conceptuales, luego la API, y finalmente los patrones avanzados. Cada etapa tiene un proyecto concreto.

---

## Etapa 1 — Fundamentos (2-3 semanas)

**Objetivo:** Entender qué es React y por qué existe.

| # | Concepto | Descripción |
|---|----------|-------------|
| 1 | JSX | No es HTML — es azúcar sobre `React.createElement`. `class` → `className`, `for` → `htmlFor`, todo en camelCase, expresiones entre `{}` |
| 2 | Componentes y props | Funciones que reciben datos y retornan JSX. Props son **de solo lectura**, nunca las modifiques |
| 3 | useState | Solo para datos que, al cambiar, deben re-renderizar. No pongas en estado cosas derivadas |
| 4 | Listas y keys | Usar siempre un `id` estable como key, nunca el índice si el orden puede cambiar |
| 5 | Eventos y formularios | Formularios **controlados**: React es la fuente de verdad, no el DOM |

**Proyecto de la etapa:** App de lista de tareas sin librerías externas.

---

## Etapa 2 — Efectos y Lógica Reutilizable (2-3 semanas)

**Objetivo:** Entender el ciclo de vida y cómo separar lógica de presentación.

| # | Concepto | Descripción |
|---|----------|-------------|
| 6 | useEffect | Sincronización, no ciclo de vida. Siempre incluir dependencias correctas y cleanup |
| 7 | Custom hooks | Extraer lógica a funciones `useXxx`. La killer feature de React |
| 8 | useRef | Dos usos: acceder al DOM y valores persistentes que no causan re-render |

**Proyecto de la etapa:** App de búsqueda con debounce — custom hook `useDebounce`, fetch a API real, loading/error.

---

## Etapa 3 — Estado Compartido y Arquitectura (2-3 semanas)

**Objetivo:** Saber cuándo y cómo escalar el estado.

| # | Concepto | Descripción |
|---|----------|-------------|
| 9  | Lifting state up | Antes de Context, sube el estado al ancestro común |
| 10 | Context API | Para estado que muchos componentes necesitan. No reemplaza toda gestión de estado |
| 11 | useReducer | Para estado con múltiples sub-valores o lógica compleja de actualización |
| 12 | Cuándo usar librerías | `useState` → lifting → Context → React Query/SWR → Zustand |

**Proyecto de la etapa:** Dashboard con autenticación — Context para usuario, useReducer para formularios, React Router.

---

## Etapa 4 — Performance y Patrones Avanzados (3-4 semanas)

**Objetivo:** Saber cuándo React tiene problemas y cómo resolverlos correctamente.

| # | Concepto | Descripción |
|---|----------|-------------|
| 13 | useMemo / useCallback | No abusar. Usar solo con costo real confirmado por Profiler |
| 14 | React.memo | Solo si hay renders costosos confirmados |
| 15 | Patrones de composición | Compound components, render props, headless components |
| 16 | Code splitting | `React.lazy` + `Suspense` para cargar componentes bajo demanda |
| 17 | Testing | React Testing Library — testea comportamiento, no implementación |
| 18 | React Query / SWR | Para fetching del servidor: cache, loading, paginación, optimistic updates |

**Proyecto de la etapa:** App completa con React Query — fetching, cache, paginación, tests.

---

## Resumen de la ruta

```
Semana 1-3   →  JSX, componentes, props, useState, listas, eventos
Semana 4-6   →  useEffect, custom hooks, useRef
Semana 7-9   →  Context, useReducer, React Router, arquitectura de estado
Semana 10-13 →  Performance, patrones avanzados, testing, React Query
```

---

## Recursos recomendados

- **Docs oficiales**: react.dev (las nuevas, no las viejas de legacy)
- **Para useEffect**: "A Complete Guide to useEffect" — Dan Abramov
- **Para testing**: Testing Library docs + Kent C. Dodds blog
- **Para patrones**: Patterns.dev sección React

---
---

# Ejercicios — Etapa 1: Fundamentos

## Estructura

```
ejercicios-react/
├── 01-jsx/
│   ├── explicacion.md   → Diferencias JSX/HTML, expresiones, condicionales
│   └── ejercicio.jsx    → 5 ejercicios: errores, expresiones, estilos, .map(), Fragments
├── 02-componentes-props/
│   ├── explicacion.md   → Componentes, props, children, spread, composición
│   └── ejercicio.jsx    → 5 ejercicios: descomponer, Avatar, Card, spread, layout
├── 03-usestate/
│   ├── explicacion.md   → Estado, immutabilidad, updater, objetos, arrays
│   └── ejercicio.jsx    → 6 ejercicios: contador, toggle, objeto, carrito, tabs, bugs
├── 04-listas-keys/
│   ├── explicacion.md   → Keys, bug del índice, filtrar/ordenar, edición in-place
│   └── ejercicio.jsx    → 4 ejercicios: bug keys, TodoList, filtros+sort, edición
└── 05-eventos-formularios/
    ├── explicacion.md   → Controlados, handler universal, validación, wizard, dinámicos
    └── ejercicio.jsx    → 4 ejercicios: registro, login+validación, wizard, dinámico
```

## Orden recomendado

Lee la **explicacion.md** de cada tema ANTES de intentar los ejercicios.

| Ejercicio | Concepto clave | Dificultad |
|-----------|---------------|------------|
| 01-jsx (A) | Corregir 6 errores JSX vs HTML | ★☆☆ |
| 01-jsx (B) | Expresiones, ternarios, && | ★☆☆ |
| 01-jsx (C) | Estilos dinámicos con objetos | ★★☆ |
| 01-jsx (D) | .map() para renderizar listas | ★★☆ |
| 01-jsx (E) | Fragments + condicionales complejos | ★★★ |
| 02-props (A) | Descomponer componente monolítico | ★☆☆ |
| 02-props (B) | Props por defecto + condicional | ★☆☆ |
| 02-props (C) | children: componente contenedor | ★★☆ |
| 02-props (D) | Spread operator con props | ★★☆ |
| 02-props (E) | Composición: Page + Section + InfoRow | ★★★ |
| 03-state (A) | Contador con límites y colores | ★☆☆ |
| 03-state (B) | Toggle visibilidad | ★☆☆ |
| 03-state (C) | Estado con objetos (spread) | ★★☆ |
| 03-state (D) | Carrito de compras (arrays) | ★★☆ |
| 03-state (E) | Tabs con contador de visitas | ★★★ |
| 03-state (F) | Encontrar 4 bugs de estado | ★★★ |
| 04-listas (A) | Bug del índice como key | ★☆☆ |
| 04-listas (B) | Todo list completa | ★★☆ |
| 04-listas (C) | Lista filtrable + sortable | ★★★ |
| 04-listas (D) | Edición in-place con borrador | ★★★ |
| 05-forms (A) | Formulario controlado universal | ★★☆ |
| 05-forms (B) | Login con validación visual | ★★☆ |
| 05-forms (C) | Formulario wizard multi-step | ★★★ |
| 05-forms (D) | Formulario dinámico (agregar/quitar) | ★★★ |

## Cómo practicar

1. Lee la **explicacion.md** del tema
2. Intenta resolver el ejercicio sin mirar la solución
3. Si te bloqueas más de 15 minutos, relee la explicación buscando la pista
4. Compara tu solución con la propuesta — pueden ser distintas y ambas válidas

## Para ejecutar los ejercicios

Necesitas un proyecto React. La forma más rápida:

```bash
npm create vite@latest mi-practica -- --template react
cd mi-practica
npm install
npm run dev
```

Luego copia el contenido de cada ejercicio en `src/App.jsx`.

---

# Ejercicios — Etapa 2: Efectos y Lógica Reutilizable

## Estructura

```
ejercicios-react/
├── 06-useEffect/
│   ├── explicacion.md  → Qué es useEffect, cuándo usarlo, cuándo NO usarlo
│   └── ejercicio.jsx   → Título dinámico, timer, fetch, encontrar bugs
├── 07-custom-hooks/
│   ├── explicacion.md  → Qué son, cómo crearlos, patrones comunes
│   └── ejercicio.jsx   → useToggle, useLocalStorage, useFetch, useDebounce
└── 08-useRef/
    ├── explicacion.md  → Acceso al DOM y valores sin re-render
    └── ejercicio.jsx   → Focus, cronómetro, usePrevious, chat con scroll
```

## Orden recomendado

Lee la explicación (.md) de cada tema ANTES de intentar los ejercicios.

| Ejercicio | Concepto clave | Dificultad |
|-----------|---------------|------------|
| 06-useEffect (A) | Sincronizar título del documento | ★☆☆ |
| 06-useEffect (B) | Timer con cleanup | ★★☆ |
| 06-useEffect (C) | Fetch con dependencias y race condition | ★★★ |
| 06-useEffect (D) | Encontrar 3 bugs de useEffect | ★★★ |
| 07-custom-hooks (A) | useToggle — hook simple | ★☆☆ |
| 07-custom-hooks (B) | useLocalStorage — persistencia | ★★☆ |
| 07-custom-hooks (C) | useFetch — reutilizar fetch | ★★☆ |
| 07-custom-hooks (D) | useDebounce + useFetch combinados | ★★★ |
| 08-useRef (A) | Focus automático en input | ★☆☆ |
| 08-useRef (B) | Cronómetro con ref para interval ID | ★★☆ |
| 08-useRef (C) | usePrevious — valor del render anterior | ★★☆ |
| 08-useRef (D) | Chat con auto-scroll y doble ref | ★★★ |

## Proyecto de la etapa

Una vez completes los ejercicios, construye la **App de búsqueda con debounce**:
- Custom hook `useDebounce` para esperar a que el usuario deje de escribir
- Custom hook `useFetch` para manejar datos, loading y error
- Fetch a una API real (jsonplaceholder o similar)
- Loading spinner y manejo de errores
