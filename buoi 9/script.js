"use strict";

// BÀI 5: Dữ liệu dự án. Để dùng Google Sheets, xuất bản sheet thành CSV rồi điền URL bên dưới.
// Các cột CSV cần có: title, category, description, image, link, tags, symbol, color.
// category nhận một trong các giá trị: web, mobile, design.
const PROJECTS_CSV_URL = ""; // Ví dụ: https://docs.google.com/spreadsheets/d/e/.../pub?output=csv

// Dữ liệu mẫu giúp portfolio hoạt động ngay cả khi chưa cấu hình Google Sheets.
const sampleProjects = [
  { title: "Mộc — cửa hàng xanh", category: "web", description: "Trang giới thiệu cửa hàng cây cảnh với trải nghiệm mua sắm gọn gàng.", link: "https://example.com", tags: ["HTML", "CSS", "JavaScript"], symbol: "✿", color: "#71816c", background: "#e6eadf" },
  { title: "Daily Notes", category: "mobile", description: "Ý tưởng ứng dụng ghi chú nhanh, giúp lưu lại những điều quan trọng mỗi ngày.", link: "https://example.com", tags: ["Mobile", "Figma", "UI"], symbol: "✎", color: "#bd785c", background: "#f2e4d8" },
  { title: "Bộ nhận diện Nắng", category: "design", description: "Thử nghiệm màu sắc và kiểu chữ cho một thương hiệu cà phê nhỏ.", link: "https://example.com", tags: ["Branding", "Typography"], symbol: "☼", color: "#bf9045", background: "#f2ecd9" },
  { title: "Portfolio cá nhân", category: "web", description: "Một góc nhỏ trên web để chia sẻ hành trình học tập và các sản phẩm.", link: "https://example.com", tags: ["Responsive", "CSS Grid"], symbol: "⌘", color: "#7889a3", background: "#e2e8ef" },
  { title: "Theo dõi thói quen", category: "mobile", description: "Giao diện tối giản giúp biến những thói quen tốt thành tiến bộ mỗi ngày.", link: "https://example.com", tags: ["Prototype", "UX"], symbol: "✓", color: "#6d947f", background: "#e0ebe4" },
  { title: "Tạp chí Mùa", category: "design", description: "Bố cục biên tập kỹ thuật số lấy cảm hứng từ những mùa trong năm.", link: "https://example.com", tags: ["Editorial", "Layout"], symbol: "❋", color: "#aa7489", background: "#efe2e8" }
];

const projectGrid = document.querySelector("#project-grid");
const projectStatus = document.querySelector("#project-status");
let projects = [...sampleProjects];
let activeFilter = "all";

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

// Chuyển CSV thành object, xử lý dấu phẩy nằm trong dấu ngoặc kép.
function parseCSV(csv) {
  const rows = csv.trim().split(/\r?\n/).map((line) => {
    const cells = [];
    let cell = "";
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (character === '"' && line[index + 1] === '"' && quoted) { cell += '"'; index += 1; }
      else if (character === '"') quoted = !quoted;
      else if (character === "," && !quoted) { cells.push(cell.trim()); cell = ""; }
      else cell += character;
    }
    cells.push(cell.trim());
    return cells;
  });
  const headers = rows.shift()?.map((header) => header.toLowerCase()) ?? [];
  return rows.filter((row) => row.some(Boolean)).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

