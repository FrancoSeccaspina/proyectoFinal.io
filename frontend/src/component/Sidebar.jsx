import RedireccionFlotante from './RedireccionFlotante';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import images from '../assets/images/LOGO.png';
import '../css/components.css';
import '../utils/hamburguer_menu.js';

function Sidebar() {

    useEffect(() => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const menu = document.getElementById("menu");

    if (hamburgerBtn && menu) {
      const toggleMenu = () => menu.classList.toggle("active");
      hamburgerBtn.addEventListener("click", toggleMenu);

      const links = menu.querySelectorAll("a");
      links.forEach(link =>
        link.addEventListener("click", () => menu.classList.remove("active"))
      );

      return () => {
        hamburgerBtn.removeEventListener("click", toggleMenu);
      };
    }
},[]);
  return (
    <React.Fragment>
      <div id='header-dashboard'>
        <img className='logo-image' src={images} alt="Logo activa fitness" />

        <button id="hamburger-btn" aria-label="Abrir menú">☰</button>

        <nav id='menu' className='header-a'>
          <Link to="/">Home</Link>
          <Link to="/Usuarios">Usuarios</Link>
          <Link to="/Empleados">Empleados</Link>
          <Link to="/PrecioCuota">Precio Cuota</Link>
          <Link to="/Productos">Productos</Link>
          <Link to="/Recetas">Recetas</Link>
          <Link to="/Rutinas">Rutinas</Link>
          <Link to="/Proveedores">Proveedores</Link>
          <Link to="/Reservas">Reservas</Link>
          <Link to="/Actividad">Actividad</Link>
          <a href={`${process.env.REACT_APP_BACKEND_DOMAIN_HOST}/users/logout`}>Salir</a>
        </nav>
      </div>
        <RedireccionFlotante/>
    </React.Fragment>
  );
}

export default Sidebar;
