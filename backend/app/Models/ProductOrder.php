<?php

namespace App\Models;

use App\Bootstrap\Database;
use PDO;

class ProductOrder extends Model
{
    protected $table = 'product_order';

    public static function create(array $data)
    {
        $conn = new Database();
        $result = $conn->executeQuery('INSERT INTO ' . self::getTable() . ' (product_id, order_id, quantity, total, total_tax) VALUES (:PRODUCT_ID, :ORDER_ID, :QUANTITY, :TOTAL, :TOTAL_TAX)', [
            ':PRODUCT_ID' => $data['product_id'],
            ':ORDER_ID' => $data['order_id'],
            ':QUANTITY' => $data['quantity'],
            ':TOTAL' => $data['total'],
            ':TOTAL_TAX' => $data['total_tax']
        ]);

        return $result;
    }

    public static function allByOrderId(int $id)
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT
        product_order.product_id, products.name, product_order.quantity, product_order.total, product_order.total_tax
        FROM ' . self::getTable() . ' JOIN products ON product_order.product_id = products.id WHERE order_id = :ORDER_ID', [
            ':ORDER_ID' => $id
        ]);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }
}
