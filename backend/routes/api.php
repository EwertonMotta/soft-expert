<?php

use App\Bootstrap\Route;
use App\Controllers\HomeController;
use App\Controllers\OrderController;
use App\Controllers\ProductController;
use App\Controllers\ProductTypeController;

$route = new Route();

$route->get('/', [HomeController::class, 'index']);

$route->get('/products', [ProductController::class, 'index']);
$route->post('/products', [ProductController::class, 'store']);
$route->delete('/products/:productId', [ProductController::class, 'destroy']);

$route->get('/product-types', [ProductTypeController::class, 'index']);
$route->post('/product-types', [ProductTypeController::class, 'store']);
$route->delete('/product-types/:productTypeId', [ProductTypeController::class, 'destroy']);

$route->get('/orders', [OrderController::class, 'index']);
$route->post('/orders', [OrderController::class, 'store']);
