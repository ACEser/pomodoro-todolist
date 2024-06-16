// updatePomodoroSettings.php

<?php

require_once 'db_connection.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
$userId = $_GET['userId']; // 或者从URL路径参数中获取

// 验证输入
if (!$userId) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing userId']);
    exit();
}

try {
    $query = "UPDATE PomodoroSettings SET workDuration = ?, shortBreak = ?, longBreak = ?, autoRepeat = ? WHERE UserId = ?";
    
    // 准备更新语句
    $stmt = $conn->prepare($query);
    $stmt->bind_param("iiibi", $input['workDuration'], $input['shortBreak'], $input['longBreak'], $input['autoRepeat'], $userId);
    
    $stmt->execute();
    
    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Settings updated successfully.']);
    } else {
        // 如果没有更新任何行，可能是因为找不到对应的userId
        http_response_code(404);
        echo json_encode(['message' => 'Settings not found for the provided userId.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

$conn->close();
?>