/**
 * EJERCICIO 17 — Testing con React Testing Library
 *
 * Cuatro ejercicios de dificultad creciente.
 * Lee explicacion.md primero para entender el concepto.
 *
 * IMPORTANTE: Para ejecutar estos tests necesitas configurar vitest + RTL.
 * Instrucciones en la explicación.
 *
 * Cada ejercicio tiene:
 * 1. Un componente ya implementado
 * 2. Tests que TÚ debes escribir
 *
 * Ejecuta los tests con: npx vitest run
 */

import { useState } from "react";

// ─────────────────────────────────────────────
// EJERCICIO 17A — Tests básicos de un Greeting (★☆☆)
// ─────────────────────────────────────────────
/**
 * Componente dado:
 */
export function Greeting({ name, role }) {
  return (
    <div>
      <h1>Hola, {name}!</h1>
      {role === "admin" && <span style={{ color: "blue" }}>Administrador</span>}
      {!name && <p>Por favor ingresa tu nombre</p>}
    </div>
  );
}

/**
 * Escribe los siguientes tests (en un archivo .test.jsx aparte):
 *
 * 1. "muestra el saludo con el nombre"
 *    - render(<Greeting name="Ana" />)
 *    - expect: texto "Hola, Ana!" está en el documento
 *
 * 2. "muestra badge de admin si role es admin"
 *    - render(<Greeting name="Ana" role="admin" />)
 *    - expect: texto "Administrador" está en el documento
 *
 * 3. "NO muestra badge de admin si role no es admin"
 *    - render(<Greeting name="Ana" role="user" />)
 *    - expect: texto "Administrador" NO está en el documento
 *    - Pista: usa queryByText (retorna null si no encuentra)
 *
 * 4. "muestra mensaje si no hay nombre"
 *    - render(<Greeting />)
 *    - expect: texto "Por favor ingresa tu nombre" está en el documento
 *
 * Escribe los tests aquí como comentario (o en un archivo .test.jsx):
 */

// test("muestra el saludo con el nombre", () => {
//   // Tu código aquí
// });
//
// test("muestra badge de admin si role es admin", () => {
//   // Tu código aquí
// });
//
// test("NO muestra badge de admin si role no es admin", () => {
//   // Tu código aquí
// });
//
// test("muestra mensaje si no hay nombre", () => {
//   // Tu código aquí
// });


// ─────────────────────────────────────────────
// EJERCICIO 17B — Tests de interacción: Counter (★★☆)
// ─────────────────────────────────────────────
/**
 * Componente dado:
 */
export function Counter({ initialCount = 0, max = 10 }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Contador: {count}</p>
      <button
        onClick={() => setCount(c => c + 1)}
        disabled={count >= max}
      >
        Incrementar
      </button>
      <button
        onClick={() => setCount(c => c - 1)}
        disabled={count <= 0}
      >
        Decrementar
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
      {count >= max && <p style={{ color: "red" }}>Límite alcanzado</p>}
    </div>
  );
}

/**
 * Escribe los siguientes tests:
 *
 * 1. "muestra el contador inicial"
 *    - render con initialCount=5
 *    - expect: texto "Contador: 5"
 *
 * 2. "incrementa al hacer clic en Incrementar"
 *    - render, clic en "Incrementar", expect "Contador: 1"
 *
 * 3. "decrementa al hacer clic en Decrementar"
 *    - render con initialCount=5, clic en "Decrementar", expect "Contador: 4"
 *
 * 4. "resetea a 0 al hacer clic en Reset"
 *    - render con initialCount=5, clic en "Reset", expect "Contador: 0"
 *
 * 5. "deshabilita Incrementar cuando llega al max"
 *    - render con initialCount=9, max=10, clic en "Incrementar"
 *    - expect: botón "Incrementar" está disabled
 *    - expect: texto "Límite alcanzado" visible
 *
 * 6. "deshabilita Decrementar cuando llega a 0"
 *    - render con initialCount=0
 *    - expect: botón "Decrementar" está disabled
 *
 * Pista: usa screen.getByRole("button", { name: "Incrementar" })
 *        y expect(button).toBeDisabled()
 */

