<?php
// complete_habit.php

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

// 获取习惯ID和完成状态
$habitId = $input['id'];
$completed = $input['completed'] ? 1 : 0;

// 更新数据库中的习惯完成状态
$query = "UPDATE Habits SET IsCompleted = ? WHERE HabitID = ? AND UserID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("iii", $completed, $habitId, $userID);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(array("message" => "Habit completion status updated successfully"));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to update habit completion status"));
}

$stmt->close();
$conn->close();
?>