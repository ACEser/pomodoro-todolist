<?php

require_once 'db_connection.php';
require_once 'jwt_utils.php'; // 假设这个文件包含了生成JWT Token的函数

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(['success' => false, 'message' => '用户名和密码是必须的。']);
    exit;
}

$stmt = $conn->prepare("SELECT id, password FROM Users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 0) {
    echo json_encode(['success' => false, 'message' => '用户名或密码错误。']);
    exit;
}

$stmt->bind_result($userId, $hashedPassword);
$stmt->fetch();

if (password_verify($password, $hashedPassword)) {
    // 用户验证成功，生成JWT Token
    $token = generateJWTToken($userId); // 假设generateJWTToken是一个生成JWT Token的函数
    echo json_encode(['success' => true, 'message' => '登录成功。', 'token' => $token]);
} else {
    echo json_encode(['success' => false, 'message' => '用户名或密码错误。']);
}

$conn->close();
?>