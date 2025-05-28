// https://www.w3schools.com/howto/howto_js_countdown.asp
// TODO : analizar si el rendimiento se pude ver afectado al mostrar la cuenta regresiva a todas las reservas
// Escenario	¿Hay impacto real?
// 5–20 reservas	No, el navegador puede manejarlo sin problemas
// 50–100 reservas	Puede empezar a notarse una ligera ralentización, especialmente en móviles
// 500+ reservas	Sí, vas a tener consumo de CPU innecesario y puede afectar la fluidez de la página
document.addEventListener("DOMContentLoaded", function () {
    const elementosCuenta = document.querySelectorAll(".cuenta-regresiva");

    function actualizarTodasLasCuentas() {
        const ahora = new Date().getTime();

        elementosCuenta.forEach(function (elemento) {
            const vencimientoStr = elemento.dataset.vencimiento;
            const vencimiento = new Date(vencimientoStr).getTime();
            const distancia = vencimiento - ahora;

            if (distancia <= 0) {
                elemento.textContent = "El tiempo estimado para confirmar la compra expiró";
                return;
            }

            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
            elemento.textContent = `${minutos}m ${segundos}s`;
        });
    }

    actualizarTodasLasCuentas();
    setInterval(actualizarTodasLasCuentas, 1000);
});
