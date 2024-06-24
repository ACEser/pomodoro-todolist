<?php
// create_habit.php

// 引入数据库连接
require_once 'db_connection.php';
require_once 'jwt_validate.php';

header('Content-Type: application/json');

// 读取POST请求体
$input = json_decode(file_get_contents('php://input'), true);

// 验证 Token
$decoded = validateJWTToken($input['token']);

if (!$decoded) {
    // Token 验证失败，返回错误响应
    http_response_code(401);
    echo json_encode(array("message" => "Unauthorized"));
    exit();
}

// 获取用户ID
$userID = $decoded->user_id;

// 获取习惯数据
$name = $input['name'];
$description = $input['description'] ?? null;

// 插入数据库
$query = "INSERT INTO Habits (UserID, Name, Description) VALUES (?, ?, ?)";
$stmt = $conn->prepare($query);
$stmt->bind_param("iss", $userID, $name, $description);

if ($stmt->execute()) {
    $habitID = $stmt->insert_id;
    http_response_code(201);
    echo json_encode(array("message" => "Habit created successfully", "habitID" => $habitID));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to create habit"));
}

$stmt->close();
$conn->close();
?>