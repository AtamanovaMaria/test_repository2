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
const lightboxTriggers = Array.from(document.querySelectorAll(".tour__lightbox-trigger"));
let activeLightboxItems = lightboxTriggers;
let currentIndex = 0;

function getLightboxGroup(trigger) {
  const panel = trigger.closest('[role="tabpanel"]');
  if (panel) {
    return Array.from(panel.querySelectorAll(".tour__lightbox-trigger"));
  }

  const gallery = trigger.closest("#galleryGrid");
  if (gallery) {
    return Array.from(gallery.querySelectorAll(".tour__lightbox-trigger"));
  }

  return lightboxTriggers;
}

function showLightboxItem(item) {
  if (!lightbox || !item) return;
  const isProtocol = item.classList.contains("tour__protocol-page");
  lightbox.classList.toggle("tour__lightbox--protocol", isProtocol);
  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = item.querySelector("img")?.alt || item.dataset.caption || "";
  lightboxCaption.textContent = item.dataset.caption || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";

  if (isProtocol) {
    lightbox.querySelector(".tour__lightbox-inner")?.scrollTo(0, 0);
  }
}

function openLightbox(item) {
  activeLightboxItems = getLightboxGroup(item);
  currentIndex = activeLightboxItems.indexOf(item);
  if (currentIndex === -1) return;
  showLightboxItem(item);
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  lightbox.classList.remove("tour__lightbox--protocol");
  lightboxImg.src = "";
  document.body.style.overflow = "";
}

function showAdjacent(step) {
  if (!activeLightboxItems.length) return;
  currentIndex = (currentIndex + step + activeLightboxItems.length) % activeLightboxItems.length;
  showLightboxItem(activeLightboxItems[currentIndex]);
}

lightboxTriggers.forEach((item) => {
  item.addEventListener("click", () => openLightbox(item));
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
