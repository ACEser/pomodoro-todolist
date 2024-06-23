<?php

// 引入数据库连接
require_once 'db_connection.php';

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

// 获取查询参数
$queryUserId = isset($_GET['userId']) ? $_GET['userId'] : null;

if (!$queryUserId) {
    http_response_code(400);
    echo json_encode(['message' => 'Missing required query parameter: userId']);
    exit();
}

// 查询数据库获取待办事项列表
try {
    $query = "SELECT TaskID, Content, CreateTime, IsCompleted, (SELECT COUNT(*) FROM Pomodoro WHERE TaskID = Tasks.TaskID) AS PomodoroLinked FROM Tasks WHERE UserID = ?";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $queryUserId);
    $stmt->execute();
    $result = $stmt->get_result();

    $tasks = [];

    while ($row = $result->fetch_assoc()) {
        $row['pomodoroLinked'] = $row['PomodoroLinked'] > 0 ? true : false;
        unset($row['PomodoroLinked']); // 不需要返回这个字段
        // 格式化CreateTime为ISO8601格式
        $row['CreateTime'] = date(DATE_ISO8601, strtotime($row['CreateTime']));
        $tasks[] = $row;
    }

    echo json_encode($tasks);

} catch (Exception $e) {
    // 数据库异常处理
    http_response_code(500);
    echo json_encode(['message' => 'Internal Server Error']);
}

// 关闭数据库连接
$conn->close();
?>