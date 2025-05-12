import { useEffect, useState } from "react";
import '../css/components.css'
function Usuario() {

  const [users, setUsers] = useState([]);

  const getUsers = async ()=> {
    const response = await fetch("http://localhost:3032/api/usuarios");
    const data = await response.json();
    console.log('DATA RECIBIDA:', data);
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, [])


  const HTMLUsers = users.map((users) => {
    return (
      <div className="container-products">
        <div key={users.id}>
          <h3>Nombre: {users.nombre}</h3>
          <h3>Apellido: {users.apellido}</h3>
          <img src={`http://localhost:3032/images/avatars/${users.imagen}`} alt="" width='150' className='game-image' />
        </div>
      </div>
    )
  })
  return (
    <div>
      <h1 className="box-title">Lista de Usuarios: {users.length}</h1>

      <section>{HTMLUsers}</section>
    </div>
  );
}

export default Usuario;
