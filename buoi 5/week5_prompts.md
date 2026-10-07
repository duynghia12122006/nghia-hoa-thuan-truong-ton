# Week 5 — Prompt Log

Các prompt đã dùng để xây dựng và tinh chỉnh hiệu ứng cho Portfolio:

1. **Nút gửi tin nhắn / micro-interaction**

   > Viết CSS transition cho nút gửi tin nhắn: hover nâng lên 3px, đổi màu nền, tăng box-shadow; dùng cubic-bezier để chuyển động tự nhiên. Khi active, thu nhỏ bằng scale(0.95). Chỉ animate transform, màu và shadow; giữ trạng thái focus dễ nhận biết.

2. **Loading spinner**

   > Tạo spinner CSS hình tròn có border-top khác màu, quay 360 độ vô hạn bằng @keyframes với timing linear. Kích thước nhỏ, phù hợp đặt cạnh nội dung trạng thái tải và có nhãn hỗ trợ screen reader.

3. **AOS scroll reveal và Animate.css**

   > Hướng dẫn tích hợp AOS 2.3.1 và Animate.css 4.1.1 bằng CDN vào portfolio HTML. Dùng data-aos="fade-up" cho các section, cấu hình chạy một lần, và tôn trọng prefers-reduced-motion.

4. **Tối ưu hiệu năng**

   > Refactor chuyển động hover từ thay đổi top/left sang transform: translate(...), và dùng opacity/transform cho các hiệu ứng xuất hiện. Tránh animate thuộc tính gây layout; kiểm tra trải nghiệm trên màn hình nhỏ.

5. **Nút liên hệ nổi**

   > Tạo floating action button liên hệ có pulse ring tinh tế bằng keyframes; thêm hover scale nhỏ, nhãn aria rõ ràng, và tắt chuyển động lặp khi người dùng bật prefers-reduced-motion.

6. **Thẻ flip**

   > Tạo card flip 3D dùng perspective và rotateY(180deg), với mặt sau hiển thị thông tin liên hệ. Hỗ trợ cả hover và keyboard focus, dùng backface-visibility để ẩn mặt phía sau.

7. **Hiệu ứng gõ chữ**

   > Tạo typing effect CSS thuần cho dòng “Tôi là một Web Developer...” bằng steps(), overflow hidden và caret. Đảm bảo dòng chữ vẫn đọc được khi giảm chuyển động và không tràn màn hình di động.

8. **Parallax**

   > Tạo banner parallax nền bằng background-attachment: fixed trên thiết bị hỗ trợ, có nền gradient thay cho ảnh ngoài; tắt fixed attachment trên màn hình nhỏ để tránh lỗi cuộn mobile.

9. **Menu hamburger**

   > Biến ba gạch hamburger thành dấu X khi menu mobile mở bằng CSS transitions trên transform/opacity. Dùng nút semantic với aria-expanded và cho phép đóng menu sau khi chọn liên kết.

10. **Skill bars**

    > Animate các skill bar từ 0 đến phần trăm đích khi cuộn tới bằng IntersectionObserver. Dùng scaleX với transform-origin: left thay vì animate width, và cung cấp fallback nếu trình duyệt không hỗ trợ observer.
