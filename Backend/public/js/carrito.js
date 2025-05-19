// ventana modal
document.querySelector('.modal-overlay').style.display = 'none';
document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const form = this.closest('form');
        document.querySelector('.modal-overlay').style.display = 'grid';

        // Cancelar
        document.querySelector('.btn-cancel').onclick = function () {
            document.querySelector('.modal-overlay').style.display = 'none';
        };

        // eliminar
        document.querySelector('.btn-confirm').onclick = function () {
            document.querySelector('.modal-overlay').style.display = 'none';
            form.submit();
        };
    });
});

// Guardar la posición del scroll antes de recargar
// Restaurar la posición del scroll al cargar la página
window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('scrollPos', window.scrollY);
});

window.addEventListener('load', function () {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos) window.scrollTo(0, parseInt(scrollPos, 10));
});

