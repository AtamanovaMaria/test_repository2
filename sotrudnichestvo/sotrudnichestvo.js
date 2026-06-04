const burger = document.querySelector(".coop__burger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
    mobileMenu.classList.toggle("is-open", !open);
    document.body.style.overflow = open ? "" : "hidden";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });
}
