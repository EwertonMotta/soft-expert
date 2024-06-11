<?php

namespace App\Models;

use App\Bootstrap\Database;
use PDO;

class Model
{
    protected $table;
    protected $guard = [];
    protected static $password = 'password';

    public static function all()
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT * FROM ' . self::getTable());
        $result = $result->fetchAll(PDO::FETCH_ASSOC);

        foreach ($result as $resultKey => $value) {
            foreach ($value as $key => $val) {
                if (in_array($key, self::getGuard())) {
                    unset($result[$resultKey][$key]);
                }
            }
        }

        return $result;
    }

    public static function find(int $id)
    {
        $conn = new Database();
        $result = $conn->executeQuery('SELECT * FROM ' . self::getTable() . ' WHERE id = :ID LIMIT 1', [
            ':ID' => $id
        ]);
        $result = $result->fetch(PDO::FETCH_ASSOC);

        if (!$result) {
            return false;
        }

        $class = new static();
        return $class->hydrate($result);
    }

    public static function delete(int $id)
    {
        $conn = new Database();
        $conn->executeQuery('DELETE FROM ' . self::getTable() . ' WHERE id = :ID', [
            ':ID' => $id
        ]);

        return true;
    }

    protected static function getTable()
    {
        $class = new static();
        return $class->table;
    }

    protected static function getGuard()
    {
        $class = new static();
        return $class->guard;
    }

    protected function hydrate(array $data = [])
    {
        foreach ($data as $key => $value) {
            if (in_array($key, self::getGuard())) {
                unset($data[$key]);
            }
        }

        return $data;
    }
}
