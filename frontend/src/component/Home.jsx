import React from "react";
import CuadroCuotaAbonada from '../charts/CuadroCuotaAbonada'
import CuadroIngresoCobro from '../charts/ManualChartProveedor'
function Home() {

    return(

        <div>
            <CuadroCuotaAbonada />
            <CuadroIngresoCobro />
            
        </div>
        )
}

export default Home;