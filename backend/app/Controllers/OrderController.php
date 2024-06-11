<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductOrder;

class OrderController extends Controller
{
    public function index(array $data = [])
    {
        $page = $data['page'] ?? 1;
        $limit = $data['per_page'] ?? 5;
        $offset = ($page - 1) * $limit;

        return response(Order::paginate($limit, $offset));
    }

    public function store(array $data)
    {
        if (empty($data)) {
            return response([], 400, 'bad request');
        }

        try {
            $order = Order::create($data);

            foreach ($data['products'] as $product) {
                $product['order_id'] = $order['id'];
                ProductOrder::create($product);
            }

            return response([], 201, 'order created');
        } catch (\Throwable $th) {
            return response([], 400, 'bad request');
        }
    }
}
