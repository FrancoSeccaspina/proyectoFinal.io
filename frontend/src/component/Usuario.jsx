
import React, {useState, useEffect} from 'react'


const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    const [search, setSearch] = useState("")
    const showData = async ()=> {
        const response = await fetch("http://localhost:3032/api/usuarios");
        const data = await response.json();
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
    
  return (
    
    <div className='mover_abajo'>
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
                            <td><button type="button" class="btn btn-success">Editar</button><button type="button" class="btn btn-danger">Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
  )
}

export default Usuarios
