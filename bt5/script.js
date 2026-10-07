const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.AOS) {
  window.AOS.init({
    once: true,
    offset: 48,
    duration: reduceMotion ? 0 : 650,
    easing: "cubic-bezier(.22, 1, .36, 1)",
    disable: reduceMotion
  });
}

const toast = document.querySelector("#toast");
let toastTimeout;

function announce(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function wireSendButton(button, label, status) {
  button.addEventListener("click", () => {
    if (button.disabled) return;
    button.disabled = true;
    if (label) label.textContent = "Đã gửi";
    if (status) status.textContent = "Tin nhắn đã được gửi thành công";
    announce("Tin nhắn đã được gửi.");

    window.setTimeout(() => {
      button.disabled = false;
      if (label) label.textContent = "Gửi tin nhắn";
      if (status) status.textContent = "Di chuột hoặc nhấn nút để thử";
    }, 1500);
  });
}

wireSendButton(
  document.querySelector("#send-button"),
  document.querySelector("#send-label"),
  document.querySelector("#send-status")
);
wireSendButton(document.querySelector("#send-button-secondary"), null, null);

const loader = document.querySelector("#loader-demo");
const loadButton = document.querySelector("#load-button");
const loaderTitle = document.querySelector("#loader-title");
const loaderDetail = document.querySelector("#loader-detail");

loadButton.addEventListener("click", () => {
  if (loader.getAttribute("aria-busy") === "true") return;
  loader.setAttribute("aria-busy", "true");
  loadButton.disabled = true;
  loadButton.textContent = "Đang tải";
  loaderTitle.textContent = "Đang tải portfolio…";
  loaderDetail.textContent = "Đang đồng bộ 12 dự án";

  window.setTimeout(() => {
    loader.setAttribute("aria-busy", "false");
    loadButton.disabled = false;
    loadButton.textContent = "Tải dữ liệu";
    loaderTitle.textContent = "Portfolio đã sẵn sàng";
    loaderDetail.textContent = "12 dự án · cập nhật vừa xong";
  }, 1300);
});

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.append(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  if (!copied) throw new Error("Clipboard copy failed");
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    const originalLabel = button.textContent;

    try {
      await copyText(source.textContent);
      button.textContent = "Đã sao chép";
      announce("Đã sao chép đoạn mã.");
    } catch {
      button.textContent = "Không thể sao chép";
      announce("Trình duyệt không cho phép sao chép tự động.");
    }

    window.setTimeout(() => { button.textContent = originalLabel; }, 1800);
  });
});

const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Đóng menu" : "Mở menu");
  mainNav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

mainNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.matchMedia("(min-width: 641px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});