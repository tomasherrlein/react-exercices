import "./App.css"
import { AlertBox } from "../../01-jsx/ejercicio"
import { NavBar } from "../../01-jsx/ejercicio";
import { UserStatus } from "../../01-jsx/ejercicio";
import { Avatar } from "../../02-componentes-props/ejercicio-resolucion";
import { Card } from "../../02-componentes-props/ejercicio-resolucion";
import { DirectorioContactos } from "../../02-componentes-props/ejercicio-resolucion";

function App() {
  const usuarios = [
  { id: 1, name: "Ana Ruiz",   email: "ana@mail.com",   phone: "+34 612 345 678", department: "Diseño" },
  { id: 2, name: "Carlos Vega", email: "carlos@mail.com", phone: "+34 698 765 432", department: "Dev" },
  { id: 3, name: "Lucía Mora", email: "lucia@mail.com",  phone: "+34 655 111 222", department: "Dev" },
  ];

  return (

    <>
      <DirectorioContactos users={usuarios} />
    </>

  // <div> EJERCICIO 2C
  //   <Card title="Info"><p>Contenido normal</p></Card>
  //   <Card variant="outlined"><p>Sin título, borde punteado</p></Card>
  //   <Card title="Destacado" variant="elevated"><p>Con sombra</p></Card>
  // </div>


  
  // <> EJERCICIO 2B  
  // <Avatar name="Ana García" imageUrl="https://i.pravatar.cc/48" />
  // <Avatar name="Luis" />
  // <Avatar name="Marta" size={80} imageUrl="https://i.pravatar.cc/80" />
  // </>

  // <> EJERCICIO 1E
  //   <UserStatus user={null} />
  //   <hr />
  //   <UserStatus user={{ name: "Ana", role: "admin", lastLogin: "Ayer", banned: false }} />
  //   <hr />
  //   <UserStatus user={{ name: "Pedro", role: "user", lastLogin: null, banned: false }} />
  //   <hr />
  //   <UserStatus user={{ name: "Luis", role: "user", lastLogin: "Hoy", banned: true }} />
  // </>    

  // <> EJERCICIO 1D
  //   <NavBar links={linksDemo} />
  // </>

  /*<> EJERCICIO 1C
     <AlertBox type="success" message="Operación exitosa" />
     <AlertBox type="warning" message="Revisa los datos" />
     <AlertBox type="error" message="Algo salió mal" />
  </>*/
  
  )
}

export default App
