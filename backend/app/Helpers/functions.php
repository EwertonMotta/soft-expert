<?php
if (! function_exists('response')) {
    function response($data, int $code = 200, string $message = 'success', string $cookie = null)
    {
        header(
            header: 'Content-Type: application/json; charset=utf-8',
            response_code: $code
        );
        if ($cookie) {
            setcookie('SESSION_COOKIE', $cookie, time() + (86400 * 30));
        }

        echo json_encode([
            'code' => $code,
            'message' => $message,
            'data' => $data
        ], JSON_PRETTY_PRINT);
        exit;
    }
}
