// utils.php

<?php

// 验证邮箱格式的函数
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}