<?php

namespace App\Models;

use App\Bootstrap\Database;
use PDO;

class ProductType extends Model
{
    protected $table = 'product_types';

    public static function create(array $data)
    {
        $conn = new Database();
        $result = $conn->executeQuery('INSERT INTO ' . self::getTable() . ' (name, tax) VALUES (:NAME, :TAX)', [
            ':NAME' => $data['name'],
            ':TAX' => $data['tax']
        ]);

        return $result;
    }

    public static function paginate(int $limit, int $offset)
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT *
        FROM ' . self::getTable() . ' ORDER BY product_types.id LIMIT :LIMIT OFFSET :OFFSET', [
            ':LIMIT' => $limit,
            ':OFFSET' => $offset
        ]);
        $return['result'] = $result->fetchAll(PDO::FETCH_ASSOC);
        $return['count'] = count(self::all());
        $return['limit'] = $limit;
        $return['offset'] = $offset;
        $return['current_page'] = $offset / $limit + 1;
        $return['pages'] = ceil($return['count'] / $limit);

        return $return;
    }
}
