# React.memo — Evitar re-renders innecesarios

---

## El problema que resuelve

Cuando un componente padre se re-renderiza, **todos sus hijos también se re-renderizan**, aunque sus props no hayan cambiado:

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <p>Count: {count}</p>
      {/* ExpensiveList se re-renderiza cada vez que count cambia,
          aunque items no cambió */}
      <ExpensiveList items={items} />
    </div>
  );
}
```

Si `ExpensiveList` renderiza 1.000 items y tarda 50ms, el usuario siente lag cada vez que hace clic en "+" — aunque la lista no cambió.

`React.memo` le dice a React: "solo re-renderiza este componente si sus props realmente cambiaron".

---

## La analogía: La foto de la lista de precios

Imagina un restaurante que imprime su menú. Cada día verifican: ¿cambiaron los precios? Si no, usan la **misma impresión de ayer**. Solo reimprimen si algo cambió.

- Sin `memo`: imprimen un menú nuevo cada día (aunque sea idéntico)
- Con `memo`: comparan precios y solo reimprimen si algo difiere

---

## Cómo funciona

```jsx
import { memo } from "react";

// Sin memo: se re-renderiza siempre que el padre re-renderiza
function ExpensiveList({ items }) {
  console.log("Renderizando lista...");
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}

// Con memo: solo se re-renderiza si items cambió
const MemoizedList = memo(ExpensiveList);
```

### ¿Cómo compara las props?

React hace una **comparación superficial** (shallow comparison):

```jsx
// Shallow comparison: compara cada prop con ===
// Para primitivos (string, number, boolean): compara por valor
"hola" === "hola"  // true — no re-renderiza

// Para objetos/arrays/funciones: compara por REFERENCIA
[1, 2, 3] === [1, 2, 3]  // false! — diferentes referencias
{ a: 1 } === { a: 1 }    // false! — diferentes objetos
() => {} === () => {}      // false! — diferentes funciones
```

Esto significa que `React.memo` **no funciona** si le pasas objetos o funciones creados en el render del padre, porque son referencias nuevas cada vez.

---

## El flujo completo: memo + useMemo + useCallback

Para que `React.memo` funcione, las props deben mantener la misma referencia:

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [items] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]);

  // ❌ Nueva función en cada render → memo de Child no sirve
  const handleClick = () => console.log("clicked");

  // ✅ Referencia estable → memo funciona
  const handleClick = useCallback(() => console.log("clicked"), []);

  // ❌ Nuevo objeto en cada render → memo de Child no sirve
  const style = { color: "red" };

  // ✅ Referencia estable
  const style = useMemo(() => ({ color: "red" }), []);

  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <MemoizedChild items={items} onClick={handleClick} style={style} />
    </>
  );
}

const MemoizedChild = memo(function Child({ items, onClick, style }) {
  console.log("Child renderizado");
  return <div style={style} onClick={onClick}>{items.length} items</div>;
});
```

---

## Cuándo usar React.memo

### ✅ Úsalo cuando:

1. **El componente renderiza frecuentemente** y su padre se re-renderiza por razones que no le afectan
2. **El componente es costoso** (listas largas, gráficos, cálculos pesados)
3. **Confirmaste con Profiler** que el re-render es un cuello de botella

### ❌ NO lo uses cuando:

1. **Las props cambian en cada render** — memo compara y luego renderiza igual, doble costo
2. **El componente es simple** — renderizar un `<p>` es más barato que comparar props
3. **No hay problema de performance** — optimización prematura

### La regla del equipo de Vercel:

> "Si no puedes medir la mejora, no la necesitas."

---

## Comparación personalizada

Puedes pasar una función de comparación como segundo argumento:

```jsx
const MemoizedList = memo(ExpensiveList, (prevProps, nextProps) => {
  // Retorna true si las props son iguales (NO re-renderizar)
  // Retorna false si las props cambiaron (SÍ re-renderizar)
  return prevProps.items.length === nextProps.items.length
    && prevProps.items.every((item, i) => item.id === nextProps.items[i].id);
});
```

**Cuidado**: comparaciones personalizadas complejas pueden ser más caras que el re-render que intentas evitar. Úsalas solo cuando la shallow comparison no alcanza y tienes una comparación más eficiente que el render.

---

## Patrón: Mover estado hacia abajo

A veces, en vez de memoizar, puedes **mover el estado al componente que lo usa**, evitando que los hermanos se re-rendericen:

```jsx
// ❌ Todo se re-renderiza cuando count cambia
function Page() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Counter count={count} onIncrement={() => setCount(c => c + 1)} />
      <ExpensiveTree /> {/* se re-renderiza innecesariamente */}
    </div>
  );
}

// ✅ Extraer el estado al componente que lo usa
function Page() {
  return (
    <div>
      <Counter /> {/* tiene su propio estado */}
      <ExpensiveTree /> {/* ya no se re-renderiza */}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}
```

**Muchas veces la mejor optimización no es memoizar, sino reestructurar los componentes.**

---

## Patrón: children como prop (content lifting)

```jsx
// ❌ ExpensiveTree se re-renderiza cuando count cambia
function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      <ExpensiveTree />
    </div>
  );
}

// ✅ ExpensiveTree se crea ANTES del re-render de CounterWrapper
function App() {
  return (
    <CounterWrapper>
      <ExpensiveTree />
    </CounterWrapper>
  );
}

function CounterWrapper({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
      {children} {/* no se re-renderiza — misma referencia */}
    </div>
  );
}
```

`children` fue creado por `App`, no por `CounterWrapper`. Cuando `CounterWrapper` se re-renderiza, `children` mantiene la misma referencia.

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué hace React.memo? | Evita re-render si las props no cambiaron (shallow comparison) |
| ¿Cuándo usarlo? | Componentes costosos que se re-renderizan sin que sus props cambien |
| ¿Funciona con objetos/funciones? | Solo si las referencias son estables (useMemo/useCallback) |
| ¿Es gratis? | No — la comparación de props tiene un costo |
| ¿Siempre es la mejor solución? | No — a veces reestructurar componentes (mover estado) es mejor |
| ¿La regla? | Mide antes de memoizar. Si no puedes medir la mejora, no la necesitas |
