# HTTP Request Smuggling Lab

Lab này được thiết kế để demo và thực hành các lỗ hổng HTTP Request Smuggling.

## Cấu trúc Lab

```
http-smuggling-lab/
├── docker-compose.yml          # Cấu hình Docker Compose
├── frontend/                   # Frontend proxy server
│   ├── nginx.conf
│   └── html/
│       └── index.html
├── backend-te-cl/             # Backend cho TE.CL vulnerability
│   ├── nginx.conf
│   └── html/
│       └── index.php
├── backend-cl-te/             # Backend cho CL.TE vulnerability
│   ├── nginx.conf
│   └── html/
│       └── index.php
└── backend-obfuscate/         # Backend cho Obfuscating TE
    ├── nginx.conf
    └── html/
        └── index.php
```

## Yêu cầu hệ thống

- Docker và Docker Compose
- Burp Suite (Community hoặc Professional)
- Trình duyệt web

## Cài đặt

1. Clone hoặc giải nén lab vào thư mục
2. Chạy lệnh:
   ```bash
   docker-compose up -d
   ```
3. Truy cập http://localhost:8080

## Các Lab

### Lab 1: TE.CL (Transfer-Encoding vs Content-Length)
- **Endpoint:** http://localhost:8080/te-cl/
- **Mục tiêu:** Truy cập /admin bị restrict
- **Frontend:** Xử lý Transfer-Encoding
- **Backend:** Xử lý Content-Length

### Lab 2: CL.TE (Content-Length vs Transfer-Encoding)
- **Endpoint:** http://localhost:8080/cl-te/
- **Mục tiêu:** Truy cập /private cần authentication
- **Frontend:** Xử lý Content-Length
- **Backend:** Xử lý Transfer-Encoding

### Lab 3: Obfuscating TE
- **Endpoint:** http://localhost:8080/obfuscate/
- **Mục tiêu:** Truy cập /secret chỉ cho internal
- **Kỹ thuật:** Obfuscate Transfer-Encoding header

## Sử dụng với Burp Suite

1. Cấu hình browser sử dụng Burp proxy (127.0.0.1:8080)
2. Bật Intercept trong Burp
3. Gửi request và modify headers/body theo payload
4. Quan sát response

## Lưu ý

- Lab này chỉ dùng cho mục đích học tập
- Không sử dụng trên hệ thống thực tế
- Đọc kỹ tài liệu hướng dẫn trước khi thực hành

## Dừng Lab

```bash
docker-compose down
```

## Xóa toàn bộ

```bash
docker-compose down -v
```
