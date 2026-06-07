const burger = document.querySelector(".tour__burger");
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

document.querySelectorAll(".tour__tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const group = tab.dataset.tabGroup;
    const id = tab.dataset.tab;

    document
      .querySelectorAll(`.tour__tab[data-tab-group="${group}"]`)
      .forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

    document
      .querySelectorAll(`.tour__panel[data-panel-group="${group}"]`)
      .forEach((panel) => {
        const active = panel.dataset.panel === id;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
  });
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const galleryItems = Array.from(document.querySelectorAll(".tour__gallery-item"));
let currentIndex = 0;

function openLightbox(index) {
  if (!lightbox || !galleryItems.length) return;
  currentIndex = index;
  const item = galleryItems[currentIndex];
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.querySelector("img")?.alt || "";
  lightboxCaption.textContent = item.dataset.caption || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

function showAdjacent(step) {
  if (!galleryItems.length) return;
  currentIndex = (currentIndex + step + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightbox?.querySelector(".tour__lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.querySelector(".tour__lightbox-prev")?.addEventListener("click", () => showAdjacent(-1));
lightbox?.querySelector(".tour__lightbox-next")?.addEventListener("click", () => showAdjacent(1));

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (lightbox?.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showAdjacent(-1);
  if (e.key === "ArrowRight") showAdjacent(1);
});
