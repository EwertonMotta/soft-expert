<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(array $data = [])
    {
        if (empty($data)) {
            return response(Product::allWithType());
        }

        $page = $data['page'] ?? 1;
        $limit = $data['per_page'] ?? 5;
        $offset = ($page - 1) * $limit;

        return response(Product::paginate($limit, $offset));
    }

    public function store(array $data)
    {
        if (empty($data)) {
            return response([], 400, 'bad request');
        }

        try {
            $user = Product::create($data);

            return response($user, 201, 'product created');
        } catch (\Throwable $th) {
            return response([], 400, 'bad request');
        }

    }

    public function destroy(int $productId)
    {
        Product::delete($productId);
        return response([], 204, 'product deleted');
    }
}
