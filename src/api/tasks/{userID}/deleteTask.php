// deleteTask.php

<?php

require_once 'db_connection.php';

header('Content-Type: application/json');

// 假设已通过其他方式验证了用户ID和权限
$taskId = $_GET['taskId']; // 或者从URL路径参数中获取

if (!$taskId) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing taskId']);
    exit();
}

try {
    // 检查任务是否存在并且属于当前用户，这里假设你有一种方法来验证用户的身份
    // 如果任务不存在或不属于用户，返回404或403错误
    // 为了简化示例，这一步被省略

    $query = "DELETE FROM Tasks WHERE TaskID = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $taskId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Task deleted successfully.']);
    } else {
        // 如果没有删除任何行，可能是因为找不到对应的taskId
        http_response_code(404);
        echo json_encode(['message' => 'Task not found for the provided taskId.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

$conn->close();
?>