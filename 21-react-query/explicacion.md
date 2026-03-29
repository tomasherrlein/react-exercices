# React Query (TanStack Query) — El estado del servidor resuelto

---

## El problema que resuelve

Manejar datos del servidor con `useEffect` + `useState` es repetitivo y frágil:

```jsx
// ❌ Esto lo escribes en CADA componente que hace fetch
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/users")
      .then(r => { if (!r.ok) throw new Error("Error"); return r.json(); })
      .then(data => { if (!cancelled) { setUsers(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  // Y aún te faltan: cache, retry, revalidación, paginación, optimistic updates...
}
```

React Query elimina todo ese boilerplate y te da cache, retry, revalidación, y más — gratis.

---

## La analogía: El asistente con memoria

Sin React Query, cada vez que necesitas un dato del servidor, mandas a alguien a buscarlo. Si otro componente necesita el mismo dato, mandas a otro asistente — duplicas trabajo.

Con React Query, tienes un **asistente con memoria**:

- La primera vez que le pides "usuarios", va a buscarlos
- Si le pides "usuarios" de nuevo, te da lo que tiene en memoria al instante
- Mientras tanto, va a buscar una versión fresca por si cambió
- Si falla, reintenta automáticamente
- Si te alejas y volvés, actualiza los datos por las dudas

---

## Setup

```bash
npm install @tanstack/react-query
```

```jsx
// main.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TuApp />
    </QueryClientProvider>
  );
}
```

---

## useQuery — Leer datos

```jsx
import { useQuery } from "@tanstack/react-query";

function UserList() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],                    // identificador único
    queryFn: () => fetch("/api/users")      // función que retorna los datos
      .then(r => r.json()),
  });

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

### ¿Qué hace React Query automáticamente?

| Feature | ¿Lo haces tú con useEffect? | React Query |
|---|---|---|
| Loading/error states | 3 useState manuales | Automático |
| Cache | No | Automático |
| Deduplicación | No | Automático |
| Retry en error | No | 3 reintentos por defecto |
| Revalidar al volver a la pestaña | No | Automático |
| Revalidar al reconectar | No | Automático |
| Stale-while-revalidate | No | Automático |

---

## queryKey — La clave de identificación

El `queryKey` identifica cada consulta de forma única. React Query usa la key para cachear y deduplicar:

```jsx
// Todos los usuarios
useQuery({ queryKey: ["users"], queryFn: fetchUsers });

// Un usuario específico
useQuery({ queryKey: ["users", userId], queryFn: () => fetchUser(userId) });

// Usuarios filtrados
useQuery({ queryKey: ["users", { search, role }], queryFn: () => fetchUsers({ search, role }) });
```

Si dos componentes usan el mismo `queryKey`, React Query hace **un solo fetch** y comparte el resultado.

```jsx
// Componente A y Componente B usan ["users"] al mismo tiempo
// → React Query hace UN solo fetch, ambos reciben el resultado
```

---

## useMutation — Escribir datos

Para operaciones que **modifican** datos (POST, PUT, DELETE):

```jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddUserForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) =>
      fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { "Content-Type": "application/json" },
      }).then(r => r.json()),

    onSuccess: () => {
      // Invalida la cache → refetch automático de la lista
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ name: "Ana", email: "ana@test.com" });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Guardando..." : "Agregar usuario"}
      </button>
      {mutation.isError && <p>Error: {mutation.error.message}</p>}
      {mutation.isSuccess && <p>¡Usuario creado!</p>}
    </form>
  );
}
```

### El flujo de una mutation:

1. `mutation.mutate(data)` — envía la petición
2. `mutation.isPending` = true → muestra "Guardando..."
3. Si éxito → `onSuccess` se ejecuta → invalida queries → refetch automático
4. Si error → `mutation.isError` = true → muestra el error

---

## Invalidación — Mantener datos frescos

Cuando modificas datos, necesitas que las listas se actualicen:

```jsx
const queryClient = useQueryClient();

// Invalida TODAS las queries que empiezan con "users"
queryClient.invalidateQueries({ queryKey: ["users"] });

// Invalida solo el usuario específico
queryClient.invalidateQueries({ queryKey: ["users", userId] });
```

Invalidar no borra los datos — marca la cache como "stale" (obsoleta) y dispara un refetch en segundo plano.

---

## Stale y cache — Los dos conceptos clave

```
staleTime: ¿Cuánto tiempo considero los datos "frescos"?
  → Mientras sean frescos, NO refetch (usa cache directo)

gcTime: ¿Cuánto tiempo guardo los datos en cache después de que nadie los use?
  → Después de este tiempo, se borran de memoria
```

```jsx
useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000,  // 5 minutos — no refetch si tiene menos de 5 min
  gcTime: 30 * 60 * 1000,    // 30 minutos — mantener en cache aunque no se use
});
```

### El flujo visual:

```
Primer fetch: Cache vacía → fetch → guarda en cache
                                      ↓
                              staleTime (ej: 5 min)
                                      ↓
Segundo acceso (< 5 min): Datos frescos → usa cache, NO fetch
Segundo acceso (> 5 min): Datos stale → muestra cache + refetch en background
                                      ↓
                              gcTime (ej: 30 min)
                                      ↓
Nadie usa los datos por 30 min: Se borran de cache
```

---

## Paginación

```jsx
function UserList() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isPreviousData } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetch(`/api/users?page=${page}`).then(r => r.json()),
    placeholderData: (previousData) => previousData, // muestra datos previos mientras carga
  });

  return (
    <div>
      {isLoading ? <p>Cargando...</p> : (
        <ul style={{ opacity: isPreviousData ? 0.5 : 1 }}>
          {data.users.map(u => <li key={u.id}>{u.name}</li>)}
        </ul>
      )}
      <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span>Página {page}</span>
      <button onClick={() => setPage(p => p + 1)} disabled={!data?.hasMore}>
        Siguiente
      </button>
    </div>
  );
}
```

---

## Enabled — Consultas dependientes

A veces un query depende de otro:

```jsx
// Primero obtén el usuario
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});

// Después obtén sus posts (solo cuando tengamos el user)
const { data: posts } = useQuery({
  queryKey: ["posts", user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user, // solo ejecuta cuando user existe
});
```

---

## Cuándo usar React Query vs useState+useEffect

```
¿Los datos vienen del servidor (API)?
  → React Query

¿Los datos son del cliente (formularios, UI, tema)?
  → useState / useReducer / Context
```

**React Query NO reemplaza** el estado del cliente. Gestiona el **estado del servidor**: datos que viven en una API y necesitan cache, sincronización, y revalidación.

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es React Query? | Librería para manejar estado del servidor (fetch, cache, sync) |
| ¿useQuery para qué? | Leer datos — GET |
| ¿useMutation para qué? | Modificar datos — POST, PUT, DELETE |
| ¿Qué es queryKey? | Identificador único para cada consulta (para cache y deduplicación) |
| ¿Qué es invalidation? | Marcar cache como obsoleta → refetch automático |
| ¿staleTime? | Cuánto tiempo los datos son "frescos" (no refetch) |
| ¿Reemplaza useState? | No — React Query es para datos del servidor, useState para estado del cliente |
