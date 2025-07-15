document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".accordion-toggle");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".accordion-card");
      const content = card.querySelector(".accordion-content");
      const isOpen = card.classList.contains("open");

      // Cierra todos los acordeones
      document.querySelectorAll(".accordion-card").forEach((otherCard) => {
        otherCard.classList.remove("open");
        const otherContent = otherCard.querySelector(".accordion-content");
        const otherButton = otherCard.querySelector(".accordion-toggle");
        otherContent.style.display = "none";
        otherContent.setAttribute("hidden", true);
        otherButton.setAttribute("aria-expanded", "false");
      });

      // Si el actual no estaba abierto, lo abre
      if (!isOpen) {
        card.classList.add("open");
        content.style.display = "block";
        content.removeAttribute("hidden");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});