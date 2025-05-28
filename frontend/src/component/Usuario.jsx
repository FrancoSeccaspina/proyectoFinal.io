
import React, {useState, useEffect} from 'react'
import { Link  } from 'react-router-dom'
import axios from 'axios';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [search, setSearch] = useState("")
    const showData = async ()=> {
        const response = await fetch("http://localhost:3032/api/usuarios");
        const data = await response.json();
        console.log('DATA RECIBIDA:', data);
        setUsuarios(data);

    }
    //Funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    //Metodo de filtrado
    let resultado = [];
    if (!search) {
    resultado = usuarios;
        } else {
    resultado = usuarios.filter((dato) => 
        dato.dni.toString().includes(search)
        );
    }


    useEffect(() => {
        showData();
      }, [])
    

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar esta rutina?")) {
      try {
        await axios.delete(`http://localhost:3032/api/usuarios/${id}`);
        setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuarios:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    
    <div className='mover_abajo'>
    <h2 className='box-title'>Lista de Usuarios</h2>
    <Link to={`http://localhost:3032/register`} class="btn btn-primary" >Agregar Nuevo</Link>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar por DNI' className='form-control'/>
        <table className='table table-dark table-striped'>
                <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Celular</th>
                            <th>DNI</th>
                            <th>Apto Medico</th>
                            <th>Acciones</th>
                        </tr>
                </thead>
                <tbody>
                    { resultado.map((usuarios) =>(
                        <tr key={usuarios.id}>
                            <td>{usuarios.nombre}</td>
                            <td>{usuarios.apellido}</td>
                            <td>{usuarios.celular}</td>
                            <td>{usuarios.dni}</td>
                            <td>{usuarios.aptoMedico}</td>
                            <td>
                              <Link to={`/usuarios/editar/${usuarios.id}`} className="btn btn-success">Editar</Link>
                              <button class="btn btn-danger" onClick={() => handleDelete(usuarios.id)}>Eliminar</button>
                              <button className="btn btn-primary"> Cuota</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
  )
}

export default Usuarios