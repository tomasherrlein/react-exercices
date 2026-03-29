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

## Etapa 2 — Efectos, Lógica Reutilizable y Errores (2-3 semanas)

**Objetivo:** Entender el ciclo de vida, separar lógica de presentación, y manejar errores.

| # | Concepto | Descripción |
|---|----------|-------------|
| 6 | useEffect | Sincronización, no ciclo de vida. Siempre incluir dependencias correctas y cleanup |
| 7 | Custom hooks | Extraer lógica a funciones `useXxx`. La killer feature de React |
| 8 | useRef / forwardRef | Acceder al DOM, valores persistentes sin re-render, pasar refs a hijos |
| 9 | Error Boundaries | El try/catch de la UI — atrapa errores en hijos y muestra un fallback |

**Proyecto de la etapa:** App de búsqueda con debounce — custom hook `useDebounce`, fetch a API real, loading/error, Error Boundary.

---

## Etapa 3 — Estado Compartido, Routing y Arquitectura (2-3 semanas)

**Objetivo:** Saber cuándo y cómo escalar el estado, navegar entre páginas.

| # | Concepto | Descripción |
|---|----------|-------------|
| 10 | Lifting state up | Antes de Context, sube el estado al ancestro común |
| 11 | React Router | Navegación SPA: rutas, params, nested routes, rutas protegidas |
| 12 | Context API | Para estado que muchos componentes necesitan. No reemplaza toda gestión de estado |
| 13 | useReducer | Para estado con múltiples sub-valores o lógica compleja de actualización |
| 14 | Cuándo usar librerías | `useState` → lifting → Context → React Query/SWR → Zustand |

**Proyecto de la etapa:** Dashboard con autenticación — React Router, Context para usuario, useReducer para formularios.

---

## Etapa 4 — Performance y Patrones Avanzados (3-4 semanas)

**Objetivo:** Saber cuándo React tiene problemas y cómo resolverlos correctamente.

| # | Concepto | Descripción |
|---|----------|-------------|
| 15 | useMemo / useCallback | No abusar. Usar solo con costo real confirmado por Profiler |
| 16 | useTransition / useDeferredValue | React 18 concurrency — UI que no se congela durante renders pesados |
| 17 | React.memo | Solo si hay renders costosos confirmados |
| 18 | Patrones de composición | Compound components, render props, headless, portals |
| 19 | Code splitting | `React.lazy` + `Suspense` para cargar componentes bajo demanda |
| 20 | Testing | React Testing Library — testea comportamiento, no implementación |
| 21 | React Query / SWR | Para fetching del servidor: cache, loading, paginación, optimistic updates |

**Proyecto de la etapa:** App completa con React Query — fetching, cache, paginación, tests.

---

## Resumen de la ruta

```
Semana 1-3   →  JSX, componentes, props, useState, listas, eventos
Semana 4-6   →  useEffect, custom hooks, useRef, Error Boundaries
Semana 7-9   →  Lifting state, React Router, Context, useReducer, arquitectura
Semana 10-14 →  Performance, concurrency, patrones avanzados, testing, React Query
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

# Ejercicios — Etapa 2: Efectos, Lógica Reutilizable y Errores

## Estructura

```
ejercicios-react/
├── 06-useEffect/
│   ├── explicacion.md  → Qué es useEffect, cuándo usarlo, cuándo NO usarlo
│   └── ejercicio.jsx   → Título dinámico, timer, fetch, encontrar bugs
├── 07-custom-hooks/
│   ├── explicacion.md  → Qué son, cómo crearlos, patrones comunes
│   └── ejercicio.jsx   → useToggle, useLocalStorage, useFetch, useDebounce
├── 08-useRef/
│   ├── explicacion.md  → Acceso al DOM, valores sin re-render, forwardRef
│   └── ejercicio.jsx   → Focus, cronómetro, usePrevious, chat con scroll
└── 09-error-boundaries/
    ├── explicacion.md  → try/catch de la UI, react-error-boundary, estrategia
    └── ejercicio.jsx   → Boundary manual, reset, por sección, async errors