// Escribe los tests aquí como comentario:
// test("muestra el contador inicial", () => { ... });
// test("incrementa al hacer clic", async () => { ... });
// etc.


// ─────────────────────────────────────────────
// EJERCICIO 17C — Tests de formulario: LoginForm (★★★)
// ─────────────────────────────────────────────
/**
 * Componente dado:
 */
export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!email.includes("@")) newErrors.email = "Email inválido";
    if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
        />
        {errors.email && <span role="alert">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-invalid={!!errors.password}
        />
        {errors.password && <span role="alert">{errors.password}</span>}
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}

/**
 * Escribe los siguientes tests:
 *
 * 1. "renderiza el formulario con inputs vacíos"
 *    - expect: input email, input password, botón submit existen
 *
 * 2. "muestra error si email no tiene @"
 *    - type "invalido" en email, type "123456" en password, clic submit
 *    - expect: alert con "Email inválido"
 *    - expect: onSubmit NO fue llamado
 *
 * 3. "muestra error si password tiene menos de 6 caracteres"
 *    - type "test@test.com" en email, type "123" en password, clic submit
 *    - expect: alert con "Mínimo 6 caracteres"
 *
 * 4. "muestra ambos errores si ambos son inválidos"
 *    - type "bad" en email, type "12" en password, clic submit
 *    - expect: 2 alerts visibles
 *
 * 5. "llama a onSubmit con datos válidos"
 *    - type "ana@test.com" en email, type "password123" en password
 *    - clic submit
 *    - expect: onSubmit fue llamado con { email: "ana@test.com", password: "password123" }
 *    - expect: no hay alerts de error
 *
 * 6. "limpia errores al enviar datos válidos después de un error"
 *    - Envía con datos inválidos (aparecen errores)
 *    - Corrige los datos y envía de nuevo
 *    - expect: los errores desaparecen
 *
 * Pista: usa screen.getByLabelText("Email") para buscar inputs con label
 *        usa vi.fn() para crear el mock de onSubmit
 *        usa screen.queryAllByRole("alert") para contar alerts
 */

// Escribe los tests aquí como comentario:
// ...


// ─────────────────────────────────────────────
// EJERCICIO 17D — Tests de componente async: UserProfile (★★★)
// ─────────────────────────────────────────────
/**
 * Componente dado:
 */
