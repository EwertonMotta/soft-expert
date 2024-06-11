<?php

namespace App\Bootstrap;

class App
{
    protected $controller = 'Home';
    protected $method = 'index';
    protected $params = [];

    public function __construct()
    {
        $this->setParams();
        $this->init();
    }

    private function init()
    {
        require_once PATH_BASE . '/routes/api.php';
        $routes = Route::getRoutes();
        $httpMethod = $_SERVER['REQUEST_METHOD'];

        foreach ($routes[$httpMethod] as $path => $controller) {
            $pathArray = explode('/', $path);
            $uriArray = explode('/', $_SERVER['REQUEST_URI']);

            if (!empty($pathArray)) {
                $newPathArray = array_map(function ($valuePath, $valueUri) {
                    if (!is_null($valuePath)) {
                        if(str_starts_with($valuePath, ':')) {
                            $this->params[substr($valuePath, 1)] = $valueUri;
                            return $valueUri;
                        }
                    }

                    return $valuePath;
                }, $pathArray, $uriArray);
            }

            $path = implode('/', $newPathArray);
            $requestUri = explode('?', $_SERVER['REQUEST_URI'])[0];
            if ($path == $requestUri) {
                $class = $controller[0];
                $this->method = $controller[1];
                $file = explode('\\', $class);
                $file = end($file);
                require '../app/Controllers/' . $file . '.php';
                $this->controller = new $class();

                try {
                    call_user_func_array([$this->controller, $this->method], $this->params);
                } catch (\Throwable $th) {
                    response([], 400, 'bad content');
                }
            }
        }
    }

    private function setParams()
    {
        if($data = json_decode(file_get_contents('php://input'), true)) {
            $this->params['data'] = $data;
        }

        if (!empty($_GET)) {
            $this->params['data'] = array_merge($this->params, $_GET);
        }
    }

    private function checkIfNotFound($uri, $paths)
    {
        if (!array_key_exists($uri, $paths)) {
            $this->method = 'pageNotFound';

            require '../app/Controllers/Controller.php';
            $this->controller = new \App\Controllers\Controller();
            $this->params = [];

            call_user_func_array([$this->controller, $this->method], $this->params);
        }
    }
}
