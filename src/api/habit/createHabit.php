// createHabit.php

<?php

require_once 'db_connection.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

// 验证输入
if (!isset($input['userId'], $input['name'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required fields']);
    exit();
}

$name = $input['name'];
$userId = $input['userId'];
$startPomodoro = $input['startPomodoro'] ?? false; // 如果未设置，默认为false

try {
    $query = "INSERT INTO Habits (UserId, Name, StartPomodoro) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("isi", $userId, $name, $startPomodoro);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $habitId = $stmt->insert_id;
        echo json_encode(['habitId' => $habitId, 'message' => 'Habit created successfully.']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to create habit']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

$conn->close();
?>