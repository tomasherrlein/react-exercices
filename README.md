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
│   ├── ejercicio.jsx    → Corrige errores de JSX
│   └── ejercicio-2.jsx  → JSX con expresiones condicionales
├── 02-componentes-props/
│   └── ejercicio.jsx    → Descomponer un componente monolítico
├── 03-usestate/
│   └── ejercicio.jsx    → Contador, toggle, estado con objetos
├── 04-listas-keys/
│   └── ejercicio.jsx    → Bug de keys + Todo list completa
└── 05-eventos-formularios/
    └── ejercicio.jsx    → Formulario controlado + validación
```

## Orden recomendado

Haz los ejercicios en orden. Cada uno construye sobre el anterior.

| Ejercicio | Concepto clave | Dificultad |
|-----------|---------------|------------|
| 01-jsx    | Diferencias JSX vs HTML | ★☆☆ |
| 01-jsx (2)| Expresiones y renderizado condicional | ★★☆ |
| 02-componentes-props | Descomposición y reutilización | ★★☆ |
| 03-usestate (A) | Estado básico y límites | ★☆☆ |
| 03-usestate (B) | Toggle booleano | ★☆☆ |
| 03-usestate (C) | Estado con objetos — trampa del spread | ★★☆ |
| 04-listas-keys (A) | Bug de índice como key | ★★☆ |
| 04-listas-keys (B) | Todo list completa | ★★★ |
| 05-formularios (A) | Formulario controlado con múltiples tipos | ★★☆ |
| 05-formularios (B) | Validación en tiempo real | ★★★ |

## Cómo practicar

1. Lee el enunciado del ejercicio
2. Intenta resolverlo sin mirar la solución
3. Si te bloqueas más de 15 minutos, mira solo la pista
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
