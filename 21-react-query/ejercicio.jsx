/**
 * EJERCICIO 18 — React Query (TanStack Query)
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 *
 * IMPORTANTE: Necesitas instalar React Query para ejecutar estos ejercicios:
 *   npm install @tanstack/react-query
 *
 * Los ejercicios usan JSONPlaceholder (jsonplaceholder.typicode.com) como API.
 */

// import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 18A — useQuery básico (★☆☆)
// ─────────────────────────────────────────────
/**
 * Crea un componente que muestre una lista de posts usando useQuery.
 *
 * API: https://jsonplaceholder.typicode.com/posts (retorna 100 posts)
 *
 * Requisitos:
 * 1. Usa useQuery con queryKey ["posts"] y queryFn que hace fetch
 * 2. Muestra "Cargando posts..." mientras isLoading
 * 3. Muestra "Error: {message}" si hay error
 * 4. Muestra los primeros 10 posts con título y body (truncado a 100 chars)
 * 5. Muestra el total de posts: "Mostrando 10 de 100 posts"
 * 6. Envuelve todo en QueryClientProvider
 *
 * Pista:
 *   const { data, isLoading, error } = useQuery({
 *     queryKey: ["posts"],
 *     queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
 *   });
 */

export function PostList() {
  // Tu código aquí
}

export function PostListApp() {
  // Tu código aquí: envuelve PostList en QueryClientProvider
}


// ─────────────────────────────────────────────
// EJERCICIO 18B — Query con parámetros y dependent queries (★★☆)
// ─────────────────────────────────────────────
/**
 * Crea una app que muestre usuarios y al seleccionar uno,
 * muestre sus posts.
 *
 * APIs:
 * - Usuarios: https://jsonplaceholder.typicode.com/users
 * - Posts de un usuario: https://jsonplaceholder.typicode.com/posts?userId={id}
 *
 * Requisitos:
 * 1. UserList: lista de usuarios con useQuery, queryKey ["users"]
 * 2. Al hacer clic en un usuario, se selecciona (estado en padre)
 * 3. UserPosts: muestra los posts del usuario seleccionado
 *    - queryKey: ["posts", userId]
 *    - enabled: !!userId (solo hace fetch si hay usuario seleccionado)
 * 4. Si no hay usuario seleccionado, mostrar "Selecciona un usuario"
 * 5. Mostrar loading/error states para ambas queries
 * 6. El usuario activo debe tener un estilo diferente (fondo, bold)
 *
 * Pista: el queryKey incluye userId para que React Query
 *        haga un nuevo fetch cuando cambia el usuario seleccionado.
 */

export function UserPostsApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 18C — useMutation con invalidation (★★★)
// ─────────────────────────────────────────────
/**
 * Crea una mini app de todos con React Query.
 *
 * API (JSONPlaceholder — las escrituras son simuladas, no persisten):
 * - GET: https://jsonplaceholder.typicode.com/todos?_limit=10
 * - POST: https://jsonplaceholder.typicode.com/todos
 * - DELETE: https://jsonplaceholder.typicode.com/todos/{id}
 * - PATCH: https://jsonplaceholder.typicode.com/todos/{id}
 *
 * Requisitos:
 * 1. Muestra la lista de todos con useQuery
 * 2. Formulario para agregar un nuevo todo:
 *    - useMutation con POST
 *    - onSuccess: invalidate ["todos"] para refetch
 *    - Mostrar "Agregando..." mientras isPending
 * 3. Botón para eliminar cada todo:
 *    - useMutation con DELETE
 *    - onSuccess: invalidate ["todos"]
 * 4. Checkbox para toggle completed:
 *    - useMutation con PATCH
 *    - onSuccess: invalidate ["todos"]
 * 5. Mostrar loading/error para cada mutation
 *
 * Nota: JSONPlaceholder simula las escrituras (retorna 200)
 *       pero no persiste los cambios. El invalidate hará refetch
 *       pero los datos volverán al estado original.
 *       Para una experiencia más real, puedes hacer optimistic updates
 *       (bonus, no requerido).
 *
 * Pista:
 *   const addMutation = useMutation({
 *     mutationFn: (newTodo) => fetch(url, {
 *       method: "POST",
 *       body: JSON.stringify(newTodo),
 *       headers: { "Content-Type": "application/json" },
 *     }).then(r => r.json()),
 *     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
 *   });
 */

export function TodoQueryApp() {
  // Tu código aquí
}


