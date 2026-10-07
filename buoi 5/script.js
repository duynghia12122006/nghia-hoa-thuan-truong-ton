const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Mở menu" : "Đóng menu");
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Mở menu");
      primaryNav.classList.remove("is-open");
    }
  });
}

const skillList = document.querySelector(".skill-list");
if (skillList) {
  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        skillList.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    skillObserver.observe(skillList);
  } else {
    skillList.classList.add("is-visible");
  }
}

if (window.AOS) {
  window.AOS.init({
    duration: 650,
    easing: "ease-out-cubic",
    once: true,
    offset: 70,
    disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
  });
}
