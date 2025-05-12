
import React, {useState, useEffect} from 'react'

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
    
  return (
    
    <div className='mover_abajo'>
        <input value={search} onChange={searcher} type="text" placeholder='Buscar' className='form-control'/>
        <table className='table table-dark table-striped'>
                <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Celular</th>
                        </tr>
                </thead>
                <tbody>
                    { resultado.map((proveedores) =>(
                        <tr key={proveedores.id}>
                            <td>{proveedores.nombre}</td>
                            <td>{proveedores.apellido}</td>
                            <td>{proveedores.celular}</td>
                        </tr>
                    ))}
                </tbody>
        </table>
    </div>
  )
}

export default Proveedores