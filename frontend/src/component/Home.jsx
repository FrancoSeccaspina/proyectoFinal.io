import React from "react";
import CuadroCuotaAbonada from '../charts/CuadroCuotaAbonada'
import CuadroIngresoCobro from '../charts/ManualChartProveedor'
import CuadroTotalVendido from "../charts/CuadroTotalVendido";
import '../css/components.css';
import '../utils/hamburguer_menu.js';
import '../css/home.css'
function Home() {

    return(

        <div>
            <CuadroCuotaAbonada />
            <CuadroIngresoCobro />
            <CuadroTotalVendido/>
            
        </div>
        )
}

export default Home;