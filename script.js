const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

const stepTabs = document.querySelectorAll(".steps__tab");
const stepPanels = document.querySelectorAll(".steps__panel");

stepTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const index = tab.dataset.step;

    stepTabs.forEach((item) => {
      item.classList.toggle("active", item.dataset.step === index);
      item.setAttribute("aria-selected", String(item.dataset.step === index));
    });

    stepPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === index);
    });
  });
});

let autoStep = 0;
setInterval(() => {
  if (stepTabs.length === 0) return;
  autoStep = (autoStep + 1) % stepTabs.length;
  stepTabs[autoStep].click();
}, 7000);

const modal = document.getElementById("callbackModal");
const modalTriggers = document.querySelectorAll('[data-modal="callback"]');
const modalCloseElements = modal?.querySelectorAll("[data-close]") ?? [];

function openModal() {
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = "";
}

modalTriggers.forEach((trigger) => trigger.addEventListener("click", openModal));
modalCloseElements.forEach((el) => el.addEventListener("click", closeModal));

function handleFormSubmit(form, successSelector) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const success = form.querySelector(successSelector);
    if (success) {
      success.hidden = false;
    }
    form.reset();
    if (form.id === "callbackForm") {
      setTimeout(closeModal, 1500);
    }
  });
}

const contactForm = document.getElementById("contactForm");
const callbackForm = document.getElementById("callbackForm");

if (contactForm) handleFormSubmit(contactForm, ".form-success");
if (callbackForm) handleFormSubmit(callbackForm, ".form-success");

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("is-visible"));
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});