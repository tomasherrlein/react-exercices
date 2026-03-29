# useTransition y useDeferredValue — UI que no se congela

---

## El problema que resuelve

Cuando una actualización de estado es **costosa** (filtrar 10.000 items, renderizar un gráfico complejo), React bloquea la UI hasta que termina. El usuario escribe en un input y siente **lag** porque React está ocupado re-renderizando la lista:

```jsx
function Search() {
  const [query, setQuery] = useState("");

  // 10.000 items se filtran en CADA tecla → la UI se congela
  const filtered = items.filter(i => i.name.includes(query));

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <HeavyList items={filtered} />  {/* Tarda 100ms en renderizar */}
    </div>
  );
}
```

El usuario escribe "react" y siente que el input se traba — porque React está procesando la lista entre cada tecla.

---

## La analogía: El restaurante con dos colas

Imagina un restaurante con **una sola caja**:

- **Sin useTransition**: todos los pedidos se procesan en orden. Si alguien pide un banquete para 50 personas, todos los demás esperan.
- **Con useTransition**: hay una **cola express** para pedidos rápidos (input) y una **cola normal** para pedidos pesados (lista). El pedido rápido se atiende primero, el pesado se procesa en segundo plano.

```
  Sin useTransition:              Con useTransition:
  ┌─────────────────────┐         ┌─────────────────────┐
  │ Cola única:          │         │ Cola express (urgente):│
  │ 1. Input ⏳          │         │ 1. Input ✅ (inmediato)│
  │ 2. Lista (10.000) ⏳ │         │                       │
  │ 3. Input ⏳          │         │ Cola normal (diferible):│
  │ 4. Lista (10.000) ⏳ │         │ 1. Lista (10.000) ⏳  │
  │ (todo se traba)      │         │ (se puede interrumpir) │
  └─────────────────────┘         └─────────────────────┘
```

---

## useTransition — Marcar una actualización como "no urgente"

```jsx
import { useState, useTransition } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [deferredQuery, setDeferredQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;

    // Urgente: actualizar el input inmediatamente
    setQuery(value);

    // No urgente: actualizar la lista puede esperar
    startTransition(() => {
      setDeferredQuery(value);
    });
  }

  const filtered = items.filter(i => i.name.includes(deferredQuery));

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Actualizando lista...</p>}
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        <HeavyList items={filtered} />
      </div>
    </div>
  );
}
```

### ¿Qué pasa?

1. El usuario escribe "r" → `setQuery("r")` se procesa **inmediatamente** (el input responde)
2. `startTransition(() => setDeferredQuery("r"))` se marca como **no urgente**
3. Si el usuario escribe "e" antes de que la lista termine, React **interrumpe** el render de la lista y procesa la nueva tecla
4. `isPending` es `true` mientras la transición está pendiente → muestra indicador visual
5. Cuando React tiene tiempo, procesa la lista con "re"

**Resultado**: el input nunca se traba, la lista se actualiza cuando puede.

---

## useDeferredValue — La versión más simple

Si no necesitás separar en dos estados, `useDeferredValue` es más directo:

```jsx
import { useState, useDeferredValue } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  // query se actualiza inmediato (input responsive)
  // deferredQuery se actualiza con delay (lista puede esperar)
  const filtered = items.filter(i => i.name.includes(deferredQuery));
  const isStale = query !== deferredQuery;  // hay actualización pendiente

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.7 : 1 }}>
        <HeavyList items={filtered} />
      </div>
    </div>
  );
}
```

### useTransition vs useDeferredValue

| | useTransition | useDeferredValue |
|---|---|---|
| Qué hace | Marca un **setState** como no urgente | Crea una versión **diferida** de un valor |
| Cuándo usarlo | Cuando controlás el setState | Cuando recibes el valor como prop |
| Te da | `[isPending, startTransition]` | Valor diferido |
| Ejemplo | Filtro en un input que vos controlás | Componente hijo que recibe un prop |

---

## ¿Cuándo usarlos?

### ✅ Úsalos cuando:

- Un **input** se traba porque algo pesado se renderiza al escribir
- Una **lista larga** se filtra/ordena con cada tecla
- Un **tab** que cambia re-renderiza contenido costoso
- Un **gráfico** se recalcula con cada cambio de dato

### ❌ NO los uses cuando:

- El render es **rápido** (< 16ms) — no necesitás optimizar
- El dato viene del **servidor** — usá React Query con staleTime
- El **cálculo** es costoso pero no el render — usá useMemo
- No hay **interacción del usuario** que proteger

### Flujo de decisión:

```
¿El input se traba al escribir?
│
├── ¿El cálculo es costoso? → useMemo
│
├── ¿El render es costoso (lista larga)?
│   │
│   ├── ¿Controlás el setState? → useTransition
│   │
│   └── ¿Recibes el valor como prop? → useDeferredValue
│
└── ¿No se traba? → No necesitás nada
```

---

## Combinando con Suspense

`startTransition` funciona con Suspense para evitar que el fallback aparezca en cada navegación:

```jsx
function TabContainer() {
  const [tab, setTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  function changeTab(newTab) {
    startTransition(() => {
      setTab(newTab);
    });
  }

  return (
    <div>
      <button onClick={() => changeTab("home")}>Home</button>
      <button onClick={() => changeTab("posts")}>Posts</button>
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        <Suspense fallback={<Spinner />}>
          {tab === "home" ? <Home /> : <Posts />}
        </Suspense>
      </div>
    </div>
  );
}
```

Sin `startTransition`: cada cambio de tab muestra el Spinner.
Con `startTransition`: React mantiene el tab anterior visible (con opacidad reducida) mientras carga el nuevo. El Spinner solo aparece si tarda mucho.

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué problema resuelven? | La UI se congela durante renders costosos |
| ¿Qué es useTransition? | Marca un setState como "no urgente" — React lo puede interrumpir |
| ¿Qué es useDeferredValue? | Crea una versión diferida de un valor — React lo actualiza cuando puede |
| ¿Cuál usar? | useTransition si controlás el setState, useDeferredValue si recibes props |
| ¿isPending? | Boolean que indica si hay una transición pendiente (para mostrar indicador) |
| ¿Cuándo NO usarlos? | Si el render es rápido o el problema es un cálculo (usá useMemo) |