```

## Orden recomendado

| Ejercicio | Concepto clave | Dificultad |
|-----------|---------------|------------|
| 06-useEffect (A) | Sincronizar título del documento | ★☆☆ |
| 06-useEffect (B) | Timer con cleanup | ★★☆ |
| 06-useEffect (C) | Fetch con dependencias y race condition | ★★★ |
| 06-useEffect (D) | Encontrar 3 bugs de useEffect | ★★★ |
| 07-hooks (A) | useToggle — hook simple | ★☆☆ |
| 07-hooks (B) | useLocalStorage — persistencia | ★★☆ |
| 07-hooks (C) | useFetch — reutilizar fetch | ★★☆ |
| 07-hooks (D) | useDebounce + useFetch combinados | ★★★ |
| 08-useRef (A) | Focus automático en input | ★☆☆ |
| 08-useRef (B) | Cronómetro con ref para interval ID | ★★☆ |
| 08-useRef (C) | usePrevious — valor del render anterior | ★★☆ |
| 08-useRef (D) | Chat con auto-scroll y doble ref | ★★★ |
| 09-errors (A) | Error Boundary manual (clase) | ★☆☆ |
| 09-errors (B) | Boundary con botón "Intentar de nuevo" | ★★☆ |
| 09-errors (C) | Boundaries estratégicos en un dashboard | ★★★ |
| 09-errors (D) | Error Boundary + async error handling | ★★★ |

## Proyecto de la etapa

Construye la **App de búsqueda con debounce** + Error Boundaries:
- Custom hook `useDebounce` y `useFetch`
- Fetch a una API real (jsonplaceholder)
- Error Boundary alrededor del componente de resultados

---

# Ejercicios — Etapa 3: Estado Compartido, Routing y Arquitectura

## Estructura

```
ejercicios-react/
├── 10-lifting-state/
│   ├── explicacion.md  → Subir estado al padre, callbacks, prop drilling
│   └── ejercicio.jsx   → Conversor temp, filtro+lista, accordion, chat con salas
├── 11-react-router/
│   ├── explicacion.md  → Rutas, params, nested routes, protección, search params
│   └── ejercicio.jsx   → Rutas básicas, blog con params, búsqueda URL, auth
├── 12-context-api/
│   ├── explicacion.md  → Provider/Consumer, custom hook, múltiples contextos
│   └── ejercicio.jsx   → ThemeContext, AuthContext, carrito, múltiples contextos
├── 13-useReducer/
│   ├── explicacion.md  → Reducer, dispatch, acciones, useReducer + Context
│   └── ejercicio.jsx   → Contador avanzado, todo list, wizard, carrito+cupones
└── 14-cuando-usar-librerias/
    ├── explicacion.md  → Escalera de complejidad, React Query, Zustand
    └── ejercicio.jsx   → Refactor prop drilling, elegir herramienta, React Query, arquitectura
```

## Orden recomendado

| Ejercicio | Concepto clave | Dificultad |
|-----------|---------------|------------|
| 10-lifting (A) | Conversor de temperatura sincronizado | ★☆☆ |
| 10-lifting (B) | Filtro + lista con estado derivado | ★★☆ |
| 10-lifting (C) | Accordion exclusivo (un panel a la vez) | ★★☆ |
| 10-lifting (D) | Chat con múltiples salas | ★★★ |
| 11-router (A) | Rutas básicas con NavLink activo | ★☆☆ |
| 11-router (B) | Blog con rutas dinámicas y nested routes | ★★☆ |
| 11-router (C) | Búsqueda con search params en la URL | ★★★ |
| 11-router (D) | Rutas protegidas con autenticación | ★★★ |
| 12-context (A) | ThemeContext con custom hook | ★☆☆ |
| 12-context (B) | AuthContext con login/logout | ★★☆ |
| 12-context (C) | Carrito de compras con Context | ★★★ |
| 12-context (D) | Múltiples contextos: Theme + Auth + Notif | ★★★ |
| 13-reducer (A) | Contador con step y historial | ★☆☆ |
| 13-reducer (B) | Todo list completa con useReducer | ★★☆ |
| 13-reducer (C) | Formulario wizard con validación en reducer | ★★★ |
| 13-reducer (D) | Carrito con useReducer + Context + cupones | ★★★ |
| 14-libs (A) | Refactor: de prop drilling a Context | ★★☆ |
| 14-libs (B) | Elegir herramienta correcta (4 escenarios) | ★★☆ |
| 14-libs (C) | De useEffect a React Query (conceptual) | ★★★ |
| 14-libs (D) | Arquitectura de estado de e-commerce | ★★★ |

## Proyecto de la etapa

Construye el **Dashboard con autenticación**:
- React Router para navegación entre páginas
- Context para datos del usuario (login/logout)
- useReducer para formularios complejos
- Rutas protegidas que requieren autenticación

---

# Ejercicios — Etapa 4: Performance y Patrones Avanzados

## Estructura

```
ejercicios-react/
├── 15-useMemo-useCallback/
│   ├── explicacion.md  → Memoización de valores y funciones, cuándo NO usarlos
│   └── ejercicio.jsx   → Filtro costoso, callback+memo, deps separadas, diagnóstico
├── 16-useTransition/
│   ├── explicacion.md  → Concurrency, startTransition, useDeferredValue
│   └── ejercicio.jsx   → Búsqueda diferida, tabs sin lag, filtros combinados, diagnóstico
├── 17-react-memo/
│   ├── explicacion.md  → React.memo, shallow comparison, mover estado vs memo
│   └── ejercicio.jsx   → Detectar re-renders, memo+callback, 3 soluciones, dashboard
├── 18-patrones-composicion/
│   ├── explicacion.md  → children, slots, compound components, render props, portals
│   └── ejercicio.jsx   → PageLayout, Accordion compound, MouseTracker, Tabs completos
├── 19-code-splitting/
│   ├── explicacion.md  → React.lazy, Suspense, dynamic imports, preload
│   └── ejercicio.jsx   → Lazy básico, modal diferido, preload hover, análisis
├── 20-testing/
│   ├── explicacion.md  → RTL, queries, userEvent, tests async, estructura AAA
│   └── ejercicio.jsx   → Tests de Greeting, Counter, LoginForm, UserProfile async
└── 21-react-query/
    ├── explicacion.md  → useQuery, useMutation, queryKey, invalidation, paginación
    └── ejercicio.jsx   → Posts básico, dependent queries, mutations, paginación
