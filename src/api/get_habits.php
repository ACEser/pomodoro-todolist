<?php
// get_habits.php

// 引入数据库连接
require_once 'db_connection.php';
require_once 'jwt_validate.php';

header('Content-Type: application/json');

// 验证 Token
$input = json_decode(file_get_contents('php://input'), true);
$decoded = validateJWTToken($input['token']);

if (!$decoded) {
    // Token 验证失败，返回错误响应
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

// 获取用户ID
$userID = $decoded->user_id;

// 获取用户的习惯
$query = "SELECT * FROM Habits WHERE UserID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();
$habits = $result->fetch_all(MYSQLI_ASSOC);

http_response_code(200);
echo json_encode($habits);

$stmt->close();
$conn->close();
?>