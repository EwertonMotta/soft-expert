import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductTypes from "./pages/ProductTypes"
import NoPage from './pages/NoPage'

import './styles.scss'
import * as bootstrap from 'bootstrap'
import Orders from './pages/Orders'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='products' element={<Products />} />
                    <Route path='product-types' element={<ProductTypes />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='*' element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
