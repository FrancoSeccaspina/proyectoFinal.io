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

                    <Link to="/Productos">Productos</Link> 

                    <Link to="/Recetas">Recetas</Link>

                    <Link to="/Rutinas">Rutinas</Link> 
                    <Link to="/Proveedores">Proveedores</Link> 
                    <Link to="/Reservas">Reservas</Link> 

                    <a href="http://localhost:3032/">Volver</a>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Sidebar;