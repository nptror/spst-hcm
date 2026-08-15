# Kế hoạch thiết kế lại Database Schema và UI cho Hệ thống Tính điểm Mới

Dựa trên thực trạng hệ thống hiện tại (chỉ mới có giao diện, thiếu toàn bộ logic lưu trữ và xử lý điểm số), dưới đây là kế hoạch chi tiết để hoàn thiện Game theo đúng cơ chế Quản lý Tài nguyên và Hệ thống Đặc điểm.

## 1. Vấn đề Hiện tại của Hệ thống
1. **Chưa tính điểm theo cơ chế mới:** Mã nguồn `Challenge.jsx` mới đếm số câu trả lời đúng (Best Choice). Các lựa chọn chưa có dữ liệu `impact` để tính % Cần/Kiệm/Liêm/Chính hay Năng lượng/Tài chính.
2. **Chưa lưu LocalStorage cho kết quả:** Mới chỉ lưu `student_name`. Trạng thái trò chơi (tiến độ, điểm số, lịch sử quyết định) sẽ bị mất nếu người dùng tải lại trang.
3. **Chưa gửi lên Database (Supabase):** Thiếu tích hợp API để lưu vết dữ liệu khi hoàn thành game.

## 2. Thiết kế lại Database Schema (Dùng cho LocalStorage & Supabase)

Dữ liệu của người chơi sẽ được tổ chức thành một JSON Object xuyên suốt quá trình chơi:

```javascript
const UserSessionSchema = {
  studentName: "Minh",
  resources: {
    progress: 0,      // % Tiến độ (0 - 100)
    energy: 100,      // % Năng lượng (0 - 100)
    money: 320000     // Ngân sách sinh hoạt (VND)
  },
  traits: {
    can: 0, kiem: 0, liem: 0, chinh: 0 // Điểm tích lũy 4 chuẩn mực
  },
  decisions: [
    // Lưu lịch sử các tùy chọn người dùng đã chọn
    // { scenarioId: 1, optionId: "C", deltaResources: {...}, deltaTraits: {...} }
  ],
  achievements: {
    primaryTitle: "",
    hiddenAchievements: []
  }
}
```

## 3. Lộ trình Triển khai (3 Giai đoạn)

### Giai đoạn 1: Bổ sung Logic Tính Điểm & Lưu LocalStorage (`Challenge.jsx`)
* **Cập nhật Cấu trúc Dữ liệu:** Thêm field `impact` vào từng tùy chọn (A, B, C) của 10 tình huống trong `Challenge.jsx`. Quy định rõ số điểm cộng/trừ cho Resources và Traits.
  ```javascript
  impact: {
    resources: { progress: 10, energy: -10, money: 0 },
    traits: { can: 15, kiem: 0, liem: 0, chinh: 0 }
  }
  ```
* **Quản lý State:** Tạo biến state `gameState` quản lý toàn bộ `resources` và `traits`. Mỗi khi người chơi click đáp án, cập nhật state này.
* **Lưu LocalStorage:** Mỗi khi `gameState` thay đổi, tự động ghi đè lên `localStorage.getItem('game_state')` để đảm bảo không mất dữ liệu khi F5.

### Giai đoạn 2: Tích hợp Supabase & Xử lý Kết thúc Game
* **Kết nối Supabase:** Thiết lập file `src/supabaseClient.js` chứa config.
* **Tạo Table `game_sessions`:** Thiết kế bảng trên Supabase khớp với schema ở trên (Dùng kiểu `JSONB` cho cột `decisions` và `hidden_achievements`).
* **Lưu dữ liệu:** Khi người chơi hoàn thành câu 10, hàm tính toán danh hiệu sẽ chạy, hoàn thiện cục `gameState`, gửi cục dữ liệu này lên API Supabase, sau đó chuyển hướng (`navigate`) sang trang `Result.jsx`.

### Giai đoạn 3: Làm mới Giao diện Kết quả (`Result.jsx`)
* **Đọc Dữ Liệu:** Đọc `gameState` từ `localStorage` (thay vì dùng dữ liệu hardcode 92%).
* **Render UI Mới:**
  - Hiển thị 3 chỉ số sinh tồn cuối cùng: Tiến độ, Năng lượng, Tài chính.
  - Vẽ Biểu đồ Radar dựa trên 4 chỉ số Traits thực tế.
  - Hiển thị Danh hiệu Chính và các Thành tựu Ẩn (nếu có).
  - Tái tạo lại danh sách "Hồ sơ Quyết định nổi bật" dựa vào mảng `decisions` trong state.
