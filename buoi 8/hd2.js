
let diem = Number(prompt("Nhập điểm của bạn:"));

if (isNaN(diem) || diem < 0 || diem > 10) {
    alert("Điểm không hợp lệ! Vui lòng nhập điểm từ 0 đến 10.");
} else if (diem > 8) {
    alert("Xếp loại: Giỏi");
} else if (diem > 6.5) {
    alert("Xếp loại: Khá");
} else if (diem >= 5) {
    alert("Xếp loại: Trung bình");
} else {
    alert("Xếp loại: Yếu");
}
