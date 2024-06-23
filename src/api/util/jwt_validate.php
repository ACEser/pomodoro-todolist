<?php
require_once 'D:\code\A_project\Sample\pomodro\vendor\autoload.php'; // 确保这个路径指向你的vendor/autoload.php文件
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "1fcz23456"; // 用于签名Token的密钥，应该是一个复杂的字符串，生产环境中不应该硬编码在代码中

// 验证JWT Token的函数
function validateJWTToken($token) {
    global $key;
    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $payload = (array)$decoded;
        // 验证用户 ID 是否合法
        if (is_numeric($payload['userId']) &&$payload['userId'] > 0) {
            return $payload;
        }
    } catch (Exception $e) {
        // 如果验证失败，可以根据需要记录日志或返回错误信息
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
        exit();
    }
    return null;
}
