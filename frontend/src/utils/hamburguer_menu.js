document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("menu");

  if (!hamburgerBtn || !menu) return;

  hamburgerBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Cerrar al hacer clic en un enlace
  const links = menu.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
});
