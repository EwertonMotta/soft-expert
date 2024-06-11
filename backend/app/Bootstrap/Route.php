<?php

namespace App\Bootstrap;

class Route
{
    protected static $routes = [];
    protected $method;
    protected $path;
    protected $controller;

    protected function create(
        string $method,
        string $path,
        array $controller
    )
    {
        $this->method = $method;
        $this->path = $path;
        $this->controller = $controller;
        self::$routes[$method][$path] = $controller;
    }

    public function get(string $path, array $controller)
    {
        $this->create('GET', $path, $controller);

        return $this;
    }

    public function post(string $path, array $controller)
    {
        $this->create('POST', $path, $controller);

        return $this;
    }

    public function put(string $path, array $controller)
    {
        $this->create('PUT', $path, $controller);

        return $this;
    }

    public function delete(string $path, array $controller)
    {
        $this->create('DELETE', $path, $controller);

        return $this;
    }

    public static function getRoutes()
    {
        return self::$routes;
    }
}
