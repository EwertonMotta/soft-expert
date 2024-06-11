<?php

namespace App\Models;

use App\Bootstrap\Database;
use PDO;

class Product extends Model
{
    protected $table = 'products';

    public static function allWithType()
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT
        products.id, products.name, products.price, products.description, products.type_id, product_types.name as type, product_types.tax
        FROM ' . self::getTable() . ' JOIN product_types ON products.type_id = product_types.id ORDER BY products.id');

        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public static function create(array $data)
    {
        $conn = new Database();
        $result = $conn->executeQuery('INSERT INTO ' . self::getTable() . ' (name, price, description, type_id) VALUES (:NAME, :PRICE, :DESCRIPTION, :TYPE_ID)', [
            ':NAME' => $data['name'],
            ':PRICE' => $data['price'],
            ':DESCRIPTION' => $data['description'],
            ':TYPE_ID' => $data['type_id']
        ]);

        return $result;
    }

    public static function paginate(int $limit, int $offset)
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT
        products.id, products.name, products.price, products.description, products.type_id, product_types.name as type, product_types.tax
        FROM ' . self::getTable() . ' JOIN product_types ON products.type_id = product_types.id ORDER BY products.id LIMIT :LIMIT OFFSET :OFFSET', [
            ':LIMIT' => $limit,
            ':OFFSET' => $offset
        ]);
        $return['result'] = $result->fetchAll(PDO::FETCH_ASSOC);
        $return['count'] = count(self::allWithType());
        $return['limit'] = $limit;
        $return['offset'] = $offset;
        $return['current_page'] = $offset / $limit + 1;
        $return['pages'] = ceil($return['count'] / $limit);

        return $return;
    }
}