function renderProjects() {
  if (!projectGrid) return;
  const visibleProjects = projects.filter((project) => activeFilter === "all" || project.category === activeFilter);
  projectStatus.textContent = `Đang hiển thị ${visibleProjects.length} dự án`;
  if (!visibleProjects.length) {
    projectGrid.innerHTML = '<p class="project-empty">Chưa có dự án trong danh mục này.</p>';
    return;
  }
  projectGrid.innerHTML = visibleProjects.map((project) => {
    const safeLink = /^https:\/\//i.test(project.link || "") ? project.link : "https://example.com";
    const safeImage = /^(https?:\/\/|\.\.\/|\.\/)/i.test(project.image || "") ? project.image : "";
    const tags = Array.isArray(project.tags) ? project.tags : String(project.tags || "").split(/[|;]/).filter(Boolean);
    const background = /^#[\da-f]{3,8}$/i.test(project.background || project.color || "") ? (project.background || project.color) : "var(--accent-soft)";
    const color = /^#[\da-f]{3,8}$/i.test(project.color || "") ? project.color : "var(--accent)";
    const imageMarkup = safeImage ? `<img class="project-image" src="${escapeHTML(safeImage)}" alt="Ảnh dự án ${escapeHTML(project.title || "")}" loading="lazy">` : `<span class="project-symbol" aria-hidden="true">${escapeHTML(project.symbol || "✦")}</span>`;
    return `<article class="project-card"><div class="project-visual" style="--project-bg:${escapeHTML(background)};--project-color:${escapeHTML(color)}">${imageMarkup}</div><div class="project-content"><span class="project-kicker">${escapeHTML(project.category || "web")}</span><h3>${escapeHTML(project.title || "Dự án mới")}</h3><p>${escapeHTML(project.description || "")}</p><div class="project-footer"><div class="project-tags">${tags.map((tag) => `<span>${escapeHTML(tag.trim())}</span>`).join("")}</div><a class="project-link" href="${escapeHTML(safeLink)}" target="_blank" rel="noreferrer" aria-label="Xem dự án ${escapeHTML(project.title || "")}">Xem ↗</a></div></div></article>`;
  }).join("");
}

async function loadProjects() {
  if (!PROJECTS_CSV_URL) { renderProjects(); return; }
  try {
    const response = await fetch(PROJECTS_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = parseCSV(await response.text());
    if (rows.length) projects = rows.map((row) => ({ ...row, tags: row.tags || "", symbol: row.symbol || "✦" }));
  } catch (error) {
    console.warn("Không tải được dữ liệu Google Sheets, đang dùng dữ liệu mẫu.", error);
  }
  renderProjects();
}

// BÀI 6: Bộ lọc danh mục — render lại các thẻ dự án theo nút vừa chọn.
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProjects();
  });
});

// BÀI 4: Lưu lựa chọn theme trong localStorage và đổi CSS variables qua data-theme trên html.
const themeButton = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.documentElement.dataset.theme = "dark";
function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeButton.setAttribute("aria-label", isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
  themeButton.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
}
updateThemeButton();
themeButton.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  if (isDark) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = "dark";
  localStorage.setItem("portfolio-theme", isDark ? "light" : "dark");
  updateThemeButton();
});

// BÀI 3: Menu hamburger mở/đóng trên điện thoại và tự đóng sau khi chọn liên kết.
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Mở menu" : "Đóng menu");
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Mở menu");
  mainNav.classList.remove("is-open");
}));

// BÀI 6: Typewriter đổi luân phiên chức danh ở Hero.
const roleElement = document.querySelector(".typewriter");
const roles = ["nhà phát triển web", "người yêu thiết kế", "người học hỏi mỗi ngày"];
let roleIndex = 0;
let characterIndex = roles[0].length;
let deleting = false;
function typeRole() {
  const role = roles[roleIndex];
  characterIndex += deleting ? -1 : 1;
  roleElement.textContent = role.slice(0, characterIndex);
  let delay = deleting ? 45 : 85;
  if (!deleting && characterIndex === role.length) { deleting = true; delay = 1500; }
  else if (deleting && characterIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
  window.setTimeout(typeRole, delay);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) window.setTimeout(typeRole, 1800);

// BÀI 6: IntersectionObserver tạo hiệu ứng xuất hiện khi cuộn; tắt khi người dùng giảm chuyển động.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
} else document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));

// BÀI 1: Năm bản quyền tự cập nhật theo năm hiện tại.
document.querySelector("#current-year").textContent = new Date().getFullYear();
loadProjects();
