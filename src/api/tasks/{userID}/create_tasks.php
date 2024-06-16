<?php

// 引入数据库连接
require_once 'db_connection.php';

header('Content-Type: application/json');

// 读取POST请求体
$input = json_decode(file_get_contents('php://input'), true);

// 验证输入
if (!isset($input['userId']) || !isset($input['content'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required fields']);
    exit();
}

$userId = $input['userId'];
$content = $input['content'];
$startPomodoro = isset($input['startPomodoro']) ? $input['startPomodoro'] : false;

// 创建待办事项
try {
    $query = "INSERT INTO Tasks (UserID, Content, IsCompleted) VALUES (?, ?, FALSE)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("is", $userId, $content);
    $stmt->execute();
    
    // 获取新创建的任务ID
    $taskId = $conn->insert_id;

    // 如果需要，启动一个番茄钟会话
    if ($startPomodoro) {
        $pomodoroQuery = "INSERT INTO Pomodoro (UserID, TaskID, IsCompleted) VALUES (?, ?, FALSE)";
        $pomodoroStmt = $conn->prepare($pomodoroQuery);
        $pomodoroStmt->bind_param("ii", $userId, $taskId);
        $pomodoroStmt->execute();
    }

    // 返回成功响应
    http_response_code(201);
    echo json_encode(['taskId' => $taskId, 'message' => 'Task created successfully.']);

} catch (Exception $e) {
    // 数据库异常处理
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

// 关闭数据库连接
$conn->close();
?>