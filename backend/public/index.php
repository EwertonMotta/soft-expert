<?php
    session_start();
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Authorization, Origin');
    header('Access-Control-Allow-Methods: POST, PUT, GET, DELETE');

    require_once '../config/config.php';
    require_once '../vendor/autoload.php';

    use App\Bootstrap\App;

    $app = new App();
