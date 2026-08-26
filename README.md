# 🚀 Web Design Studio (WebCraft Studio)

> **WebCraft Studio** là một nền tảng thiết kế trang web hiện đại, trực quan (No-Code / Low-Code) giúp các nhà thiết kế, nhà phát triển và doanh nghiệp dễ dàng kéo-thả, tùy chỉnh và xuất bản các giao diện web chuyên nghiệp một cách nhanh chóng.

---

## 📋 Mục Lục

- [Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Hướng Dẫn Cài Đặt](#-hướng-dẫn-cài-đặt)
- [Hướng Dẫn Sử Dụng](#-hướng-dẫn-sử-dụng)
- [Quy Trình Đóng Góp (Contributing)](#-quy-trình-đóng-góp-contributing)
- [Giấy Phép (License)](#-giấy-phép-license)
- [Liên Hệ](#-liên-hệ)

---

## ✨ Tính Năng Nổi Bật

- 🎨 **Trình chỉnh sửa Kéo-Thả (Drag & Drop Builder):** Thao tác kéo thả các block giao diện trực quan, linh hoạt.
- 📱 **Responsive Preview:** Xem trước giao diện hiển thị trên nhiều kích thước màn hình (Desktop, Tablet, Mobile) theo thời gian thực.
- 🎨 **Hệ thống Theme & Styling:** Dễ dàng tùy chỉnh màu sắc, typography, spacing, border và hiệu ứng CSS.
- 📦 **Kho Template Phong Phú:** Cung cấp sẵn hàng chục mẫu trang (Landing page, Portfolio, Blog, E-commerce).
- ⚡ **Xuất Mã Nguồn (Code Export):** Xuất giao diện ra mã nguồn HTML/CSS/JS sạch, tối ưu SEO hoặc export ra React/Vue components.
- 🤝 **Cộng Tác Thời Gian Thực (Real-time Collaboration):** Cho phép nhiều thành viên cùng thiết kế và bình luận trên một project.

---

## 🛠 Công Nghệ Sử Dụng

### Frontend
- **Framework:** Next.js (React) / TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **State Management:** Zustand / Redux Toolkit
- **Drag & Drop Engine:** @dnd-kit / GrapesJS / Craft.js

### Backend
- **Runtime:** Node.js / Express hoặc Next.js API Routes
- **Database:** PostgreSQL / MongoDB (Prisma ORM)
- **Authentication:** NextAuth.js / Supabase Auth

---

## 📂 Cấu Trúc Thư Mục

```text
webcraft-studio/
├── public/                 # Các tệp tĩnh (images, icons, fonts)
├── src/
│   ├── assets/            # CSS toàn cục, hình ảnh dùng trong app
│   ├── components/        # Các React Components
│   │   ├── builder/       # Trình chỉnh sửa kéo thả (Canvas, Sidebar, Toolbar)
│   │   ├── ui/            # UI components cơ bản (Button, Modal, Input...)
│   │   └── common/        # Navbar, Footer, Header
│   ├── config/            # Cấu hình ứng dụng, constants
│   ├── hooks/             # Custom React Hooks
│   ├── lib/               # Các thư viện hỗ trợ (Prisma, Utils...)
│   ├── services/          # Gọi API / HTTP Client
│   ├── store/             # Quản lý state toàn cục (Zustand/Redux)
│   ├── types/             # Định nghĩa Type / Interface (TypeScript)
│   └── app/               # Next.js App Router (Pages, Layouts)
├── .env.example           # Tệp mẫu cấu hình biến môi trường
├── .eslintrc.json         # Cấu hình ESLint
├── .prettierrc            # Cấu hình Prettier
├── package.json           # Danh sách dependencies & scripts
└── README.md              # Tài liệu dự án
