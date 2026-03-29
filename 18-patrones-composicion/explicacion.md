# Patrones de Composición — Legos, no bloques de hormigón

---

## El problema que resuelve

A medida que tu app crece, los componentes se vuelven monolíticos: hacen demasiadas cosas, son difíciles de reutilizar y de testear. Los patrones de composición permiten construir componentes **flexibles y reutilizables**, como piezas de Lego que encajan de distintas formas.

---

## La analogía: Legos vs bloques de hormigón

- **Bloque de hormigón** = componente monolítico. Hace una cosa específica, no se puede cambiar ni combinar.
- **Legos** = componentes compuestos. Piezas pequeñas que encajan de muchas formas distintas.

```
  Hormigón:                    Legos:
  ┌──────────────────┐         ┌────┐ ┌────────┐ ┌──────┐
  │ Select con       │         │Head│ │ Options │ │Footer│
  │ búsqueda,        │         └────┘ └────────┘ └──────┘
  │ multi-select,    │              ↕ Se combinan ↕
  │ tags, y footer   │         ┌────┬────────┬──────┐
  │ todo junto       │         │Head│Options │Footer│
  └──────────────────┘         └────┴────────┴──────┘
```

---

## Patrón 1: children — el más simple

Ya lo usaste. `children` permite que el padre decida **qué contenido** va dentro del componente:

```jsx
// El componente define la estructura
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// El padre decide el contenido
function App() {
  return (
    <Card title="Perfil">
      <img src="avatar.png" />
      <p>Hola, soy Ana</p>
    </Card>
  );
}
```

**Ventaja**: `Card` es reutilizable con cualquier contenido.

---

## Patrón 2: Slots con props (múltiples áreas de contenido)

Cuando necesitas más de un "hueco" para contenido, usa **props que aceptan JSX**:

```jsx
function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Layout
      header={<NavBar />}
      sidebar={<Menu items={menuItems} />}
    >
      <Dashboard />
    </Layout>
  );
}
```

**Ventaja**: El consumidor controla cada área sin que `Layout` sepa qué contienen.

---

## Patrón 3: Compound Components — componentes que trabajan juntos

Piensa en `<select>` y `<option>` de HTML: no tienen sentido por separado, pero juntos forman un sistema completo. Los compound components son lo mismo en React.

### El problema

```jsx
// ❌ Un componente con 15 props — difícil de usar y mantener
<Tabs
  tabs={["General", "Security", "Billing"]}
  activeTab={0}
  onTabChange={setActive}
  tabIcons={[icon1, icon2, icon3]}
  tabDisabled={[false, false, true]}
  panelContent={[<General />, <Security />, <Billing />]}
/>
```

### La solución: Compound Components

```jsx
// ✅ Componentes que se componen naturalmente
<Tabs defaultActive="general">
  <TabList>
    <Tab id="general">General</Tab>
    <Tab id="security">Seguridad</Tab>
    <Tab id="billing" disabled>Facturación</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="general"><GeneralSettings /></TabPanel>
    <TabPanel id="security"><SecuritySettings /></TabPanel>
    <TabPanel id="billing"><BillingSettings /></TabPanel>
  </TabPanels>
</Tabs>
```

### Cómo implementarlo (con Context)

```jsx
const TabsContext = createContext(null);

function Tabs({ defaultActive, children }) {
  const [activeId, setActiveId] = useState(defaultActive);

  return (
    <TabsContext.Provider value={{ activeId, setActiveId }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function useTabs() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("useTabs debe usarse dentro de <Tabs>");
  return ctx;
}

function TabList({ children }) {
  return <div className="tab-list" role="tablist">{children}</div>;
}

function Tab({ id, disabled, children }) {
  const { activeId, setActiveId } = useTabs();
  return (
    <button
      role="tab"
      aria-selected={activeId === id}
      disabled={disabled}
      onClick={() => setActiveId(id)}
      style={{ fontWeight: activeId === id ? "bold" : "normal" }}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ id, children }) {
  const { activeId } = useTabs();
  if (activeId !== id) return null;
  return <div role="tabpanel">{children}</div>;
}
```

**Ventaja**: la API es declarativa, flexible, y cada pieza es simple.

---

## Patrón 4: Render Props — pasar una función como children

A veces el padre necesita **datos del hijo** para decidir qué renderizar:

