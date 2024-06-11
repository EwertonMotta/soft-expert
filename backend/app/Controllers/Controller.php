<?php

namespace App\Controllers;

class Controller
{
    public function pageNotFound()
    {
        response([], 404, 'page not found');
    }
}
