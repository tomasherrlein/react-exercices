# Testing con React Testing Library — Testea como un usuario

---

## El problema que resuelve

Muchos tests de React están mal: testean **detalles de implementación** (nombre del estado, estructura del DOM, cuántas veces se llamó una función). Cuando refactorizas, se rompen, aunque la app funciona perfecto.

React Testing Library (RTL) resuelve esto con un principio simple:

> "Cuanto más se parezca tu test a cómo un usuario usa tu app, más confianza te da."

No testeas el estado interno. Testeas que **el usuario ve lo correcto** y que **las interacciones hacen lo esperado**.

---

## La analogía: Testear un auto

- ❌ **Implementación**: "¿El pistón #3 se mueve exactamente 85mm?" → si cambias el motor, el test falla aunque el auto ande perfecto
- ✅ **Comportamiento**: "¿Al pisar el acelerador, el auto avanza?" → funciona con cualquier motor

RTL testea comportamiento, no implementación.

---

## Setup básico

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

```js
// vite.config.js
export default {
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
};
```

```js
// src/setupTests.js
import "@testing-library/jest-dom";
```

---

## Tu primer test

```jsx
// Counter.jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </div>
  );
}
```

```jsx
// Counter.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

test("incrementa el contador al hacer clic", async () => {
  const user = userEvent.setup();

  // 1. Renderiza el componente
  render(<Counter />);

  // 2. Verifica el estado inicial
  expect(screen.getByText("Contador: 0")).toBeInTheDocument();

  // 3. Simula interacción del usuario
  await user.click(screen.getByRole("button", { name: "Incrementar" }));

  // 4. Verifica el resultado
  expect(screen.getByText("Contador: 1")).toBeInTheDocument();
});
```

---

## Cómo buscar elementos

RTL ofrece varias formas de buscar elementos, en orden de preferencia:

### Prioridad 1 — Accesibles a todos (preferidas)

```jsx
// getByRole — la más recomendada
screen.getByRole("button", { name: "Enviar" });
screen.getByRole("textbox", { name: "Email" });
screen.getByRole("heading", { name: "Bienvenido" });
screen.getByRole("checkbox", { name: "Acepto" });

// getByLabelText — para inputs con label
screen.getByLabelText("Email");

// getByPlaceholderText
screen.getByPlaceholderText("Buscar...");

// getByText — para texto visible
screen.getByText("No hay resultados");
```

### Prioridad 2 — Semánticas

```jsx
// getByAltText — para imágenes
screen.getByAltText("Logo de la empresa");

// getByTitle
screen.getByTitle("Cerrar");
```

### Prioridad 3 — Último recurso

```jsx
// getByTestId — solo si no hay otra opción
screen.getByTestId("custom-element");
// Requiere: <div data-testid="custom-element">
```

### get vs query vs find

```jsx
// getBy — lanza error si no encuentra (para elementos que DEBEN existir)
screen.getByText("Hola");

// queryBy — retorna null si no encuentra (para verificar ausencia)
expect(screen.queryByText("Error")).not.toBeInTheDocument();

// findBy — espera asíncronamente (para elementos que APARECERÁN)
const item = await screen.findByText("Datos cargados");
```

---

## Simular interacciones con userEvent

```jsx
import userEvent from "@testing-library/user-event";

test("formulario de login", async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={mockSubmit} />);

  // Escribir en inputs
  await user.type(screen.getByLabelText("Email"), "ana@test.com");
  await user.type(screen.getByLabelText("Contraseña"), "123456");

  // Click
  await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));

  // Verificar
  expect(mockSubmit).toHaveBeenCalledWith({
    email: "ana@test.com",
    password: "123456",
  });
});
```

### Interacciones comunes

```jsx
// Escribir
await user.type(input, "texto");

// Borrar y escribir
await user.clear(input);
await user.type(input, "nuevo texto");

// Click
await user.click(button);

// Doble click
await user.dblClick(element);

// Hover
await user.hover(element);

// Select (dropdown)
await user.selectOptions(select, "opcion1");

// Checkbox
await user.click(checkbox); // toggle
```

---

## Qué testear y qué no

### ✅ Testea:

1. **Que se renderiza correctamente** — el usuario ve lo esperado
2. **Interacciones** — clicks, typing, submits producen el resultado correcto
3. **Estados de error** — mensajes de error visibles
4. **Condicionales** — qué se muestra si hay/no hay datos
5. **Accesibilidad** — los roles y labels son correctos

### ❌ No testees:

1. **Estado interno** — no busques `useState` desde fuera
2. **Nombre de funciones** — no testees que `handleClick` se llamó
3. **Estructura del DOM** — no cuentes `<div>`s
4. **Estilos** — no testees `color: red` (usa visual regression testing)
5. **Librerías externas** — no testees que React Router funciona

---

## Testing de componentes asíncronos

```jsx
// UserProfile.jsx — hace fetch
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(r => r.json())
      .then(data => { setUser(data); setLoading(false); });
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  return <p>Nombre: {user.name}</p>;
}
```

```jsx
// UserProfile.test.jsx
import { render, screen } from "@testing-library/react";

// Mock del fetch global
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: "Ana García" }),
    })
  );
});

test("muestra el usuario después de cargar", async () => {
  render(<UserProfile userId="1" />);

  // Primero muestra loading
  expect(screen.getByText("Cargando...")).toBeInTheDocument();

  // Después muestra el nombre (findBy espera hasta que aparezca)
  expect(await screen.findByText("Nombre: Ana García")).toBeInTheDocument();

  // El loading ya no está
  expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
});
```

---

## Estructura de un buen test

```jsx
test("describe qué hace en lenguaje humano", async () => {
  // ARRANGE — prepara lo necesario
  const user = userEvent.setup();
  const mockFn = vi.fn();
  render(<Component onAction={mockFn} />);

  // ACT — simula la interacción del usuario
  await user.type(screen.getByLabelText("Nombre"), "Ana");
  await user.click(screen.getByRole("button", { name: "Enviar" }));

  // ASSERT — verifica el resultado
  expect(mockFn).toHaveBeenCalledWith("Ana");
  expect(screen.getByText("Enviado")).toBeInTheDocument();
});
```

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Qué es RTL? | Librería de testing que testea comportamiento, no implementación |
| ¿El principio guía? | "Cuanto más se parezca a cómo un usuario usa tu app, más confianza" |
| ¿Cómo buscar elementos? | `getByRole` > `getByLabelText` > `getByText` > `getByTestId` |
| ¿get vs query vs find? | get: debe existir, query: puede no existir, find: aparecerá async |
| ¿Qué testear? | Lo que el usuario ve y hace — renderizado, interacciones, errores |
| ¿Qué NO testear? | Estado interno, estructura del DOM, nombre de funciones |
