<?php

namespace App\Controllers;

use App\Controllers\Controller;
use App\Models\ProductType;

class ProductTypeController extends Controller
{
    public function index(array $data = [])
    {
        if (empty($data)) {
            return response(ProductType::all());
        }

        $page = $data['page'] ?? 1;
        $limit = $data['per_page'] ?? 5;
        $offset = ($page - 1) * $limit;

        return response(ProductType::paginate($limit, $offset));
    }

    public function store(array $data)
    {
        if (empty($data)) {
            return response([], 400, 'bad request');
        }

        try {
            $user = ProductType::create($data);

            return response($user, 201, 'product type created');
        } catch (\Throwable $th) {
            return response([], 400, 'bad request');
        }
    }

    public function destroy(int $productTypeId)
    {
        ProductType::delete($productTypeId);
        return response([], 204, 'product type deleted');
    }
}