```

## Orden recomendado

| Ejercicio | Concepto clave | Dificultad |
|-----------|---------------|------------|
| 15-memo (A) | useMemo para filtrado costoso | ★☆☆ |
| 15-memo (B) | useCallback con componente memoizado | ★★☆ |
| 15-memo (C) | Separar dependencias de useMemo | ★★★ |
| 15-memo (D) | Diagnóstico: ¿memoizar o no? (5 bloques) | ★★★ |
| 16-transition (A) | useDeferredValue para búsqueda | ★☆☆ |
| 16-transition (B) | useTransition con tabs pesados | ★★☆ |
| 16-transition (C) | Filtros combinados diferidos | ★★★ |
| 16-transition (D) | Diagnóstico: ¿transition, deferred, o memo? | ★★★ |
| 17-memo (A) | Detectar re-renders con console.log | ★☆☆ |
| 17-memo (B) | React.memo + useCallback juntos | ★★☆ |
| 17-memo (C) | 3 soluciones: memo vs mover estado vs children | ★★★ |
| 17-memo (D) | Dashboard con 4 paneles optimizados | ★★★ |
| 18-comp (A) | Slots con props (PageLayout) | ★☆☆ |
| 18-comp (B) | Compound Components: Accordion | ★★☆ |
| 18-comp (C) | Render Props: MouseTracker (3 usos) | ★★★ |
| 18-comp (D) | Tabs completos: compound + headless | ★★★ |
| 19-split (A) | Lazy loading básico (3 páginas) | ★☆☆ |
| 19-split (B) | Modal con carga diferida | ★★☆ |
| 19-split (C) | Preload on hover | ★★★ |
| 19-split (D) | Análisis: ¿qué separar? (11 componentes) | ★★★ |
| 20-test (A) | Tests básicos de renderizado (Greeting) | ★☆☆ |
| 20-test (B) | Tests de interacción (Counter) | ★★☆ |
| 20-test (C) | Tests de formulario con validación | ★★★ |
| 20-test (D) | Tests de componente async con fetch mock | ★★★ |
| 21-query (A) | useQuery básico (lista de posts) | ★☆☆ |
| 21-query (B) | Queries dependientes (usuarios → posts) | ★★☆ |
| 21-query (C) | useMutation con invalidation (CRUD) | ★★★ |
| 21-query (D) | Paginación con placeholderData | ★★★ |

## Proyecto de la etapa

Construye una **App completa con React Query**:
- Fetching a API real con useQuery
- CRUD con useMutation e invalidation
- Paginación
- Tests con React Testing Library
- Code splitting por rutas
- Componentes compuestos (Tabs, Accordion) donde tenga sentido
