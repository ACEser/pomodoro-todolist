<?php

require_once 'db_connection.php';
require_once 'utils.php'; // 假设这个文件包含了一些工具函数，比如密码加密和验证邮箱格式的函数

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';
$email = $input['email'] ?? '';

// 简单的输入验证
if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => '用户名和密码是必须的。']);
    exit;
}

// 可选的邮箱验证
if (!empty($email) && !validateEmail($email)) { // 假设validateEmail是一个验证邮箱格式的函数
    echo json_encode(['success' => false, 'message' => '无效的邮箱地址。']);
    exit;
}

// 检查用户名是否已存在
$stmt = $conn->prepare("SELECT id FROM Users WHERE username = ?");
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

$conn->close();
?>