// https://www.w3schools.com/howto/howto_js_countdown.asp
document.addEventListener("DOMContentLoaded", function () {
    const cuentaRegresiva = document.getElementById("cuenta-regresiva");
    if (!cuentaRegresiva) return;

    const vencimientoStr = cuentaRegresiva.dataset.vencimiento;
    const vencimiento = new Date(vencimientoStr).getTime();

    function actualizarCuentaRegresiva() {
        const ahora = new Date().getTime();
        const distancia = vencimiento - ahora;

        if (distancia <= 0) {
            cuentaRegresiva.textContent = "El tiempo estimado para confirmar la compra expiro";
            return;
        }

        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        cuentaRegresiva.textContent = `${minutos}m ${segundos}s`;
    }

    actualizarCuentaRegresiva();
    setInterval(actualizarCuentaRegresiva, 1000);
});
