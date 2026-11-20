const STUDENT_DATA = {
  student: {
    name: 'Nguyễn Minh Anh',
    studentId: '21A10001',
    email: 'minhanh@example.com',
    phone: '0901234567',
    semester: 'Học kỳ 1 · 2026'
  },
  subjects: [
    { code: 'WD101', name: 'Thiết kế Web', credits: 3, attendanceScore: 8.5, examScore: 8.0, grade10: 8.2, status: 'Đã đạt' },
    { code: 'PR102', name: 'Lập trình căn bản', credits: 4, attendanceScore: 7.5, examScore: 7.0, grade10: 7.2, status: 'Đã đạt' },
    { code: 'DB103', name: 'Cơ sở dữ liệu', credits: 3, attendanceScore: 6.5, examScore: 5.5, grade10: 5.9, status: 'Đã đạt' },
    { code: 'UX104', name: 'Trải nghiệm người dùng', credits: 3, attendanceScore: 9.0, examScore: 8.5, grade10: 8.7, status: 'Đã đạt' },
    { code: 'MA105', name: 'Toán ứng dụng', credits: 3, attendanceScore: 6.0, examScore: 4.5, grade10: 5.0, status: 'Đã đạt' },
    { code: 'EN106', name: 'Tiếng Anh chuyên ngành', credits: 3, attendanceScore: 8.0, examScore: 7.5, grade10: 7.7, status: 'Đã đạt' },
    { code: 'SE107', name: 'Phân tích hệ thống', credits: 3, attendanceScore: 5.0, examScore: 3.5, grade10: 4.1, status: 'Chưa đạt' },
    { code: 'CS108', name: 'Cấu trúc dữ liệu', credits: 4, attendanceScore: 7.0, examScore: 6.0, grade10: 6.4, status: 'Đã đạt' },
    { code: 'EC109', name: 'Kinh tế học đại cương', credits: 2, attendanceScore: 8.0, examScore: 8.0, grade10: 8.0, status: 'Đã đạt' },
    { code: 'PE110', name: 'Giáo dục thể chất', credits: 2, attendanceScore: 9.0, examScore: 9.0, grade10: 9.0, status: 'Đã đạt' }
  ]
};

const StudentPortalLogic = {
  calculateGpa(subjects) {
    let creditTotal = 0;
    let weightedScore = 0;
    subjects.forEach(function (subject) {
      creditTotal += subject.credits;
      weightedScore += subject.grade10 * subject.credits;
    });
    if (creditTotal === 0) return 0;
    return weightedScore / creditTotal * 0.4;
  },
  filterSubjects(subjects, query) {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') return subjects;
    return subjects.filter(function (subject) {
      return `${subject.code} ${subject.name}`.toLowerCase().includes(normalizedQuery);
    });
  },
  escapeText(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
      return entities[character];
    });
  }
};

