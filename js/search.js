/* THÀNH VIÊN 1: tìm theo mã/tên môn và lọc theo số tín chỉ. */
(() => {
  'use strict';
  const form = document.querySelector('#search-form');
  const queryInput = document.querySelector('#course-search');
  const creditFilter = document.querySelector('#credit-filter');
  const list = document.querySelector('#course-list');
  const empty = document.querySelector('#empty-results');
  const count = document.querySelector('#result-count');
  if (!form || !queryInput || !creditFilter || !list) return;
  const cards = [...list.querySelectorAll('.course-card')];
  const normalize = value => value.trim().toLocaleLowerCase('vi');
  function filterCourses() {
    const query = normalize(queryInput.value);
    const credits = creditFilter.value;
    let visible = 0;
    cards.forEach(card => {
      const searchable = normalize(`${card.dataset.code} ${card.dataset.name} ${card.dataset.category}`);
      const matches = searchable.includes(query) && (!credits || card.dataset.credits === credits);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    if (empty) empty.hidden = visible !== 0;
    if (count) count.textContent = `${visible} môn học`;
  }
  form.addEventListener('submit', event => { event.preventDefault(); filterCourses(); });
  queryInput.addEventListener('input', filterCourses);
  creditFilter.addEventListener('change', filterCourses);
  filterCourses();
})();
