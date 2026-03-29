# Cuándo usar librerías de estado — La escalera de complejidad

---

## El problema que resuelve

A medida que tu app crece, la pregunta no es "¿qué librería uso?" sino "¿necesito una librería **ahora**?". Muchos devs saltan directo a Redux o Zustand cuando `useState` + lifting state alcanza perfectamente.

La clave es escalar **gradualmente**: usar lo más simple que funcione, y solo subir de nivel cuando lo simple ya no alcanza.

---

## La analogía: Medios de transporte

Piensa en cómo te mueves por la ciudad:

| Distancia | Transporte | Equivalente en React |
|---|---|---|
| 1 cuadra | Caminar | `useState` local |
| 5 cuadras | Bicicleta | Lifting state up |
| Cruzar la ciudad | Bus | Context API |
| Otra ciudad | Tren | React Query / SWR |
| Otro país | Avión | Zustand / Redux Toolkit |

No tomas un avión para ir a la esquina. Tampoco usas Redux para un contador.

---

## Nivel 1: useState — estado local

**Usa cuando:** solo un componente necesita el dato.

```jsx
function SearchBar() {
  const [query, setQuery] = useState("");
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

**Señales de que es suficiente:**
- El dato no sale del componente
- Ningún hermano o padre lo necesita
- Es estado de UI (formulario, toggle, dropdown abierto/cerrado)

---

## Nivel 2: Lifting state up — estado compartido simple

**Usa cuando:** 2-3 componentes cercanos comparten un dato.

```jsx
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <List items={items} onSelect={setSelected} />
      <Detail item={selected} />
    </>
  );
}
```

**Señales de que es suficiente:**
- Solo subes el estado 1-2 niveles
- No hay prop drilling (no pasas por componentes intermedios que no usan el dato)

**Señales de que necesitas más:**
- Estás pasando props por 3+ componentes que no las usan (prop drilling)

---

## Nivel 3: Context API — estado global simple

**Usa cuando:** muchos componentes dispersos necesitan leer el mismo dato.

```jsx
// Casos ideales para Context:
// - Tema (dark/light)
// - Usuario autenticado
// - Idioma
// - Configuración de la app
```

**Señales de que es suficiente:**
- El dato cambia poco (tema, usuario, idioma)
- No tienes lógica compleja de actualización

**Señales de que necesitas más:**
- El dato cambia frecuentemente y causa re-renders en toda la app
- La lógica de actualización es compleja (muchas acciones posibles)
- Necesitas datos del servidor con cache y revalidación

---

## Nivel 4: useReducer + Context — estado global con lógica

**Usa cuando:** tienes estado complejo con múltiples acciones.

```jsx
// useReducer + Context es suficiente para muchas apps:
// - Todo app
// - Carrito de compras simple
// - Formularios multi-step
// - Dashboard con filtros
```

**Señales de que es suficiente:**
- La lógica es compleja pero el estado es de cliente (no del servidor)
- No necesitas cache, optimistic updates, o sincronización con API

---

## Nivel 5: React Query / SWR — estado del servidor

**Usa cuando:** trabajas con datos que vienen de una API.

### El problema

```jsx
// ❌ Fetch manual — reinventas la rueda cada vez
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, []);

  // Y aún te falta: cache, revalidación, paginación, optimistic updates...
}
```

### La solución: React Query

```jsx
// ✅ React Query maneja todo automáticamente
import { useQuery } from "@tanstack/react-query";

function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users").then(r => r.json()),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

**¿Qué te da React Query que no te da useEffect + useState?**

| Feature | Manual (useEffect) | React Query |
|---|---|---|
| Loading/Error states | Lo haces tú | Automático |
| Cache | No tienes | Automático |
| Revalidación al volver a la pestaña | No | Automático |
| Deduplicación de requests | No | Automático |
| Paginación | Lo haces tú | Helpers incluidos |
| Optimistic updates | Muy difícil | API dedicada |
| Retry automático | No | Configurable |

