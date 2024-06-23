// updateHabitCompletion.php

<?php

require_once 'db_connection.php';

header('Content-Type: application/json');

$habitId = $_GET['habitID']; // 从URL路径参数中获取

$input = json_decode(file_get_contents('php://input'), true);

// 验证输入
if (!isset($input['isCompleted'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required field: isCompleted']);
    exit();
}

$isCompleted = $input['isCompleted'];
$date = $input['date'] ?? date('Y-m-d'); // 如果未设置，默认为今天的日期

try {
    $query = "UPDATE HabitCompletion SET IsCompleted = ?, Date = ? WHERE HabitId = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("isi", $isCompleted, $date, $habitId);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo json_encode(['message' => 'Habit completion status updated successfully.']);
    } else {
        // 如果没有更新任何行，可能是因为找不到对应的habitId
        http_response_code(404);
        echo json_encode(['message' => 'Habit not found for the provided habitId.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

$conn->close();
?>