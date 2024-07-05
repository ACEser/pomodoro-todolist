<?php
include 'jwt_utils.php';
require_once 'db_connection.php';

$input = json_decode(file_get_contents('php://input'), true);

$username =$input['username'] ?? '';
$password =$input['password'] ?? '';

$stmt =$conn->prepare("SELECT UserID, password FROM Users WHERE username = ?");
$stmt->bind_param("s",$username);
$stmt->execute();$stmt->store_result();

if ($stmt->num_rows == 0) {
    // 使用die()来终止脚本执行并返回错误信息
    die(json_encode(['success' => false, 'message' => '用户名或密码错误。']));
}

$stmt->bind_result($UserId, $hashedPassword);$stmt->fetch();

if (password_verify($password,$hashedPassword)) {
    // 用户验证成功，生成JWT Token
    $token = generateJWTToken($UserId); // 确保这个函数只返回token
    // 使用单一的echo语句来输出结果
    echo json_encode(['success' => true, 'message' => '登录成功。', 'token' => $token]);
} else {
    // 使用die()来终止脚本执行并返回错误信息
    die(json_encode(['success' => false, 'message' => '用户名或密码错误。']));
}

$conn->close();
?>