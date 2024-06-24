// habits.php

<?php

/ 引入数据库连接
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

// 查询习惯列表
$stmt = $conn->prepare("
    SELECT h.HabitID, h.Name, h.CreateTime
    FROM Habits h
    WHERE h.UserID = ?
");
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$habits = [];

while ($row = $result->fetch_assoc()) {
    $habitId = $row['HabitID'];

    // 查询每个习惯的完成记录
    $recordStmt = $conn->prepare("
        SELECT hr.Date, hr.IsCompleted
        FROM HabitRecords hr
        WHERE hr.HabitID = ?
        ORDER BY hr.Date DESC
    ");
    $recordStmt->bind_param("i", $habitId);
    $recordStmt->execute();
    $recordsResult = $recordStmt->get_result();

    $completionStatus = [];
    while ($recordRow = $recordsResult->fetch_assoc()) {
        $completionStatus[] = [
            'date' => $recordRow['Date'],
            'isCompleted' => (bool) $recordRow['IsCompleted'] // 确保isCompleted是布尔值
        ];
    }

    $habits[] = [
        'habitId' => $habitId,
        'name' => $row['Name'],
        'createTime' => $row['CreateTime'],
        'completionStatus' => $completionStatus
    ];
}

echo json_encode($habits);

$conn->close();
?>