/* THÀNH VIÊN 3: giỏ môn học, tổng tín chỉ realtime và giới hạn 25. */
(() => {
  'use strict';
  const LIMIT = 25;
  const list = document.querySelector('#course-list');
  const cartBody = document.querySelector('#cart-items');
  const totalNodes = [document.querySelector('#cart-total'), document.querySelector('#credit-total')];
  const countNode = document.querySelector('#cart-count');
  const badgeNode = document.querySelector('#cart-badge');
  const messageNode = document.querySelector('#cart-message');
  const hintNode = document.querySelector('#credit-hint');
  const progressNode = document.querySelector('#credit-progress');
  const clearButton = document.querySelector('#clear-cart');
  if (!list || !cartBody) return;

  const selected = new Map();
  const courses = [...list.querySelectorAll('.course-card')];
  const formatCount = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;

  function render() {
    const credits = [...selected.values()].reduce((sum, course) => sum + course.credits, 0);
    const count = selected.size;
    totalNodes.forEach(node => { if (node) node.textContent = String(credits); });
    if (countNode) countNode.textContent = String(count);
    if (badgeNode) badgeNode.textContent = formatCount(count, 'môn', 'môn');
    if (progressNode) progressNode.style.width = `${Math.min((credits / LIMIT) * 100, 100)}%`;
    if (clearButton) clearButton.disabled = count === 0;
    const overLimit = credits >= LIMIT;
    [messageNode, hintNode].forEach(node => {
      if (!node) return;
      node.classList.toggle('is-warning', overLimit);
      node.textContent = overLimit ? `Đã đạt giới hạn ${LIMIT} tín chỉ.` : `Bạn có thể đăng ký tối đa ${LIMIT} tín chỉ.`;
    });
    cartBody.replaceChildren();
    if (count === 0) {
      const row = document.createElement('tr');
      row.className = 'cart-empty-row';
      const cell = document.createElement('td');
      cell.colSpan = 3;
      cell.append('Danh sách đang trống.');
      const detail = document.createElement('span');
      detail.append('Thêm môn học để bắt đầu kế hoạch.');
      cell.append(document.createElement('br'), detail);
      row.append(cell);
      cartBody.append(row);
    } else {
      selected.forEach(course => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const name = document.createElement('span');
        name.className = 'cart-course-name';
        name.textContent = course.name;
        const code = document.createElement('span');
        code.className = 'cart-course-code';
        code.textContent = course.code;
        nameCell.append(name, code);
        const creditCell = document.createElement('td');
        creditCell.textContent = String(course.credits);
        const actionCell = document.createElement('td');
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'button button-remove';
        remove.dataset.removeCourse = course.id;
        remove.setAttribute('aria-label', `Xóa ${course.name} khỏi danh sách`);
        remove.textContent = 'Xóa';
        actionCell.append(remove);
        row.append(nameCell, creditCell, actionCell);
        cartBody.append(row);
      });
    }
    courses.forEach(card => {
      const isSelected = selected.has(card.dataset.courseId);
      const button = card.querySelector('[data-add-course]');
      card.classList.toggle('is-selected', isSelected);
      if (button) {
        button.disabled = isSelected;
        button.textContent = isSelected ? '✓ Đã thêm' : '+ Thêm môn';
      }
    });
  }

  list.addEventListener('click', event => {
    const button = event.target.closest('[data-add-course]');
    if (!button) return;
    const card = button.closest('.course-card');
    if (!card || selected.has(card.dataset.courseId)) return;
    const credits = Number(card.dataset.credits);
    const currentCredits = [...selected.values()].reduce((sum, course) => sum + course.credits, 0);
    if (!Number.isFinite(credits) || credits <= 0) return;
    if (currentCredits + credits > LIMIT) {
      if (messageNode) {
        messageNode.textContent = `Không thể thêm môn này: tổng tín chỉ sẽ vượt quá ${LIMIT}.`;
        messageNode.classList.add('is-warning');
      }
      if (hintNode) {
        hintNode.textContent = `Môn học này sẽ vượt quá giới hạn ${LIMIT} tín chỉ.`;
        hintNode.classList.add('is-warning');
      }
      return;
    }
    selected.set(card.dataset.courseId, { id: card.dataset.courseId, code: card.dataset.code, name: card.dataset.name, credits });
    render();
  });

  cartBody.addEventListener('click', event => {
    const button = event.target.closest('[data-remove-course]');
    if (!button) return;
    selected.delete(button.dataset.removeCourse);
    render();
  });
  clearButton?.addEventListener('click', () => { selected.clear(); render(); });
  render();
})();
