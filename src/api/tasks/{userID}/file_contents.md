# File Contents Report

This document contains the paths and contents of all files in the current directory.

## File: .\create_tasks.php

```text
<?php

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
```

## File: .\deleteTask.php

```text
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
```

## File: .\get_tasks.php

```text
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
```

## File: .\read.py

```text
import os

# Markdown header for the file
markdown_header = '''# File Contents Report

This document contains the paths and contents of all files in the current directory.

'''

# Open or create the Markdown file
with open('file_contents.md', 'w', encoding='utf-8') as md_file:
    md_file.write(markdown_header)

    # Walk through all files in the current directory
    for root, dirs, files in os.walk('.'):
        for file in files:
            # Skip the markdown file itself
            if file == 'file_contents.md':
                continue

            # Write the file path as a header in the Markdown file
            path = os.path.join(root, file)
            md_file.write(f'## File: {path}\n\n')

            # Write the file content in a code block
            try:
                with open(path, 'r', encoding='utf-8') as file_content:
                    content = file_content.read()
                    md_file.write('```text\n')
                    md_file.write(content)
                    md_file.write('\n```\n\n')
            except Exception as e:
                # Attach the filename to the error message
                error_message = f"Error reading file {file}: {e}\n\n"
                md_file.write(error_message)
```

## File: .\updateTask.php

```text
// updateTask.php

<?php

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
```

