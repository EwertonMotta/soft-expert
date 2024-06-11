<?php

namespace App\Models;

use App\Bootstrap\Database;
use PDO;

class Order extends Model
{
    protected $table = 'orders';

    public static function create(array $data)
    {
        $conn = new Database();
        $conn->executeQuery('INSERT INTO ' . self::getTable() . ' (total, total_tax) VALUES (:TOTAL, :TOTAL_TAX)', [
            ':TOTAL' => $data['total_order'],
            ':TOTAL_TAX' => $data['total_tax']
        ]);
        return self::find($conn->getLastId());
    }

    public static function paginate(int $limit, int $offset)
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT *
        FROM ' . self::getTable() . ' ORDER BY orders.id LIMIT :LIMIT OFFSET :OFFSET', [
            ':LIMIT' => $limit,
            ':OFFSET' => $offset
        ]);
        $result = $result->fetchAll(PDO::FETCH_ASSOC);

        foreach ($result as $key => $value) {
            $return['result'][$key] = $value;
            $return['result'][$key]['products'] = ProductOrder::allByOrderId($value['id']);
        }

        $return['count'] = count(self::all());
        $return['limit'] = $limit;
        $return['offset'] = $offset;
        $return['current_page'] = $offset / $limit + 1;
        $return['pages'] = ceil($return['count'] / $limit);

        return $return;
    }
}
