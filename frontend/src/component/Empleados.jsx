import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const Empleados = () => {
    const [empleados, setEmpleados] = useState([])
    const [search, setSearch] = useState("")
    const showData = async ()=> {
        const response = await fetch("http://localhost:3032/api/empleados");
        const data = await response.json();
        setEmpleados(data);

    }
    //Funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    //Metodo de filtrado
    let resultado = []
    if(!search){
        resultado = empleados;
    }else{
        resultado = empleados.filter( (dato) => 
        dato.nombre.toLowerCase().includes(search.toLowerCase())
        )
    }

    useEffect(() => {
        showData();
      }, [])
      const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que querés eliminar este empleado?")) {
          try {
            await axios.delete(`http://localhost:3032/api/empleados/${id}`);
            setEmpleados(prevEmpleados => prevEmpleados.filter(r => r.id !== id));
          } catch (error) {
            console.error('Error al eliminar empleado:', error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
          }
        }
      };
    
  return (
    
    <div className='mover_abajo'>
      <h2>Lista de Empleados</h2>
        <Link to={`/empleadoNuevo`} class="btn btn-primary" >Agregar Nuevo</Link>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar por Nombre' className='form-control'/>
        <table className='table table-dark table-striped'>
                <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Celular</th>
                            <th>Actividad</th>
                            <th>Acciones</th>
                        </tr>
                </thead>
                <tbody>
                    { resultado.map((empleados) =>(
                        <tr key={empleados.id}>
                            <td>{empleados.nombre}</td>
                            <td>{empleados.apellido}</td>
                            <td>{empleados.celular}</td>
                            <td>{empleados.actividad}</td>
                            <td>
                                <Link to={`/empleados/editar/${empleados.id}`} className="btn btn-success">Editar</Link>
                                <button class="btn btn-danger" onClick={() => handleDelete(empleados.id)}>Eliminar</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
  )
}

export default Empleados