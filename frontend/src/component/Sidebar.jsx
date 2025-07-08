import React from 'react';
import {Link} from 'react-router-dom';
import images from '../assets/images/LOGO.png';
import '../css/components.css'

function Sidebar(){
    return(
        <React.Fragment>
            <div id='header-dashboard'>
                <img className='logo-image' src={images} alt="Logo activa fitness" />
                <div className='header-a'>
                    <Link to="/">Home</Link> 
        
                    <Link to="/Usuarios">Usuarios</Link> 
                    <Link to="/PrecioCuota">Precio Cuota</Link> 

                    <Link to="/Productos">Productos</Link> 

                    <Link to="/Recetas">Recetas</Link>

                    <Link to="/Rutinas">Rutinas</Link> 
                    <Link to="/Proveedores">Proveedores</Link> 
                    <Link to="/Empleados">Empleados</Link>
                    <Link to="/Reservas">Reservas</Link> 

                    <a href="http://localhost:3032/users/logout">Volver</a>
                </div>
            </div>
            
            <div class="flotante">
                <div>
                    <span>Usá estos accesos rápidos para cambiar entre interfaces:</span>
                </div>
                <nav>
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="http://localhost:3032/" class="breadcrumb-link">Cliente</a>
                    </li>

                    <li class="breadcrumb-separator">
                        <svg class="breadcrumb-icon" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m9 20.247 6-16.5" />
                        </svg>
                    </li>

                    <li class="breadcrumb-item">
                        <a href="http://localhost:3000" class="breadcrumb-link">Admin</a>
                    </li>
                    </ol>
                </nav>

            </div>
        </React.Fragment>
    )
}
export default Sidebar;