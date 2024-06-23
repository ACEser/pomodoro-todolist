<?php
// delete_todo.php

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
$userID = $decoded;

// 获取待办事项ID
$taskID = $input['taskID'];

// 删除数据库中的记录
$query = "DELETE FROM Tasks WHERE TaskID = ? AND UserID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $taskID, $userID);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(array("message" => "Task deleted successfully"));
} else {
    http_response_code(500);
    echo json_encode(array("message" => "Failed to delete task"));
}

$stmt->close();
$conn->close();
?>