const StudentPortalFeatures = {
  renderSubjectRows(subjects, target) {
    if (!target) return;
    target.innerHTML = subjects.map(function (subject) {
      const statusClass = subject.status === 'Đã đạt' ? 'status-passed' : 'status-failed';
      return `<tr><td>${StudentPortalLogic.escapeText(subject.code)}</td><td>${StudentPortalLogic.escapeText(subject.name)}</td><td>${subject.credits}</td><td>${subject.attendanceScore.toFixed(1)}</td><td>${subject.examScore.toFixed(1)}</td><td>${subject.grade10.toFixed(1)}</td><td class="${statusClass}">${StudentPortalLogic.escapeText(subject.status)}</td></tr>`;
    }).join('');
  },
  setupCourseSearch() {
    const input = document.getElementById('course-search');
    const results = document.getElementById('course-results');
    const count = document.getElementById('course-result-count');
    if (!input || !results) return;
    function updateResults() {
      const matches = StudentPortalLogic.filterSubjects(STUDENT_DATA.subjects, input.value);
      StudentPortalFeatures.renderSubjectRows(matches, results);
      if (count) count.innerText = `${matches.length} học phần`;
    }
    input.addEventListener('input', updateResults);
    updateResults();
  },
  setupSupportForm() {
    const form = document.getElementById('support-form');
    if (!form) return;
    const studentId = document.getElementById('student-id');
    const email = document.getElementById('support-email');
    const message = document.getElementById('support-message');
    const status = document.getElementById('support-status');
    const studentIdPattern = /^[A-Za-z0-9]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function validate(input, messageId, valid, errorText) {
      const messageElement = document.getElementById(messageId);
      input.setAttribute('aria-invalid', String(!valid));
      messageElement.innerText = valid ? '' : errorText;
      return valid;
    }
    studentId.addEventListener('input', function () {
      validate(studentId, 'student-id-error', studentIdPattern.test(studentId.value.trim()), 'Mã sinh viên chỉ dùng ký tự chữ và số.');
    });
    email.addEventListener('input', function () {
      validate(email, 'support-email-error', emailPattern.test(email.value.trim()), 'Vui lòng nhập email hợp lệ.');
    });
    message.addEventListener('input', function () {
      validate(message, 'support-message-error', message.value.trim() !== '', 'Vui lòng nhập nội dung cần hỗ trợ.');
    });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const validId = validate(studentId, 'student-id-error', studentIdPattern.test(studentId.value.trim()), 'Mã sinh viên chỉ dùng ký tự chữ và số.');
      const validEmail = validate(email, 'support-email-error', emailPattern.test(email.value.trim()), 'Vui lòng nhập email hợp lệ.');
      const validMessage = validate(message, 'support-message-error', message.value.trim() !== '', 'Vui lòng nhập nội dung cần hỗ trợ.');
      if (validId && validEmail && validMessage) {
        status.innerText = 'Yêu cầu hỗ trợ đã được ghi nhận trong phiên này.';
        form.reset();
      } else {
        status.innerText = 'Vui lòng kiểm tra lại các trường thông tin.';
      }
    });
  },
  setupProfileForm() {
    const form = document.getElementById('profile-form');
    if (!form) return;
    const name = document.getElementById('full-name');
    const studentId = document.getElementById('student-code');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const status = document.getElementById('profile-status');
    const nameDisplay = document.getElementById('profile-name-display');
    const idDisplay = document.getElementById('profile-id-display');
    const emailDisplay = document.getElementById('profile-email-display');
    const phoneDisplay = document.getElementById('profile-phone-display');
    name.value = STUDENT_DATA.student.name;
    studentId.value = STUDENT_DATA.student.studentId;
    email.value = STUDENT_DATA.student.email;
    phone.value = STUDENT_DATA.student.phone;
    nameDisplay.innerText = name.value;
    idDisplay.innerText = studentId.value;
    emailDisplay.innerText = email.value;
    phoneDisplay.innerText = phone.value;
    const studentIdPattern = /^[A-Za-z0-9]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+() .-]{8,18}$/;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const checks = [
        [name, 'profile-name-error', name.value.trim() !== '', 'Vui lòng nhập họ tên.'],
        [studentId, 'profile-id-error', studentIdPattern.test(studentId.value.trim()), 'Mã sinh viên chỉ dùng ký tự chữ và số.'],
        [email, 'profile-email-error', emailPattern.test(email.value.trim()), 'Vui lòng nhập email hợp lệ.'],
        [phone, 'profile-phone-error', phone.value.trim() === '' || phonePattern.test(phone.value.trim()), 'Số điện thoại chưa đúng định dạng.']
      ];
      let isValid = true;
      checks.forEach(function (check) {
        const input = check[0];
        const errorId = check[1];
        const valid = check[2];
        const errorMessage = check[3];
        input.setAttribute('aria-invalid', String(!valid));
        document.getElementById(errorId).innerText = valid ? '' : errorMessage;
        if (!valid) isValid = false;
      });
      if (isValid) {
        STUDENT_DATA.student.name = name.value.trim();
        STUDENT_DATA.student.studentId = studentId.value.trim();
        STUDENT_DATA.student.email = email.value.trim();
        STUDENT_DATA.student.phone = phone.value.trim();
        nameDisplay.innerText = STUDENT_DATA.student.name;
        idDisplay.innerText = STUDENT_DATA.student.studentId;
        emailDisplay.innerText = STUDENT_DATA.student.email;
        phoneDisplay.innerText = STUDENT_DATA.student.phone;
        status.innerText = 'Thông tin đã được cập nhật trong phiên này.';
      } else {
        status.innerText = 'Vui lòng kiểm tra lại thông tin.';
      }
    });
  }
};

function renderDashboard() {
  const gpa = StudentPortalLogic.calculateGpa(STUDENT_DATA.subjects);
  const gpaValue = document.getElementById('gpa-value');
  const courseCount = document.getElementById('course-count');
  const creditCount = document.getElementById('credit-count');
  const warning = document.getElementById('study-warning');
  const dashboardRows = document.getElementById('dashboard-courses');
  if (gpaValue) gpaValue.innerText = gpa.toFixed(2);
  if (courseCount) courseCount.innerText = String(STUDENT_DATA.subjects.length);
  let totalCredits = 0;
  STUDENT_DATA.subjects.forEach(function (subject) { totalCredits += subject.credits; });
  if (creditCount) creditCount.innerText = String(totalCredits);
  if (warning && gpa < 2) {
    warning.hidden = false;
    warning.innerText = 'Cảnh báo học vụ: GPA hiện tại thấp hơn 2.0.';
  }
  StudentPortalFeatures.renderSubjectRows(STUDENT_DATA.subjects, dashboardRows);
}

function initializeStudentPortal() {
  renderDashboard();
  StudentPortalFeatures.setupCourseSearch();
  StudentPortalFeatures.setupSupportForm();
  StudentPortalFeatures.setupProfileForm();
}

initializeStudentPortal();