export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useState(() => {
    fetch(`/api/users/${userId}`)
      .then(r => {
        if (!r.ok) throw new Error("Usuario no encontrado");
        return r.json();
      })
      .then(data => { setUser(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  });

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
}

/**
 * Escribe los siguientes tests:
 *
 * 1. "muestra loading mientras carga"
 *    - Mock fetch que resuelve con datos
 *    - render(<UserProfile userId="1" />)
 *    - expect: texto "Cargando perfil..." está visible
 *
 * 2. "muestra los datos del usuario cuando carga"
 *    - Mock fetch que resuelve con { name: "Ana", email: "ana@test.com", role: "admin" }
 *    - render, espera con findByText
 *    - expect: nombre, email y rol visibles
 *    - expect: "Cargando perfil..." ya no está visible
 *
 * 3. "muestra error si el fetch falla"
 *    - Mock fetch que rechaza con error
 *    - render, espera con findByRole("alert")
 *    - expect: mensaje de error visible
 *
 * 4. "hace fetch con el userId correcto"
 *    - Mock fetch
 *    - render(<UserProfile userId="42" />)
 *    - expect: fetch fue llamado con "/api/users/42"
 *
 * Pista para mockear fetch:
 *   beforeEach(() => {
 *     global.fetch = vi.fn(() => Promise.resolve({
 *       ok: true,
 *       json: () => Promise.resolve({ name: "Ana", email: "ana@test.com", role: "admin" }),
 *     }));
 *   });
 *   afterEach(() => { vi.restoreAllMocks(); });
 */

// Escribe los tests aquí como comentario:
// ...


/**
 * ═══════════════════════════════════════════
 * SOLUCIONES
 * ═══════════════════════════════════════════
 *
 * // 17A — Greeting tests:
 * // import { render, screen } from "@testing-library/react";
 * // import { Greeting } from "./ejercicio";
 * //
 * // test("muestra el saludo con el nombre", () => {
 * //   render(<Greeting name="Ana" />);
 * //   expect(screen.getByText("Hola, Ana!")).toBeInTheDocument();
 * // });
 * //
 * // test("muestra badge de admin si role es admin", () => {
 * //   render(<Greeting name="Ana" role="admin" />);
 * //   expect(screen.getByText("Administrador")).toBeInTheDocument();
 * // });
 * //
 * // test("NO muestra badge de admin si role no es admin", () => {
 * //   render(<Greeting name="Ana" role="user" />);
 * //   expect(screen.queryByText("Administrador")).not.toBeInTheDocument();
 * // });
 * //
 * // test("muestra mensaje si no hay nombre", () => {
 * //   render(<Greeting />);
 * //   expect(screen.getByText("Por favor ingresa tu nombre")).toBeInTheDocument();
 * // });
 *
 *
 * // 17B — Counter tests:
 * // import { render, screen } from "@testing-library/react";
 * // import userEvent from "@testing-library/user-event";
 * // import { Counter } from "./ejercicio";
 * //
 * // test("muestra el contador inicial", () => {
 * //   render(<Counter initialCount={5} />);
 * //   expect(screen.getByText("Contador: 5")).toBeInTheDocument();
 * // });
 * //
 * // test("incrementa al hacer clic", async () => {
 * //   const user = userEvent.setup();
 * //   render(<Counter />);
 * //   await user.click(screen.getByRole("button", { name: "Incrementar" }));
 * //   expect(screen.getByText("Contador: 1")).toBeInTheDocument();
 * // });
 * //
 * // test("decrementa al hacer clic", async () => {
 * //   const user = userEvent.setup();
 * //   render(<Counter initialCount={5} />);
 * //   await user.click(screen.getByRole("button", { name: "Decrementar" }));
 * //   expect(screen.getByText("Contador: 4")).toBeInTheDocument();
 * // });
 * //
 * // test("resetea a 0", async () => {
 * //   const user = userEvent.setup();
 * //   render(<Counter initialCount={5} />);
 * //   await user.click(screen.getByRole("button", { name: "Reset" }));
 * //   expect(screen.getByText("Contador: 0")).toBeInTheDocument();
 * // });
 * //
 * // test("deshabilita Incrementar al llegar al max", async () => {
 * //   const user = userEvent.setup();
 * //   render(<Counter initialCount={9} max={10} />);
 * //   await user.click(screen.getByRole("button", { name: "Incrementar" }));
 * //   expect(screen.getByRole("button", { name: "Incrementar" })).toBeDisabled();
 * //   expect(screen.getByText("Límite alcanzado")).toBeInTheDocument();
 * // });
 * //
 * // test("deshabilita Decrementar en 0", () => {
 * //   render(<Counter initialCount={0} />);
 * //   expect(screen.getByRole("button", { name: "Decrementar" })).toBeDisabled();
 * // });
 *
 *
 * // 17C — LoginForm tests:
 * // import { render, screen } from "@testing-library/react";
 * // import userEvent from "@testing-library/user-event";
 * // import { LoginForm } from "./ejercicio";
 * //
 * // test("renderiza formulario con inputs vacíos", () => {
 * //   render(<LoginForm onSubmit={vi.fn()} />);
 * //   expect(screen.getByLabelText("Email")).toBeInTheDocument();
 * //   expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
 * //   expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
 * // });
 * //
 * // test("muestra error si email no tiene @", async () => {
 * //   const user = userEvent.setup();
 * //   const onSubmit = vi.fn();
 * //   render(<LoginForm onSubmit={onSubmit} />);
 * //   await user.type(screen.getByLabelText("Email"), "invalido");
 * //   await user.type(screen.getByLabelText("Contraseña"), "123456");
 * //   await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
 * //   expect(screen.getByRole("alert")).toHaveTextContent("Email inválido");
 * //   expect(onSubmit).not.toHaveBeenCalled();
 * // });
 * //
 * // test("muestra error si password < 6 chars", async () => {
 * //   const user = userEvent.setup();
 * //   render(<LoginForm onSubmit={vi.fn()} />);
 * //   await user.type(screen.getByLabelText("Email"), "test@test.com");
 * //   await user.type(screen.getByLabelText("Contraseña"), "123");
 * //   await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
 * //   expect(screen.getByRole("alert")).toHaveTextContent("Mínimo 6 caracteres");
 * // });
 * //
 * // test("muestra ambos errores si ambos inválidos", async () => {
 * //   const user = userEvent.setup();
 * //   render(<LoginForm onSubmit={vi.fn()} />);
 * //   await user.type(screen.getByLabelText("Email"), "bad");
 * //   await user.type(screen.getByLabelText("Contraseña"), "12");
 * //   await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
 * //   expect(screen.getAllByRole("alert")).toHaveLength(2);
 * // });
 * //
 * // test("llama onSubmit con datos válidos", async () => {
 * //   const user = userEvent.setup();
 * //   const onSubmit = vi.fn();
 * //   render(<LoginForm onSubmit={onSubmit} />);
 * //   await user.type(screen.getByLabelText("Email"), "ana@test.com");
 * //   await user.type(screen.getByLabelText("Contraseña"), "password123");
 * //   await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
 * //   expect(onSubmit).toHaveBeenCalledWith({ email: "ana@test.com", password: "password123" });
 * //   expect(screen.queryByRole("alert")).not.toBeInTheDocument();
 * // });
 * //
 * // test("limpia errores al enviar datos válidos después de error", async () => {
 * //   const user = userEvent.setup();
 * //   const onSubmit = vi.fn();
 * //   render(<LoginForm onSubmit={onSubmit} />);
 * //   // Primer envío inválido
 * //   await user.type(screen.getByLabelText("Email"), "bad");
 * //   await user.type(screen.getByLabelText("Contraseña"), "12");
 * //   await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
 * //   expect(screen.getAllByRole("alert")).toHaveLength(2);
 * //   // Corregir y reenviar
 * //   await user.clear(screen.getByLabelText("Email"));
 * //   await user.type(screen.getByLabelText("Email"), "ana@test.com");
 * //   await user.clear(screen.getByLabelText("Contraseña"));
 * //   await user.type(screen.getByLabelText("Contraseña"), "password123");
 * //   await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
 * //   expect(screen.queryByRole("alert")).not.toBeInTheDocument();
 * // });
 *
 *
 * // 17D — UserProfile tests:
 * // import { render, screen } from "@testing-library/react";
 * // import { UserProfile } from "./ejercicio";
 * //
 * // beforeEach(() => {
 * //   global.fetch = vi.fn(() => Promise.resolve({
 * //     ok: true,
 * //     json: () => Promise.resolve({ name: "Ana", email: "ana@test.com", role: "admin" }),
 * //   }));
 * // });
 * // afterEach(() => { vi.restoreAllMocks(); });
 * //
 * // test("muestra loading mientras carga", () => {
 * //   render(<UserProfile userId="1" />);
 * //   expect(screen.getByText("Cargando perfil...")).toBeInTheDocument();
 * // });
 * //
 * // test("muestra datos del usuario", async () => {
 * //   render(<UserProfile userId="1" />);
 * //   expect(await screen.findByText("Ana")).toBeInTheDocument();
 * //   expect(screen.getByText("ana@test.com")).toBeInTheDocument();
 * //   expect(screen.getByText("Rol: admin")).toBeInTheDocument();
 * //   expect(screen.queryByText("Cargando perfil...")).not.toBeInTheDocument();
 * // });
 * //
 * // test("muestra error si fetch falla", async () => {
 * //   global.fetch = vi.fn(() => Promise.resolve({ ok: false }));
 * //   render(<UserProfile userId="1" />);
 * //   expect(await screen.findByRole("alert")).toHaveTextContent("Usuario no encontrado");
 * // });
 * //
 * // test("hace fetch con el userId correcto", () => {
 * //   render(<UserProfile userId="42" />);
 * //   expect(global.fetch).toHaveBeenCalledWith("/api/users/42");
 * // });
 */
