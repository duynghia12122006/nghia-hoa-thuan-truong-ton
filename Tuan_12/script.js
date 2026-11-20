const products = [
  { id: 1, name: 'Sổ tay LHU', category: 'stationery', price: 120000 },
  { id: 2, name: 'Bút máy', category: 'stationery', price: 85000 },
  { id: 3, name: 'Balo sinh viên', category: 'accessory', price: 420000 },
  { id: 4, name: 'Bình nước', category: 'accessory', price: 175000 },
  { id: 5, name: 'HTML & CSS căn bản', category: 'book', price: 180000 },
  { id: 6, name: 'Thẻ ghi nhớ', category: 'stationery', price: 45000 }
];
const selectedProductIds = [];
const productList = document.getElementById('product-list');

function renderProducts() {
  const query = document.getElementById('catalog-search').value.toLowerCase().trim();
  const category = document.getElementById('category-filter').value;
  const sortOrder = document.getElementById('sort-order').value;
  const visibleProducts = products.filter(function (product) {
    const matchesText = product.name.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || product.category === category;
    return matchesText && matchesCategory;
  });
  if (sortOrder === 'price-asc') visibleProducts.sort(function (a, b) { return a.price - b.price; });
  else if (sortOrder === 'price-desc') visibleProducts.sort(function (a, b) { return b.price - a.price; });
  else visibleProducts.sort(function (a, b) { return a.name.localeCompare(b.name, 'vi'); });

  productList.textContent = '';
  visibleProducts.forEach(function (product) {
    const card = document.createElement('article');
    const title = document.createElement('h3');
    const price = document.createElement('p');
    const categoryText = document.createElement('p');
    const cartLabel = document.createElement('label');
    const cartCheckbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    card.className = 'product-card';
    title.textContent = product.name;
    price.textContent = product.price.toLocaleString('vi-VN') + 'đ';
    categoryText.textContent = 'Nhóm: ' + product.category;
    cartCheckbox.type = 'checkbox';
    cartCheckbox.checked = selectedProductIds.includes(product.id);
    cartCheckbox.addEventListener('change', function () {
      if (cartCheckbox.checked && !selectedProductIds.includes(product.id)) selectedProductIds.push(product.id);
      else if (!cartCheckbox.checked) {
        const index = selectedProductIds.indexOf(product.id);
        if (index >= 0) selectedProductIds.splice(index, 1);
      }
      updateCartTotal();
    });
    cartLabel.appendChild(cartCheckbox);
    cartLabel.appendChild(document.createTextNode(' Thêm vào giỏ'));
    deleteButton.type = 'button';
    deleteButton.textContent = 'Xóa mặt hàng';
    deleteButton.addEventListener('click', function () {
      const productIndex = products.findIndex(function (item) { return item.id === product.id; });
      if (productIndex >= 0) products.splice(productIndex, 1);
      const cartIndex = selectedProductIds.indexOf(product.id);
      if (cartIndex >= 0) selectedProductIds.splice(cartIndex, 1);
      renderProducts();
      updateCartTotal();
    });
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(categoryText);
    card.appendChild(cartLabel);
    card.appendChild(deleteButton);
    productList.appendChild(card);
  });
  document.getElementById('catalog-count').textContent = 'Đang hiển thị ' + visibleProducts.length + ' mặt hàng.';
}

function updateCartTotal() {
  let total = 0;
  selectedProductIds.forEach(function (id) {
    const product = products.find(function (item) { return item.id === id; });
    if (product) total += product.price;
  });
  document.getElementById('cart-total').textContent = total.toLocaleString('vi-VN') + 'đ';
}
['catalog-search', 'category-filter', 'sort-order'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', renderProducts);
  document.getElementById(id).addEventListener('change', renderProducts);
});
renderProducts();

const contacts = [
  { name: 'Minh Anh', phone: '0901001001' },
  { name: 'Quốc Bảo', phone: '0902002002' },
  { name: 'Gia Hân', phone: '0903003003' },
  { name: 'Tuấn Kiệt', phone: '0904004004' }
];
function renderDirectory() {
  const query = document.getElementById('directory-search').value.toLowerCase().trim();
  const matches = contacts.filter(function (contact) {
    return contact.name.toLowerCase().includes(query) || contact.phone.includes(query);
  });
  document.getElementById('directory-list').innerHTML = matches.map(function (contact) {
    return '<li>' + contact.name + ' · ' + contact.phone + '</li>';
  }).join('');
}
document.getElementById('directory-search').addEventListener('input', renderDirectory);
renderDirectory();

const students = [
  { name: 'An', score: 8.5 },
  { name: 'Bình', score: 6.5 },
  { name: 'Chi', score: 4.5 },
  { name: 'Dũng', score: 7.5 }
];
document.getElementById('student-results').innerHTML = students.map(function (student) {
  return '<li>' + student.name + ': ' + student.score + ' điểm — ' + (student.score >= 5 ? 'Đạt' : 'Chưa đạt') + '</li>';
}).join('');

const names = ['Minh Anh', 'Quốc Bảo', 'Gia Hân', 'Tuấn Kiệt'];
document.getElementById('name-list').innerHTML = names.map(function (name) { return '<li>' + name + '</li>'; }).join('');

const originalProduct = products[0];
const sameReference = originalProduct;
const copiedProduct = { id: originalProduct.id, name: originalProduct.name, category: originalProduct.category, price: originalProduct.price };
document.getElementById('identity-result').textContent = 'Gán cùng đối tượng: originalProduct === sameReference là ' + (originalProduct === sameReference) + '. Tạo bản sao riêng: originalProduct === copiedProduct là ' + (originalProduct === copiedProduct) + '.';
