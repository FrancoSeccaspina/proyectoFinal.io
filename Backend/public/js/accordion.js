document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".accordion-toggle");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".accordion-card");
            card.classList.toggle("open");
        });
    });
});
