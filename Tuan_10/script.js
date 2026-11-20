const menuItems = document.querySelectorAll('#student-menu li');
document.getElementById('highlight-menu').addEventListener('click', function () {
  for (let index = 0; index < menuItems.length; index += 1) menuItems[index].style.color = '#315fba';
});

const lamp = document.getElementById('lamp');
const lampButton = document.getElementById('lamp-switch');
let lampIsOn = false;
function drawLamp(isOn) {
  const color = isOn ? '#f5b700' : '#8b9299';
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><path fill="' + color + '" d="M48 8a27 27 0 0 0-16 49v12h32V57A27 27 0 0 0 48 8Z"/><path fill="#333" d="M34 73h28v7H34zm5 11h18v6H39z"/><path fill="none" stroke="#333" stroke-width="3" d="M38 58h20"/></svg>';
  lamp.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
  lamp.alt = isOn ? 'Bóng đèn đang bật' : 'Bóng đèn đang tắt';
}
drawLamp(lampIsOn);
lampButton.addEventListener('click', function () {
  lampIsOn = !lampIsOn;
  drawLamp(lampIsOn);
  lampButton.textContent = lampIsOn ? 'Tắt đèn' : 'Bật đèn';
});

document.getElementById('live-input').addEventListener('input', function (event) {
  document.getElementById('live-output').textContent = event.target.value || 'Nội dung sẽ xuất hiện ở đây.';
});
document.getElementById('greeting-form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('personal-greeting').textContent = 'Xin chào, ' + document.getElementById('visitor-name').value + '!';
});

const galleryImage = document.getElementById('gallery-image');
const galleryCaption = document.getElementById('gallery-caption');
let galleryIndex = 0;
function drawGallery() {
  let title;
  let background;
  if (galleryIndex === 0) { title = 'Bình minh'; background = '#f7c873'; }
  else if (galleryIndex === 1) { title = 'Bầu trời'; background = '#76bde0'; }
  else { title = 'Hoàng hôn'; background = '#d891b4'; }
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"><rect width="320" height="160" fill="' + background + '"/><circle cx="160" cy="75" r="36" fill="#fff4bd"/><path d="M0 130Q80 85 160 130T320 125v35H0Z" fill="#398774"/><text x="160" y="152" text-anchor="middle" font-size="18" fill="#123">' + title + '</text></svg>';
  galleryImage.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
  galleryImage.alt = 'Cảnh minh họa: ' + title;
  galleryCaption.textContent = 'Ảnh ' + (galleryIndex + 1) + ' / 3: ' + title;
}
document.getElementById('previous-image').addEventListener('click', function () {
  galleryIndex -= 1;
  if (galleryIndex < 0) galleryIndex = 2;
  drawGallery();
});
document.getElementById('next-image').addEventListener('click', function () {
  galleryIndex += 1;
  if (galleryIndex > 2) galleryIndex = 0;
  drawGallery();
});
drawGallery();

document.getElementById('todo-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const input = document.getElementById('todo-input');
  const item = document.createElement('li');
  const label = document.createElement('span');
  const removeButton = document.createElement('button');
  label.textContent = input.value + ' ';
  removeButton.type = 'button';
  removeButton.textContent = 'Xóa';
  removeButton.addEventListener('click', function () { item.remove(); });
  item.appendChild(label);
  item.appendChild(removeButton);
  document.getElementById('todo-list').appendChild(item);
  input.value = '';
});

document.getElementById('password-length').addEventListener('input', function (event) {
  document.getElementById('length-output').textContent = 'Độ dài: ' + event.target.value.length + ' ký tự.';
});
let fontSize = 16;
const resizableText = document.getElementById('resizable-text');
document.getElementById('smaller-text').addEventListener('click', function () {
  fontSize -= 2;
  if (fontSize < 10) fontSize = 10;
  resizableText.style.fontSize = fontSize + 'px';
});
document.getElementById('larger-text').addEventListener('click', function () {
  fontSize += 2;
  resizableText.style.fontSize = fontSize + 'px';
});
document.getElementById('toggle-password').addEventListener('click', function (event) {
  const field = document.getElementById('visible-password');
  field.type = field.type === 'password' ? 'text' : 'password';
  event.target.textContent = field.type === 'password' ? 'Hiện mật khẩu' : 'Ẩn mật khẩu';
});

const modal = document.getElementById('registration-modal');
document.getElementById('open-modal').addEventListener('click', function () { modal.hidden = false; });
document.getElementById('close-modal').addEventListener('click', function () { modal.hidden = true; });
document.getElementById('registration-form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('form-status').textContent = 'Thông tin đã được ghi nhận.';
});
