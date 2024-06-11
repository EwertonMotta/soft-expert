<?php

namespace App\Bootstrap;

use PDO;

class Database extends PDO
{
    private $DB_NAME = 'loja_soft_expert';
    private $DB_USER = 'postgres';
    private $DB_PASSWORD = 'password';
    private $DB_HOST = 'localhost';
    private $DB_PORT = 5432;

    private $conn;

    public function __construct() {
        $this->conn = new PDO("pgsql:host=$this->DB_HOST;port=$this->DB_PORT;dbname=$this->DB_NAME;user=$this->DB_USER;password=$this->DB_PASSWORD");
    }

    private function setParameters($stmt, $key, $value)
    {
        $stmt->bindParam($key, $value);
    }

    private function mountQuery($stmt, $parameters)
    {
        foreach ($parameters as $key => $value) {
            $this->setParameters($stmt, $key, $value);
        }
    }

    public function executeQuery(string $query, array $parameters = [])
    {
        $stmt = $this->conn->prepare($query);
        $this->mountQuery($stmt, $parameters);
        $stmt->execute();
        return $stmt;
    }

    public function getLastId()
    {
        return $this->conn->lastInsertId();
    }
}
