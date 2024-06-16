<?php
// db_connection.php
define('DB_SERVER', 'localhost'); // 数据库服务器地址
define('DB_USERNAME', 'root'); // 数据库用户名
define('DB_PASSWORD', '123456'); // 数据库密码
define('DB_NAME', 'pomodoro'); // 数据库名字

// 尝试连接数据库
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

// 检查连接是否成功
if($conn->connect_error){
    die("连接失败: " . $conn->connect_error);
}
?>