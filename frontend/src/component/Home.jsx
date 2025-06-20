import React from "react";
import CuadroCuotaAbonada from '../charts/CuadroCuotaAbonada'
import CuadroIngresoCobro from '../charts/ManualChartProveedor'
import CuadroTotalVendido from "../charts/CuadroTotalVendido";
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