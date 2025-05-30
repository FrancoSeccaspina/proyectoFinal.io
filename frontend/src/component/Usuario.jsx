import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState("");

  const showData = async () => {
    try {
      const response = await fetch("http://localhost:3032/api/usuarios");
      const data = await response.json();
      console.log('DATA RECIBIDA:', data);
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  // Función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Filtrado
  const resultado = !search
    ? usuarios
    : usuarios.filter((usuario) =>
        usuario.dni.toString().includes(search)
      );

  useEffect(() => {
    showData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que querés eliminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:3032/api/usuarios/${id}`);
        setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  return (
    <div className='mover_abajo'>
      <h2 className='box-title'>Lista de Usuarios</h2>
      <Link to="/register" className="btn btn-primary">Agregar Nuevo</Link>
      <input
        value={search}
        onChange={searcher}
        type="text"
        placeholder='Buscar por DNI'
        className='form-control'
      />
      <table className='table table-dark table-striped'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
            <th>DNI</th>
            <th>Apto Médico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resultado.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.celular}</td>
              <td>{usuario.dni}</td>
              <td>{usuario.aptoMedico}</td>
              <td>
                <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-success">Editar</Link>{' '}
                <button className="btn btn-danger" onClick={() => handleDelete(usuario.id)}>Eliminar</button>{' '}
                <Link to={`/cuota/${usuario.id}`} className="btn btn-primary">Historial Cuota</Link>{' '}
                <Link to={`/cuotaNueva/${usuario.id}`} className="btn btn-warning">Agregar Cuota</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
