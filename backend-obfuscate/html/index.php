<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend Obfuscate TE</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #e91e63;
        }
        .info {
            background: #fce4ec;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .request-info {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            overflow-x: auto;
        }
        .techniques {
            background: #fff9c4;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Backend Obfuscate TE</h1>
        
        <div class="info">
            <h3>Thông tin Backend:</h3>
            <p><strong>Loại:</strong> Obfuscating Transfer-Encoding</p>
            <p><strong>Hành vi:</strong> Backend này xử lý các biến thể của Transfer-Encoding header khác nhau</p>
        </div>
        
        <div class="request-info">
            <h3>Request Information:</h3>
            <p><strong>Method:</strong> <?php echo $_SERVER['REQUEST_METHOD']; ?></p>
            <p><strong>URI:</strong> <?php echo $_SERVER['REQUEST_URI']; ?></p>
            <p><strong>Time:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
            <p><strong>Remote IP:</strong> <?php echo $_SERVER['REMOTE_ADDR']; ?></p>
            
            <h4>Headers:</h4>
            <pre><?php
                foreach (getallheaders() as $name => $value) {
                    echo "$name: $value\n";
                }
            ?></pre>
            
            <?php if ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
            <h4>POST Data:</h4>
            <pre><?php echo htmlspecialchars(file_get_contents('php://input')); ?></pre>
            <?php endif; ?>
        </div>
        
        <div class="techniques">
            <h3>🔧 Obfuscation Techniques:</h3>
            <ul>
                <li><code>Transfer-Encoding: chunked</code> (normal)</li>
                <li><code>Transfer-Encoding : chunked</code> (space trước dấu :)</li>
                <li><code>Transfer-Encoding: chunked </code> (space sau giá trị)</li>
                <li><code>Transfer-Encoding: xchunked</code> (prefix)</li>
                <li><code>Transfer-Encoding: chunked, identity</code> (multiple values)</li>
                <li><code>Transfer-Encoding:[tab]chunked</code> (tab)</li>
            </ul>
        </div>
        
        <div class="info">
            <h3>🎯 Challenge:</h3>
            <p>Sử dụng HTTP Smuggling với obfuscated TE header để truy cập endpoint <code>/secret</code></p>
            <p><strong>Hint:</strong> Frontend và Backend xử lý Transfer-Encoding khác nhau khi có obfuscation</p>
        </div>
    </div>
</body>
</html>
