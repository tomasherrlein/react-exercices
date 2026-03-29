# useMemo y useCallback — La nota adhesiva de React

---

## El problema que resuelve

En cada render, React ejecuta **toda** la función del componente de nuevo. Eso significa que todas las variables, funciones y cálculos se recrean desde cero:

```jsx
function ProductList({ products, filter }) {
  // Esto se ejecuta en CADA render, aunque products y filter no cambien
  const filtered = products.filter(p => p.category === filter);
  const sorted = filtered.sort((a, b) => a.price - b.price);

  // Esta función también se recrea en cada render
  const handleClick = (id) => { console.log("clicked", id); };

  return <ul>{sorted.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

Para la mayoría de los casos, **esto está bien**. JavaScript es rápido y recrear arrays pequeños o funciones simples toma microsegundos.

Pero a veces hay cálculos costosos (filtrar 10.000 items, calcular un hash) o funciones que se pasan como props a componentes memoizados. Ahí entran `useMemo` y `useCallback`.

---

## La analogía: La nota adhesiva

Imagina que eres un chef y cada vez que un cliente pide un plato, calculas toda la receta desde cero: ingredientes, porciones, tiempo de cocción.

Pero si usas una **nota adhesiva** en la pared con el resultado del cálculo, solo necesitas recalcular cuando cambian los ingredientes. Si el cliente pide lo mismo con los mismos ingredientes, lees la nota.

- `useMemo` = nota adhesiva para **valores** (resultado de un cálculo)
- `useCallback` = nota adhesiva para **funciones** (referencia estable)

---

## useMemo — Memorizar un valor

```jsx
import { useMemo } from "react";

function ProductList({ products, filter }) {
  // Solo recalcula cuando products o filter cambian
  const filtered = useMemo(() => {
    console.log("Recalculando..."); // verás esto SOLO cuando cambien las deps
    return products.filter(p => p.category === filter);
  }, [products, filter]);

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

### Sintaxis

```jsx
const valorMemoizado = useMemo(() => {
  // cálculo costoso
  return resultado;
}, [dependencia1, dependencia2]);
```

- El primer argumento es una **función que retorna el valor**
- El segundo es el **array de dependencias** (igual que useEffect)
- React ejecuta la función solo cuando alguna dependencia cambia
- Si ninguna cambió, devuelve el valor anterior sin recalcular

---

## useCallback — Memorizar una función

`useCallback` es lo mismo que `useMemo`, pero específico para funciones:

```jsx
// Estas dos líneas son equivalentes:
const memoizedFn = useCallback((x) => x * 2, []);
const memoizedFn = useMemo(() => (x) => x * 2, []);
```

### ¿Cuándo importa?

En JavaScript, cada vez que escribes `() => {}`, creas una **nueva función** (nueva referencia en memoria). Normalmente no importa, pero importa cuando pasas esa función como prop a un componente envuelto en `React.memo`:

```jsx
function Parent() {
  // Sin useCallback: handleClick es una función NUEVA en cada render
  // → si Child está envuelto en React.memo, se re-renderiza igual
  const handleClick = () => { console.log("click"); };

  return <Child onClick={handleClick} />;
}

// Con useCallback: la referencia es estable
function Parent() {
  const handleClick = useCallback(() => {
    console.log("click");
  }, []); // dependencias vacías = nunca cambia

  return <Child onClick={handleClick} />;
}
```

---

## La regla de oro: NO uses useMemo/useCallback por defecto

### ❌ Optimización prematura — el error más común

```jsx
// ❌ useMemo para un cálculo trivial — el costo de useMemo es MAYOR que el cálculo
const fullName = useMemo(() => firstName + " " + lastName, [firstName, lastName]);

// ✅ Simplemente calcula — es instantáneo
const fullName = firstName + " " + lastName;
```

```jsx
// ❌ useCallback sin motivo — nadie consume esta referencia estable
const handleClick = useCallback(() => {
  setCount(c => c + 1);
}, []);

// ✅ Función normal — funciona igual si Child no está memoizado
const handleClick = () => setCount(c => c + 1);
```

### ¿Por qué no poner useMemo/useCallback en todo?

1. **Costo propio**: React tiene que comparar las dependencias en cada render
2. **Complejidad**: más código que leer, mantener y debuggear
3. **Falsa seguridad**: si las dependencias cambian en cada render, no memorizas nada

### ✅ Cuándo SÍ usar

| Situación | Hook |
|---|---|
| Cálculo costoso (filtrar/ordenar miles de items, cálculo matemático) | `useMemo` |
| Crear un objeto/array que es prop de un componente con `React.memo` | `useMemo` |
| Función que es prop de un componente con `React.memo` | `useCallback` |
| Función que es dependencia de un `useEffect` | `useCallback` |
| Confirmado con React Profiler que hay un problema real | ambos |

---

## Cómo saber si necesitas memoizar

### Paso 1: ¿Hay un problema real?

- ¿La app se siente lenta?
- ¿Un input tiene lag al escribir?
- ¿Una lista se congela al scrollear?

Si la respuesta es **no** → no memoices.

### Paso 2: Usa React DevTools Profiler

1. Abre React DevTools → pestaña "Profiler"
2. Graba una interacción
3. Mira qué componentes se re-renderizan y cuánto tardan
4. Si un componente tarda >16ms en renderizar → ahí es donde memoizar

### Paso 3: Memoiza solo lo necesario

```jsx
// Solo el cálculo costoso, no todo el componente
const expensiveResult = useMemo(() => {
  return heavyComputation(data);
}, [data]);
```

---

## Separar dependencias para memoización precisa

```jsx
// ❌ Cambiar sortOrder re-ejecuta también el filter
const result = useMemo(() => {
  const filtered = products.filter(p => p.category === category);
  return filtered.sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );
}, [products, category, sortOrder]);

// ✅ Cada cálculo corre solo cuando SUS deps cambian
const filtered = useMemo(
  () => products.filter(p => p.category === category),
  [products, category]
);
const sorted = useMemo(
  () => [...filtered].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  ),
  [filtered, sortOrder]
);
```

---

## useCallback con dependencias

```jsx
function SearchResults({ query }) {
  // ❌ Se recrea en cada render → si pasa como prop, rompe memo
  const handleSelect = (item) => {
    console.log(query, item);
  };

  // ✅ Solo se recrea cuando query cambia
  const handleSelect = useCallback((item) => {
    console.log(query, item);
  }, [query]);

  return <ResultList onSelect={handleSelect} />;
}
```

Si la función usa variables del scope (como `query`), esas variables deben estar en las dependencias. Si `query` cambia en cada render, el `useCallback` no te ahorra nada.

**Tip**: Si necesitas una referencia estable que siempre lea el valor más reciente, combina con `useRef`:

```jsx
const queryRef = useRef(query);
queryRef.current = query;

const handleSelect = useCallback((item) => {
  console.log(queryRef.current, item); // siempre el valor más reciente
}, []); // sin dependencias — referencia estable
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué hace useMemo? | Memoriza el **resultado** de un cálculo, solo recalcula si cambian las deps |
| ¿Qué hace useCallback? | Memoriza una **función**, solo la recrea si cambian las deps |
| ¿Son lo mismo? | useCallback(fn, deps) === useMemo(() => fn, deps) |
| ¿Cuándo usarlos? | Cuando hay un problema de performance **real** confirmado con Profiler |
| ¿Cuándo NO usarlos? | Cálculos simples, funciones que no se pasan a componentes memoizados |
| ¿El error más común? | Usarlos en todo "por las dudas" — agrega costo sin beneficio |
