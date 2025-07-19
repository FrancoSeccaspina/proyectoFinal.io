import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/productos.css';
import '../css/header.css'

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState('');

  const showData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3032/api/usuarios');
      console.log('DATA RECIBIDA:', data);
      setUsuarios(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  
  const resultado = !search
    ? usuarios
    : usuarios.filter((usuario) =>
        usuario.dni?.toString().toLowerCase().includes(search.toLowerCase())
      );

  useEffect(() => {
    showData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que querés eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:3032/api/usuarios/${id}`, 
          {withCredentials: true}
        );
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
      } catch (error) {
        const msg = error.response?.data?.message || error.message || 'Error desconocido';
        console.error('Error al eliminar usuario:', error);
        alert(`Error: ${msg}`);
      }
    }
  };

  return (
    <div className="container-products">
      <section className="moverJuntos">
        <h2 className="box-title">Lista de Usuarios</h2>
        <Link to="/nuevoUsuario" className="btn btn-primary">Agregar Nuevo</Link>
      </section>
      <input
        value={search}
        type="text"
        placeholder="Buscar por DNI"
        className="form-control mt-2 mb-3"
      />

      <table className="table table-dark table-striped">
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
                <Link to={`/usuarios/editar/${usuario.id}`} className="btn btn-success btn-sm">Editar</Link>{' '}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(usuario.id)}>Eliminar</button>{' '}
                <Link to={`/cuota/${usuario.id}`} className="btn btn-primary btn-sm">Historial Cuota</Link>{' '}
                <Link to={`/cuotaNueva/${usuario.id}`} className="btn btn-warning btn-sm">Agregar Cuota</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;