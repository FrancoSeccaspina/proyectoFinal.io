document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".accordion-toggle");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".accordion-card");
      const content = card.querySelector(".accordion-content");

      const isExpanded = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".accordion-content").forEach((el) => {
        el.style.display = "none";
        el.setAttribute("hidden", true);
      });
      document.querySelectorAll(".accordion-toggle").forEach((btn) => {
        btn.setAttribute("aria-expanded", false);
      });

      if (!isExpanded) {
        content.style.display = "block";
        content.removeAttribute("hidden");
        button.setAttribute("aria-expanded", true);
      } else {
        content.style.display = "none";
        content.setAttribute("hidden", true);
        button.setAttribute("aria-expanded", false);
      }
    });
  });
});