```jsx
// El hijo tiene la lógica, el padre decide la UI
function MouseTracker({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {children(pos)}  {/* llama a children como función */}
    </div>
  );
}

// El padre decide cómo mostrar la posición
function App() {
  return (
    <MouseTracker>
      {(pos) => <p>Mouse en: {pos.x}, {pos.y}</p>}
    </MouseTracker>
  );
}

// Otro uso del mismo componente — diferente UI
function App2() {
  return (
    <MouseTracker>
      {(pos) => (
        <div style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "red",
        }} />
      )}
    </MouseTracker>
  );
}
```

**Nota**: Hoy en día, los custom hooks reemplazan muchos casos de render props. `useMouse()` sería más limpio que `<MouseTracker>`. Pero render props siguen siendo útiles cuando necesitas **inyectar JSX** dentro de un layout controlado por el hijo.

---

## Patrón 5: Headless Components (sin UI propia)

Un componente headless tiene **toda la lógica** pero **cero UI**. El consumidor pone la UI que quiera:

```jsx
// Headless: solo lógica de toggle
function useToggle(initial = false) {
  const [isOn, setIsOn] = useState(initial);
  const toggle = () => setIsOn(o => !o);
  const setOn = () => setIsOn(true);
  const setOff = () => setIsOn(false);
  return { isOn, toggle, setOn, setOff };
}

// Uso 1: como switch
function LightSwitch() {
  const { isOn, toggle } = useToggle();
  return <button onClick={toggle}>{isOn ? "💡 ON" : "🔌 OFF"}</button>;
}

// Uso 2: como accordion
function Accordion({ title, children }) {
  const { isOn, toggle } = useToggle();
  return (
    <div>
      <button onClick={toggle}>{isOn ? "▼" : "▶"} {title}</button>
      {isOn && <div>{children}</div>}
    </div>
  );
}

// Uso 3: como modal
function Modal({ trigger, children }) {
  const { isOn, setOn, setOff } = useToggle();
  return (
    <>
      <button onClick={setOn}>{trigger}</button>
      {isOn && (
        <div className="modal-overlay" onClick={setOff}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            {children}
            <button onClick={setOff}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}
```

La misma lógica (`useToggle`) produce 3 UIs completamente diferentes.

---

## Cuándo usar cada patrón

| Patrón | Cuándo |
|---|---|
| `children` | Un área de contenido flexible |
| Slots (props con JSX) | Múltiples áreas de contenido (header, footer, sidebar) |
| Compound Components | Grupo de componentes que trabajan juntos (tabs, accordion, select) |
| Render Props | El hijo tiene datos que el padre necesita para renderizar |
| Headless (custom hooks) | Reutilizar lógica con UI completamente diferente |

---

## Patrón 6: Portals — Renderizar fuera del DOM del padre

A veces necesitás que un componente hijo (modal, tooltip, dropdown) se renderice **fuera** de su padre en el DOM, para evitar problemas con `overflow: hidden`, `z-index`, etc.

```jsx
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Renderiza en document.body, no en el padre
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>,
    document.body  // ← el nodo DOM donde se renderiza
  );
}

// Uso — el modal está "dentro" de Card en React, pero "fuera" en el DOM
function Card() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ overflow: "hidden" }}>
      <button onClick={() => setShowModal(true)}>Abrir modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Soy un modal</h2>
        <p>Estoy en document.body, no dentro de Card</p>
      </Modal>
    </div>
  );
}
```

### ¿Por qué no renderizar el modal normalmente?

Si el padre tiene `overflow: hidden` o un `z-index` bajo, el modal queda cortado o detrás de otros elementos. Con un portal, el modal vive en `document.body` y no le afectan los estilos del padre.

### Dato clave:

Los **eventos** de React siguen burbujeando normalmente — un portal en `document.body` sigue siendo "hijo" en el árbol de React. Solo la posición en el DOM cambia, no el comportamiento de React.

---

## Resumen

| Pregunta | Respuesta |
|---|---|
| ¿Por qué composición? | Componentes flexibles, reutilizables y fáciles de testear |
| ¿Qué es un compound component? | Grupo de componentes que comparten estado interno (vía Context) |
| ¿Render props vs custom hooks? | Custom hooks para lógica pura, render props cuando necesitas inyectar JSX |
| ¿Qué es headless? | Lógica sin UI — el consumidor pone la interfaz |
| ¿Qué es un portal? | Renderizar un componente fuera del DOM del padre (para modales, tooltips) |
| ¿El principio guía? | Separa el "qué hace" del "cómo se ve" |
