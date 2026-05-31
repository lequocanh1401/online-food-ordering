# 🍔 Online Food Ordering System

Một hệ thống đặt và quản lý đồ ăn trực tuyến (Full-Stack Web Application) toàn diện, được thiết kế theo kiến trúc hiện đại, phân quyền người dùng chặt chẽ và tích hợp các công nghệ thực tế như cổng thanh toán Stripe và quản lý khuyến mãi động.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

### Backend
*   **Core Framework:** Spring Boot 3.x (Java 17)
*   **Security & Auth:** Spring Security, JWT (JSON Web Token)
*   **Database & ORM:** MySQL, Spring Data JPA, Hibernate
*   **Payment Gateway:** Stripe SDK (Thanh toán thẻ quốc tế thực tế)
*   **Build Tool:** Maven

### Frontend
*   **Core Library:** React 19 (Vite)
*   **State Management:** Redux Toolkit, Redux Thunk
*   **Styling & UI Components:** Material-UI (MUI v9), TailwindCSS
*   **Form & Validation:** Formik, Yup
*   **Carousel & Charts:** React Slick, Slick Carousel

---

## 🌟 Tính Năng Nổi Bật (Key Features)

### 1. Phân Quyền Người Dùng (3 Roles)
*   **Khách Hàng (Customer):**
    *   Khám phá các nhà hàng, lọc theo khu vực/thành phố và thể loại ẩm thực.
    *   Carousel tương tác thông minh "Hôm nay ăn gì" tự động dẫn tới trang tìm kiếm theo từ khóa.
    *   Giỏ hàng trực tuyến: Thêm, bớt số lượng, tính toán tổng tiền tạm tính.
    *   **Thanh toán Stripe:** Kết nối trực tiếp Stripe Checkout để thanh toán bằng thẻ tín dụng.
    *   Quản lý lịch sử đơn hàng theo cụm đơn chuyên nghiệp, hiển thị chi tiết mã giảm giá, số tiền được giảm và tổng thanh toán thực tế.
    *   Hộp thoại xác nhận hủy đơn hàng (Dialog) thiết kế Dark Mode hiện đại.
*   **Chủ Cửa Hàng (Restaurant Owner):**
    *   Quản lý thông tin nhà hàng, danh mục món ăn (Category), và kho nguyên liệu (Ingredients).
    *   Quản lý thực đơn (Món ăn, trạng thái còn/hết hàng).
    *   Quản lý đơn hàng của nhà hàng (Cập nhật trạng thái đơn hàng: Chờ xử lý, Đang giao, Đã giao...).
    *   Tạo sự kiện khuyến mãi riêng cho nhà hàng (Events).
*   **Admin Tổng (Super Admin):**
    *   Xem danh sách và thực hiện xóa các nhà hàng trên toàn hệ thống (kèm xác nhận bảo mật).
    *   **Kiểm duyệt đánh giá (Review Moderation):** Theo dõi số sao trung bình và trực tiếp xóa các đánh giá vi phạm chuẩn mực.
    *   **Mã giảm giá toàn sàn (Global Coupons):** Tạo các mã giảm giá áp dụng cho mọi đơn hàng trên toàn hệ thống kèm theo điều kiện **Giá trị đơn hàng tối thiểu** để áp dụng.

### 2. Hệ Thống Khuyến Mãi Nâng Cao (Coupon Constraint Engine)
*   Hỗ trợ mã giảm giá theo **Phần trăm (%)** hoặc **Số tiền mặt trực tiếp (đ)**.
*   **Ràng buộc đơn tối thiểu:** Ngăn chặn áp dụng nếu tổng tiền chưa đạt ngưỡng quy định.
*   **Auto-removal:** Frontend tự động phát hiện nếu giỏ hàng bị giảm giá trị xuống dưới mức tối thiểu và ngay lập tức gỡ bỏ mã giảm giá kèm thông báo trực quan.
*   Bảo mật đường truyền thông qua **Query Parameters** thay vì Path Variables để hỗ trợ các mã chứa ký tự đặc biệt (Ví dụ: `GIAM10%`) mà không bị chặn bởi Spring Security Firewall.

---

## 🔒 Cơ Chế Bảo Mật & An Toàn Dữ Liệu
*   **JWT Authentication:** Bảo vệ các API riêng tư, lưu trữ token an toàn ở localStorage phía Client.
*   **Chặn Đăng Ký Admin Công Khai:** API đăng ký (`/auth/signup`) tự động chặn hoặc hạ cấp bất kỳ yêu cầu đăng ký tài khoản có vai trò `ROLE_ADMIN` nào từ bên ngoài.
*   **Database Seeding:** Tài khoản Super Admin duy nhất được khởi tạo tự động khi khởi chạy ứng dụng lần đầu nhằm đảm bảo tính khép kín.
*   **Null-safe Checkout:** Logic backend kiểm soát các giá trị biên của mã giảm giá (kiểm tra null, giới hạn giảm giá từ 0 đến tối đa giá trị đơn hàng) tránh crash server.

---

## ⚙️ Hướng Dẫn Cài Đặt & Khởi Chạy (Installation & Setup)

### Bước 1: Cấu hình Cơ sở dữ liệu & Cổng thanh toán
1.  Tạo database MySQL mới có tên là `online_food_ordering`.
2.  Mở file cấu hình backend [application.properties](file:///d:/Code/Online%20Food%20Ordering/Online-Food-Ordering/src/main/resources/application.properties) và thiết lập:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/online_food_ordering
    spring.datasource.username=YOUR_MYSQL_USERNAME
    spring.datasource.password=YOUR_MYSQL_PASSWORD

    # Khóa bí mật Stripe (Test mode)
    stripe.api.key=YOUR_STRIPE_SECRET_KEY
    ```

### Bước 2: Chạy Backend (Spring Boot)
1.  Di chuyển vào thư mục backend:
    ```bash
    cd Online-Food-Ordering
    ```
2.  Biên dịch dự án và khởi chạy ứng dụng:
    ```bash
    ./mvnw spring-boot:run
    ```
    *Ứng dụng backend sẽ khởi chạy tại cổng mặc định `5454`.*

### Bước 3: Chạy Frontend (React)
1.  Di chuyển vào thư mục frontend:
    ```bash
    cd food-ordering-frontend
    ```
2.  Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```
3.  Chạy server dev:
    ```bash
    npm run dev
    ```
    *Ứng dụng frontend sẽ khả dụng tại địa chỉ `http://localhost:5173`.*

---

## 🔑 Tài Khoản Đăng Nhập Mẫu (Seed Credentials)

Hệ thống hỗ trợ cơ chế tự động nạp dữ liệu mẫu (Auto-seeding). Bạn có thể đăng nhập ngay bằng các tài khoản sau:

| Vai trò | Tên đăng nhập (Email) | Mật khẩu | Mô tả |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `admin` | Quản trị toàn hệ thống |
| **Restaurant Owner** | *Đăng ký qua giao diện* | *Tự chọn* | Chọn vai trò Owner khi đăng ký |
| **Customer** | *Đăng ký qua giao diện* | *Tự chọn* | Đăng ký mua hàng bình thường |

*Lưu ý: Nếu cần nạp lại tài khoản Admin tổng, bạn có thể gọi endpoint: `POST http://localhost:5454/public/seed`.*