// ─────────────────────────────────────────────
// EJERCICIO 18D — Paginación con React Query (★★★)
// ─────────────────────────────────────────────
/**
 * Crea un componente con paginación usando React Query.
 *
 * API: https://jsonplaceholder.typicode.com/posts?_page={page}&_limit=5
 * (retorna 5 posts por página, headers incluyen X-Total-Count)
 *
 * Requisitos:
 * 1. Estado: page (número, empieza en 1)
 * 2. useQuery con queryKey ["posts", page]
 *    - queryFn hace fetch y retorna { posts, totalCount }
 *      (totalCount viene del header X-Total-Count de la respuesta)
 * 3. Botones "Anterior" y "Siguiente"
 *    - "Anterior" deshabilitado en página 1
 *    - "Siguiente" deshabilitado en la última página
 * 4. Mostrar "Página X de Y" (Y = Math.ceil(totalCount / 5))
 * 5. Usar placeholderData para mantener datos previos mientras carga
 *    (la lista no desaparece al cambiar de página)
 * 6. Mostrar un indicador sutil de "actualizando" cuando isFetching
 *    pero ya hay datos (ej: opacidad 0.5)
 *
 * Pista:
 *   queryFn: async () => {
 *     const res = await fetch(`...?_page=${page}&_limit=5`);
 *     const posts = await res.json();
 *     const totalCount = Number(res.headers.get("X-Total-Count"));
 *     return { posts, totalCount };
 *   },
 *   placeholderData: (previousData) => previousData,
 */

