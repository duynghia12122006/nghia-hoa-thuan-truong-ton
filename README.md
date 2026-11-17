# Smart Enrollment — Cổng đăng ký môn học thông minh

Bộ khung frontend thuần HTML, CSS và JavaScript cho bài tập học phần. Không cần cài package hoặc chạy build: mở `index.html` trên trình duyệt là dùng được.

## Chia việc trong nhóm

| Người phụ trách | File | Phạm vi |
| --- | --- | --- |
| Leader | `css/base.css` | Màu sắc, font, token và bố cục dùng chung |
| Thành viên 1 | `css/header-search.css`, `js/search.js` | Header, form tìm kiếm, lọc môn |
| Thành viên 2 | `css/course-list.css` | Thẻ môn học và hiệu ứng hover |
| Thành viên 3 | `css/cart-table.css`, `js/cart.js` | Bảng giỏ, responsive, thêm/xóa và giới hạn tín chỉ |
| Cả nhóm | `index.html` | Cấu trúc trang, nội dung và dữ liệu môn học mẫu |

## Cấu trúc

```text
smart-enrollment/
├── index.html
├── README.md
├── css/
│   ├── base.css
│   ├── header-search.css
│   ├── course-list.css
│   └── cart-table.css
└── js/
    ├── search.js
    └── cart.js
```

## Quy ước khi cùng code

- Mỗi thành viên bắt đầu từ file được phân công trong bảng trên; các file đã được nối sẵn trong `index.html`.
- `data-course-id`, `data-code`, `data-name` và `data-credits` trên mỗi `.course-card` là dữ liệu đầu vào cho giỏ hàng. Giữ nguyên tên thuộc tính; `data-credits` phải là số.
- Có thể thêm môn mẫu bằng cách sao chép một `<article class="course-card">` trong `index.html`, đặt `data-course-id` duy nhất và cập nhật dữ liệu cùng nội dung hiển thị.
- Giữ selector/khu vực của thành viên khác tách biệt để tránh xung đột khi merge. Dùng nhánh riêng và pull request khi làm nhóm.
- Giới hạn tín chỉ hiện đặt tại `LIMIT` đầu `js/cart.js` (25).

## Tính năng mẫu

- Tìm kiếm theo mã, tên hoặc nhóm môn; lọc theo 2, 3 hoặc 4 tín chỉ.
- Thêm/xóa từng môn, xóa toàn bộ, cập nhật tổng tín chỉ tức thời.
- Chặn thêm môn nếu tổng vượt 25 tín chỉ; bố cục thích ứng với màn hình nhỏ.
