function showResult(id, message) {
  document.getElementById(id).textContent = message;
}

const gradeForm = document.getElementById('grade-form');
gradeForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const score = Number(document.getElementById('score').value);
  let rank;
  if (score >= 8) rank = 'Giỏi';
  else if (score >= 6.5) rank = 'Khá';
  else if (score >= 5) rank = 'Trung bình';
  else rank = 'Yếu';
  showResult('grade-result', 'Xếp loại: ' + rank);
});

document.getElementById('currency-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const usd = Number(document.getElementById('usd').value);
  showResult('currency-result', usd + ' USD = ' + (usd * 25000).toLocaleString('vi-VN') + ' VND');
});

document.getElementById('even-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const number = Number(document.getElementById('even-number').value);
  showResult('even-result', number % 2 === 0 ? number + ' là số chẵn.' : number + ' là số lẻ.');
});

document.getElementById('bmi-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const height = Number(document.getElementById('height').value);
  const weight = Number(document.getElementById('weight').value);
  showResult('bmi-result', 'Chỉ số BMI của bạn là ' + (weight / (height * height)).toFixed(1) + '.');
});

document.getElementById('login-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === 'student' && password === 'lhu2026') showResult('login-result', 'Đăng nhập thành công.');
  else showResult('login-result', 'Thông tin không chính xác.');
});

document.getElementById('discount-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const total = Number(document.getElementById('total').value);
  let finalTotal = total;
  if (total > 500000) finalTotal = total * 0.9;
  showResult('discount-result', 'Số tiền cần thanh toán: ' + finalTotal.toLocaleString('vi-VN') + 'đ');
});

document.getElementById('triangle-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const sideA = Number(document.getElementById('side-a').value);
  const sideB = Number(document.getElementById('side-b').value);
  const sideC = Number(document.getElementById('side-c').value);
  if (sideA > 0 && sideA === sideB && sideB === sideC) showResult('triangle-result', 'Ba cạnh bằng nhau: đây là tam giác đều.');
  else showResult('triangle-result', 'Ba cạnh không tạo thành tam giác đều.');
});

const hour = new Date().getHours();
let greeting;
if (hour < 12) greeting = 'Chào buổi sáng!';
else if (hour < 18) greeting = 'Chào buổi chiều!';
else greeting = 'Chào buổi tối!';
showResult('greeting', greeting);
