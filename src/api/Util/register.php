<?php

require_once 'db_connection.php';



$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';
$email = $input['email'] ?? '';


// 检查用户名是否已存在
$stmt = $conn->prepare("SELECT UserID FROM Users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => '用户名已存在。']);
    exit;
}

// 加密密码
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// 创建用户记录
$stmt = $conn->prepare("INSERT INTO Users (username, password, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $hashedPassword, $email);
$result = $stmt->execute();

if ($result) {
    $userId = $stmt->insert_id;
    echo json_encode(['success' => true, 'message' => '注册成功。', 'userId' => $userId]);
} else {
    echo json_encode(['success' => false, 'message' => '注册失败。']);
}
echo "注册成功";
$conn->close();

?>