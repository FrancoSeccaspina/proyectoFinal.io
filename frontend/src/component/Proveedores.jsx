import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const Proveedores = () => {
    const [proveedores, setProvedores] = useState([])
    const [search, setSearch] = useState("")
    const showData = async ()=> {
        const response = await fetch("http://localhost:3032/api/proveedores");
        const data = await response.json();
        setProvedores(data);

    }
    //Funcion de busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    //Metodo de filtrado
    let resultado = []
    if(!search){
        resultado = proveedores;
    }else{
        resultado = proveedores.filter( (dato) => 
        dato.nombre.toLowerCase().includes(search.toLowerCase())
        )
    }

    useEffect(() => {
        showData();
      }, [])
      const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que querés eliminar este proveedor?")) {
          try {
            await axios.delete(`http://localhost:3032/api/proveedores/${id}`, { withCredentials: true });
            setProvedores(prevProveedores => prevProveedores.filter(r => r.id !== id));
          } catch (error) {
            console.error('Error al eliminar proveedor:', error);
            alert(`Error: ${error.response?.data?.message || error.message}`);
          }
        }
      };
    
  return (
    
    <div className='mover_abajo'>
      <h2>Lista de Proveedores</h2>
        <Link to={`/proveedorNuevo`} class="btn btn-primary" >Agregar Nuevo</Link>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar' className='form-control'/>
        <table className='table table-dark table-striped'>
                <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Celular</th>
                            <th>Acciones</th>
                        </tr>
                </thead>
                <tbody>
                    { resultado.map((proveedores) =>(
                        <tr key={proveedores.id}>
                            <td>{proveedores.nombre}</td>
                            <td>{proveedores.apellido}</td>
                            <td>{proveedores.celular}</td>
                            <td>
                                <Link to={`/provedores/editar/${proveedores.id}`} className="btn btn-success">Editar</Link>
                                <button class="btn btn-danger" onClick={() => handleDelete(proveedores.id)}>Eliminar</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
  )
}

export default Proveedores