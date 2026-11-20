function tinhDienTich(dai, rong) {
  return dai * rong;
}

function calculateTax(income, taxRatePercent) {
  return income * taxRatePercent / 100;
}

function sumTo(number) {
  let total = 0;
  for (let current = 1; current <= number; current += 1) total += current;
  return total;
}

function isPrime(number) {
  if (number < 2) return false;
  for (let divisor = 2; divisor < number; divisor += 1) {
    if (number % divisor === 0) return false;
  }
  return true;
}

function calculate(first, second, operation) {
  if (operation === '+') return first + second;
  if (operation === '-') return first - second;
  if (operation === '*') return first * second;
  if (operation === '/') return second === 0 ? 'Không thể chia cho 0.' : first / second;
  return 'Phép tính không hợp lệ.';
}

function timMax(a, b, c) {
  let maximum = a;
  if (b > maximum) maximum = b;
  if (c > maximum) maximum = c;
  return maximum;
}

function onSubmit(formId, callback) {
  document.getElementById(formId).addEventListener('submit', function (event) {
    event.preventDefault();
    callback();
  });
}

document.getElementById('count-button').addEventListener('click', function () {
  const numbers = [];
  const evenNumbers = [];
  for (let number = 1; number <= 100; number += 1) {
    numbers.push(number);
    if (number % 2 === 0) evenNumbers.push(number);
  }
  document.getElementById('count-result').textContent = numbers.join(', ');
  document.getElementById('even-result').textContent = evenNumbers.join(', ');
});

document.getElementById('area-results').textContent = '4 × 3 = ' + tinhDienTich(4, 3) + '; 8 × 5 = ' + tinhDienTich(8, 5) + '; 12 × 7 = ' + tinhDienTich(12, 7) + '.';

onSubmit('tax-form', function () {
  const income = Number(document.getElementById('income').value);
  const rate = Number(document.getElementById('tax-rate').value);
  document.getElementById('tax-result').textContent = 'Thuế theo mức ' + rate + '%: ' + calculateTax(income, rate).toLocaleString('vi-VN');
});

const table = document.getElementById('times-table');
for (let number = 1; number <= 10; number += 1) {
  const item = document.createElement('li');
  item.textContent = '7 × ' + number + ' = ' + (7 * number);
  table.appendChild(item);
}

onSubmit('sum-form', function () {
  const number = Number(document.getElementById('sum-n').value);
  document.getElementById('sum-result').textContent = 'Tổng từ 1 đến ' + number + ' là ' + sumTo(number) + '.';
});

onSubmit('prime-form', function () {
  const number = Number(document.getElementById('prime-number').value);
  document.getElementById('prime-result').textContent = isPrime(number) ? number + ' là số nguyên tố.' : number + ' không phải số nguyên tố.';
});

onSubmit('calculator-form', function () {
  const first = Number(document.getElementById('first-number').value);
  const second = Number(document.getElementById('second-number').value);
  const operation = document.getElementById('operation').value;
  document.getElementById('calculator-result').textContent = 'Kết quả: ' + calculate(first, second, operation);
});

onSubmit('max-form', function () {
  const first = Number(document.getElementById('max-a').value);
  const second = Number(document.getElementById('max-b').value);
  const third = Number(document.getElementById('max-c').value);
  document.getElementById('max-result').textContent = 'Số lớn nhất là ' + timMax(first, second, third) + '.';
});

const members = ['Minh Anh', 'Quốc Bảo', 'Gia Hân', 'Tuấn Kiệt', 'Thảo Vy'];
const greetings = document.getElementById('greetings');
for (let index = 0; index < members.length; index += 1) {
  const item = document.createElement('li');
  item.textContent = 'Xin chào ' + members[index] + '!';
  greetings.appendChild(item);
}

const services = [
  { name: 'Tư vấn học vụ', description: 'Tìm hiểu quy định và kế hoạch học tập.' },
  { name: 'Thư viện', description: 'Tra cứu tài nguyên phục vụ học tập.' },
  { name: 'Hỗ trợ sinh viên', description: 'Kết nối với dịch vụ hỗ trợ tại trường.' }
];
let serviceMarkup = '';
for (let index = 0; index < services.length; index += 1) {
  serviceMarkup += '<article><h3>' + services[index].name + '</h3><p>' + services[index].description + '</p></article>';
}
document.getElementById('service-list').innerHTML = serviceMarkup;
