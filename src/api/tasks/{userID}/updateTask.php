// updateTask.php

<?php

require_once 'db_connection.php';

header('Content-Type: application/json');

// 假设已通过其他方式验证了用户ID和权限
$taskId = $_GET['taskId']; // 或者从URL路径参数中获取

$input = json_decode(file_get_contents('php://input'), true);

if (!$taskId) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing taskId']);
    exit();
}

try {
    $fieldsToUpdate = [];
    $params = [];
    $types = '';

    // 构建更新语句的动态部分
    if (isset($input['content'])) {
        $fieldsToUpdate[] = 'Content = ?';
        $params[] = $input['content'];
        $types .= 's'; // 字符串类型
    }

    if (isset($input['isCompleted'])) {
        $fieldsToUpdate[] = 'IsCompleted = ?';
        $params[] = $input['isCompleted'];
        $types .= 'i'; // 整型（这里假设isCompleted将被存储为整型，0或1）
    }

    if (isset($input['pomodoroId'])) {
        $fieldsToUpdate[] = 'PomodoroId = ?';
        $params[] = $input['pomodoroId'];
        $types .= 'i'; // 整型
    }

    if (empty($fieldsToUpdate)) {
        http_response_code(400);
        echo json_encode(['message' => 'No valid fields to update']);
        exit();
    }

    $query = "UPDATE Tasks SET " . join(", ", $fieldsToUpdate) . " WHERE TaskID = ?";
    $params[] = $taskId; // 最后添加taskId到参数列表
    $types .= 'i'; // taskId的类型

    $stmt = $conn->prepare($query);
    $stmt->bind_param($types, ...$params);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Task updated successfully.']);
    } else {
        // 如果没有更新任何行，可能是因为找不到对应的taskId
        http_response_code(404);
        echo json_encode(['message' => 'Task not found for the provided taskId.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

$conn->close();
?>