// jwt_utils.php

<?php


require_once './vendor/autoload.php'; // 确保这个路径指向你的vendor/autoload.php文件
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "1fcz23456"; // 用于签名Token的密钥，应该是一个复杂的字符串，生产环境中不应该硬编码在代码中

// 生成JWT Token的函数
function generateJWTToken($userId) {
    global $key;
    $issuedAt = time();
    $expirationTime = $issuedAt + 3600;  // Token有效期1小时
    $payload = array(
        'userId' => $userId,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $jwt = JWT::encode($payload, $key, 'HS256');
    return $jwt;
}

// 验证JWT Token的函数
function validateJWTToken($token) {
    global $key;
    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        return (array) $decoded;
    } catch (Exception $e) {
        // 如果验证失败，可以根据需要记录日志或返回错误信息
        return null;
    }
}