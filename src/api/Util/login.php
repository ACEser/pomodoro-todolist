<?php
include 'jwt_create.php';
require_once 'db_connection.php';

$input = json_decode(file_get_contents('php://input'), true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

$stmt = $conn->prepare("SELECT UserID, password FROM Users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 0) {
    echo json_encode(['success' => false, 'message' => '用户名或密码错误。']);
    $conn->close();
    exit;
}

$stmt->bind_result($UserId, $hashedPassword);
$stmt->fetch();

if (password_verify($password, $hashedPassword)) {
    // 用户验证成功，生成JWT Token
    $token = generateJWTToken($UserId); // generateJWTToken是一个生成JWT Token的函数
    echo json_encode(['success' => true, 'message' => '登录成功。', 'token' => $token]);
} else {
    echo json_encode(['success' => false, 'message' => '用户名或密码错误。']);
}

$conn->close();
?>