export function PaginatedPostsApp() {
  // Tu código aquí
}


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 18A:
 * // import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
 * //
 * // const queryClient = new QueryClient();
 * //
 * // function PostList() {
 * //   const { data: posts, isLoading, error } = useQuery({
 * //     queryKey: ["posts"],
 * //     queryFn: () => fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
 * //   });
 * //
 * //   if (isLoading) return <p>Cargando posts...</p>;
 * //   if (error) return <p>Error: {error.message}</p>;
 * //
 * //   return (
 * //     <div>
 * //       <p>Mostrando 10 de {posts.length} posts</p>
 * //       {posts.slice(0, 10).map(post => (
 * //         <div key={post.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
 * //           <h3>{post.title}</h3>
 * //           <p>{post.body.slice(0, 100)}...</p>
 * //         </div>
 * //       ))}
 * //     </div>
 * //   );
 * // }
 * //
 * // export function PostListApp() {
 * //   return (
 * //     <QueryClientProvider client={queryClient}>
 * //       <h1>Posts</h1>
 * //       <PostList />
 * //     </QueryClientProvider>
 * //   );
 * // }
 *
 *
 * // 18B:
 * // const queryClient = new QueryClient();
 * //
 * // function UserList({ selectedId, onSelect }) {
 * //   const { data: users, isLoading, error } = useQuery({
 * //     queryKey: ["users"],
 * //     queryFn: () => fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json()),
 * //   });
 * //
 * //   if (isLoading) return <p>Cargando usuarios...</p>;
 * //   if (error) return <p>Error: {error.message}</p>;
 * //
 * //   return (
 * //     <ul style={{ listStyle: "none", padding: 0 }}>
 * //       {users.map(u => (
 * //         <li key={u.id}>
 * //           <button
 * //             onClick={() => onSelect(u.id)}
 * //             style={{
 * //               fontWeight: selectedId === u.id ? "bold" : "normal",
 * //               background: selectedId === u.id ? "#e0e7ff" : "transparent",
 * //               border: "1px solid #ddd", padding: 8, width: "100%",
 * //               cursor: "pointer", marginBottom: 4, textAlign: "left",
 * //             }}
 * //           >
 * //             {u.name}
 * //           </button>
 * //         </li>
 * //       ))}
 * //     </ul>
 * //   );
 * // }
 * //
 * // function UserPosts({ userId }) {
 * //   const { data: posts, isLoading, error } = useQuery({
 * //     queryKey: ["posts", userId],
 * //     queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json()),
 * //     enabled: !!userId,
 * //   });
 * //
 * //   if (!userId) return <p>Selecciona un usuario</p>;
 * //   if (isLoading) return <p>Cargando posts...</p>;
 * //   if (error) return <p>Error: {error.message}</p>;
 * //
 * //   return (
 * //     <div>
 * //       <h3>Posts ({posts.length})</h3>
 * //       {posts.map(p => (
 * //         <div key={p.id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
 * //           <h4>{p.title}</h4>
 * //           <p>{p.body.slice(0, 80)}...</p>
 * //         </div>
 * //       ))}
 * //     </div>
 * //   );
 * // }
 * //
 * // export function UserPostsApp() {
 * //   const [selectedId, setSelectedId] = useState(null);
 * //   return (
 * //     <QueryClientProvider client={queryClient}>
 * //       <div style={{ display: "flex", gap: 16 }}>
 * //         <div style={{ width: 250 }}>
 * //           <h2>Usuarios</h2>
 * //           <UserList selectedId={selectedId} onSelect={setSelectedId} />
 * //         </div>
 * //         <div style={{ flex: 1 }}>
 * //           <UserPosts userId={selectedId} />
 * //         </div>
 * //       </div>
 * //     </QueryClientProvider>
 * //   );
 * // }
 *
 *
 * // 18C:
 * // const queryClient = new QueryClient();
 * // const API = "https://jsonplaceholder.typicode.com/todos";
 * //
 * // function TodoList() {
 * //   const queryClient = useQueryClient();
 * //   const [newTitle, setNewTitle] = useState("");
 * //
 * //   const { data: todos, isLoading, error } = useQuery({
 * //     queryKey: ["todos"],
 * //     queryFn: () => fetch(`${API}?_limit=10`).then(r => r.json()),
 * //   });
 * //
 * //   const addMutation = useMutation({
 * //     mutationFn: (todo) => fetch(API, {
 * //       method: "POST",
 * //       body: JSON.stringify(todo),
 * //       headers: { "Content-Type": "application/json" },
 * //     }).then(r => r.json()),
 * //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
 * //   });
 * //
 * //   const deleteMutation = useMutation({
 * //     mutationFn: (id) => fetch(`${API}/${id}`, { method: "DELETE" }),
 * //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
 * //   });
 * //
 * //   const toggleMutation = useMutation({
 * //     mutationFn: ({ id, completed }) => fetch(`${API}/${id}`, {
 * //       method: "PATCH",
 * //       body: JSON.stringify({ completed }),
 * //       headers: { "Content-Type": "application/json" },
 * //     }).then(r => r.json()),
 * //     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
 * //   });
 * //
 * //   if (isLoading) return <p>Cargando...</p>;
 * //   if (error) return <p>Error: {error.message}</p>;
 * //
 * //   function handleAdd(e) {
 * //     e.preventDefault();
 * //     if (!newTitle.trim()) return;
 * //     addMutation.mutate({ title: newTitle, completed: false, userId: 1 });
 * //     setNewTitle("");
 * //   }
 * //
 * //   return (
 * //     <div>
 * //       <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
 * //         <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Nuevo todo..." />
 * //         <button type="submit" disabled={addMutation.isPending}>
 * //           {addMutation.isPending ? "Agregando..." : "Agregar"}
 * //         </button>
 * //       </form>
 * //       <ul style={{ listStyle: "none", padding: 0 }}>
 * //         {todos.map(todo => (
 * //           <li key={todo.id} style={{ display: "flex", gap: 8, alignItems: "center", padding: 4 }}>
 * //             <input type="checkbox" checked={todo.completed}
 * //               onChange={() => toggleMutation.mutate({ id: todo.id, completed: !todo.completed })} />
 * //             <span style={{ textDecoration: todo.completed ? "line-through" : "none", flex: 1 }}>
 * //               {todo.title}
 * //             </span>
 * //             <button onClick={() => deleteMutation.mutate(todo.id)}>✕</button>
 * //           </li>
 * //         ))}
 * //       </ul>
 * //     </div>
 * //   );
 * // }
 * //
 * // export function TodoQueryApp() {
 * //   return <QueryClientProvider client={queryClient}><h1>Todos</h1><TodoList /></QueryClientProvider>;
 * // }
 *
 *
 * // 18D:
 * // const queryClient = new QueryClient();
 * //
 * // function PaginatedPosts() {
 * //   const [page, setPage] = useState(1);
 * //
 * //   const { data, isLoading, isFetching, error } = useQuery({
 * //     queryKey: ["posts", page],
 * //     queryFn: async () => {
 * //       const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
 * //       const posts = await res.json();
 * //       const totalCount = Number(res.headers.get("X-Total-Count"));
 * //       return { posts, totalCount };
 * //     },
 * //     placeholderData: (previousData) => previousData,
 * //   });
 * //
 * //   if (isLoading) return <p>Cargando...</p>;
 * //   if (error) return <p>Error: {error.message}</p>;
 * //
 * //   const totalPages = Math.ceil(data.totalCount / 5);
 * //
 * //   return (
 * //     <div>
 * //       <div style={{ opacity: isFetching ? 0.5 : 1, transition: "opacity 0.2s" }}>
 * //         {data.posts.map(post => (
 * //           <div key={post.id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
 * //             <h3>{post.title}</h3>
 * //             <p>{post.body.slice(0, 100)}...</p>
 * //           </div>
 * //         ))}
 * //       </div>
 * //       <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 16 }}>
 * //         <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Anterior</button>
 * //         <span>Página {page} de {totalPages}</span>
 * //         <button onClick={() => setPage(p => p + 1)} disabled={page >= totalPages}>Siguiente</button>
 * //         {isFetching && <span> Actualizando...</span>}
 * //       </div>
 * //     </div>
 * //   );
 * // }
 * //
 * // export function PaginatedPostsApp() {
 * //   return <QueryClientProvider client={queryClient}><h1>Posts Paginados</h1><PaginatedPosts /></QueryClientProvider>;
 * // }
 */
