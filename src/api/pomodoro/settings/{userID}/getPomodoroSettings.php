// getPomodoroSettings.php

<?php

require_once 'db_connection.php';

header('Content-Type: application/json');

// 假设已通过其他方式验证了用户ID和权限
$userId = $_GET['userId']; // 或者从URL路径参数中获取

if (!$userId) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing userId']);
    exit();
}

try {
    $query = "SELECT workDuration, shortBreak, longBreak, autoRepeat FROM PomodoroSettings WHERE UserId = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($settings = $result->fetch_assoc()) {
        echo json_encode($settings);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'Settings not found']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

$conn->close();
?>