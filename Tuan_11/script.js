const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById('stop-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const name = document.getElementById('stop-name').value;
  console.log('Tên sinh viên:', name);
  document.getElementById('stop-status').textContent = 'Dữ liệu đã được ghi trong Console.';
});

const validatorForm = document.getElementById('validator-form');
const validatorUsername = document.getElementById('validator-username');
const validatorEmail = document.getElementById('validator-email');
const validatorPassword = document.getElementById('validator-password');
function showFieldError(input, messageId, message) {
  document.getElementById(messageId).textContent = message;
  input.style.borderColor = message ? '#b42318' : '#16804a';
}
validatorForm.addEventListener('submit', function (event) {
  event.preventDefault();
  showFieldError(validatorUsername, 'username-error', validatorUsername.value.trim().length < 5 ? 'Tên cần ít nhất 5 ký tự.' : '');
  showFieldError(validatorEmail, 'validator-email-error', emailPattern.test(validatorEmail.value) ? '' : 'Email chưa đúng định dạng.');
  showFieldError(validatorPassword, 'validator-password-error', validatorPassword.value.trim() ? '' : 'Mật khẩu không được để trống.');
});

document.getElementById('profile-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.currentTarget;
  const selectedInterests = [];
  form.querySelectorAll('input[name="interest"]:checked').forEach(function (input) { selectedInterests.push(input.value); });
  const selectedMode = form.querySelector('input[name="studyMode"]:checked');
  const learnerProfile = { interests: selectedInterests, studyMode: selectedMode ? selectedMode.value : '' };
  console.log(learnerProfile);
  document.getElementById('profile-output').textContent = JSON.stringify(learnerProfile, null, 2);
});

document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();
  if (event.currentTarget.checkValidity()) document.getElementById('contact-status').textContent = 'Lời nhắn đã sẵn sàng để gửi.';
});
document.getElementById('match-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const first = document.getElementById('match-password').value;
  const second = document.getElementById('confirm-password').value;
  document.getElementById('match-message').textContent = first === second ? 'Mật khẩu khớp nhau.' : 'Mật khẩu không khớp.';
});
document.getElementById('page-color').addEventListener('input', function (event) {
  document.body.style.backgroundColor = event.target.value;
});

const productCheckboxes = document.querySelectorAll('[data-price]');
function updateTotal() {
  let total = 0;
  productCheckboxes.forEach(function (checkbox) { if (checkbox.checked) total += Number(checkbox.dataset.price); });
  document.getElementById('order-total').textContent = total.toLocaleString('vi-VN') + 'đ';
}
productCheckboxes.forEach(function (checkbox) { checkbox.addEventListener('change', updateTotal); });
updateTotal();
document.getElementById('email-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const email = document.getElementById('email-check').value;
  document.getElementById('email-check-message').textContent = emailPattern.test(email) ? 'Email hợp lệ.' : 'Email chưa đúng định dạng.';
});

const terms = document.getElementById('terms');
const termsSubmit = document.getElementById('terms-submit');
terms.addEventListener('change', function () { termsSubmit.disabled = !terms.checked; });
document.getElementById('terms-form').addEventListener('submit', function (event) {
  event.preventDefault();
  document.getElementById('terms-status').textContent = 'Đã xác nhận điều khoản.';
});

const secureForm = document.getElementById('secure-form');
const studentId = document.getElementById('student-id');
const secureEmail = document.getElementById('secure-email');
const securePassword = document.getElementById('secure-password');
function validateSecureFields() {
  document.getElementById('student-id-message').textContent = studentId.value.trim() ? '' : 'Vui lòng nhập mã sinh viên.';
  document.getElementById('secure-email-message').textContent = emailPattern.test(secureEmail.value) ? '' : 'Email chưa hợp lệ.';
  document.getElementById('secure-password-message').textContent = securePassword.value.length >= 8 ? '' : 'Mật khẩu cần ít nhất 8 ký tự.';
  return studentId.value.trim() !== '' && emailPattern.test(secureEmail.value) && securePassword.value.length >= 8;
}
studentId.addEventListener('input', validateSecureFields);
secureEmail.addEventListener('input', validateSecureFields);
securePassword.addEventListener('input', validateSecureFields);
secureForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const status = document.getElementById('secure-status');
  if (!validateSecureFields()) {
    status.textContent = 'Vui lòng sửa các thông tin chưa hợp lệ.';
    return;
  }
  status.textContent = 'Đăng ký thành công.';
  window.setTimeout(function () { status.textContent = ''; }, 3000);
});