### SWR — la alternativa

```jsx
import useSWR from "swr";

const fetcher = url => fetch(url).then(r => r.json());

function UserList() {
  const { data: users, error, isLoading } = useSWR("/api/users", fetcher);
  // Mismas ventajas que React Query
}
```

**React Query vs SWR:**
- React Query: más features (mutations, infinite queries, devtools completos)
- SWR: más simple, menos API que aprender
- Ambos resuelven el mismo problema. Elige uno y úsalo consistentemente.

---

## Nivel 6: Zustand — estado global complejo del cliente

**Usa cuando:** tienes estado de **cliente** (no del servidor) que es complejo y global.

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  cart: [],
  addToCart: (item) => set(state => ({
    cart: [...state.cart, { ...item, quantity: 1 }]
  })),
  removeFromCart: (id) => set(state => ({
    cart: state.cart.filter(i => i.id !== id)
  })),
  total: () => {
    const state = useStore.getState();
    return state.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
}));

// En cualquier componente — sin Provider necesario
function CartIcon() {
  const count = useStore(state => state.cart.length);
  return <span>🛒 ({count})</span>;
}
```

**¿Por qué Zustand sobre Context?**
- Los componentes se suscriben a **partes específicas** del estado (re-render selectivo)
- No necesita Provider wrapper
- API más simple que Redux
- Funciona fuera de componentes React

**¿Por qué Zustand sobre Redux?**
- Mucho menos boilerplate
- No necesita actions, action creators, ni reducers separados
- Para la mayoría de apps, Zustand es suficiente

---

## La guía de decisión completa

```
¿Dónde vive el dato?
│
├── En el SERVIDOR (API, base de datos)
│   └── React Query o SWR
│       (cache, loading, error, revalidación — todo automático)
│
└── En el CLIENTE (UI, formularios, estado de app)
    │
    ├── ¿Solo un componente lo usa?
    │   └── useState
    │
    ├── ¿2-3 componentes cercanos lo comparten?
    │   └── Lifting state up
    │
    ├── ¿Muchos componentes dispersos lo leen, pero cambia poco?
    │   └── Context API
    │
    ├── ¿Lógica compleja con muchas acciones?
    │   └── useReducer (+ Context si es global)
    │
    └── ¿Estado global complejo con re-renders selectivos?
        └── Zustand
```

---

## Errores comunes

### 1. Poner TODO en estado global

```jsx
// ❌ ¿Por qué el estado de este dropdown está en el store global?
const useStore = create(set => ({
  isDropdownOpen: false,  // Esto es estado local del dropdown
  userName: "Ana",         // Esto sí podría ser global
}));

// ✅ Estado local para UI, global solo para datos compartidos
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false); // local
}
```

### 2. Usar Context para datos del servidor

```jsx
// ❌ Context no tiene cache, retry, revalidación...
function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  useEffect(() => { fetch("/api/users").then(r => r.json()).then(setUsers); }, []);
  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
}

// ✅ React Query maneja todo esto mejor
function UserList() {
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
}
```

### 3. Usar Redux para una app pequeña

Si tu app tiene 5 pantallas y 10 componentes, Redux es overkill. `useState` + lifting + quizás un Context es todo lo que necesitas.

---

## Resumen

| Nivel | Herramienta | Cuándo |
|---|---|---|
| 1 | `useState` | Solo un componente usa el dato |
| 2 | Lifting state up | 2-3 hermanos cercanos comparten dato |
| 3 | Context API | Muchos componentes leen un dato que cambia poco |
| 4 | `useReducer` + Context | Lógica compleja de estado de cliente |
| 5 | React Query / SWR | Datos del servidor (API) |
| 6 | Zustand | Estado global complejo de cliente con re-renders selectivos |

**La regla de oro:** empieza con lo más simple. Solo escala cuando el nivel actual te cause dolor real, no dolor imaginario.
