import { useEffect, useRef, useState } from "react"
import api from "../../services/api"
import CurrencyInput from "react-currency-input-field"

function Products() {

    const [productTypes, setProductTypes] = useState([])
    const [productList, setProductList] = useState([])
    const [totalProducts, setTotalProducts] = useState(0)
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    const inputProduct = useRef()
    const inputProductType = useRef()
    const [inputProductPrice, setInputProductPrice] = useState("")
    const inputDescription = useRef()

    useEffect(() => {
        getProductTypes()
    }, [])

    useEffect(() => {
        getProducts()
    }, [])

    async function getProductTypes() {
        const response = await api.get("/product-types")
        setProductTypes(response.data.data)
    }

    async function getProducts(page = 1) {
        const response = await api.get("/products?page=" + page)
        setProductList(response.data.data.result)
        setTotalProducts(response.data.data.count)
        setPages(response.data.data.pages)
        setCurrentPage(page)
    }

    async function add() {
        await api.post("/products", {
            name: inputProduct.current.value,
            type_id: inputProductType.current.value,
            price: inputProductPrice,
            description: inputDescription.current.value
        })

        resetForm()
        getProducts()
    }

    async function deleteProduct(id) {
        await api.delete(`/products/${id}`)
        getProducts()
    }

    function resetForm() {
        inputProduct.current.value = ""
        inputProductType.current.value = ""
        inputDescription.current.value = ""

        setInputProductPrice("")
    }

    function renderPages() {
        let liPages = []
        for (let index = 1; index <= pages; index++) {
            liPages.push(<li className={`page-item ${currentPage === index ? "active" : ""}`} key={index}><a className="page-link" href="#" onClick={() => getProducts(index)}>{index}</a></li>)
        }

        return liPages
    }

    return (
        <>
            <form method="POST">
                <div className="card-body" style={{ minHeight: "calc(100vh - 130px)" }}>
                    <div className="row mt-2">
                        <div className="col">
                            <label htmlFor="product" className="form-label">
                                <strong> Product: </strong>
                            </label>
                            <input type="text" className="form-control" id="product" ref={inputProduct} />
                        </div>

                        <div className="col">
                            <label htmlFor="product_type" className="form-label">
                                <strong> Product Type: </strong>
                            </label>
                            <select type="text" className="form-control" id="product_type" ref={inputProductType}>
                                <option value="">Select a type</option>
                                {productTypes.map(productType => (
                                    <option key={productType.id} value={productType.id}>{productType.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-2">
                            <label htmlFor="product_price" className="form-label">
                                <strong> Product Type: </strong>
                            </label>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="product_price">R$</span>
                                <CurrencyInput
                                    className="form-control"
                                    id="product_price"
                                    aria-label="product_price"
                                    aria-describedby="product_price"
                                    decimalsLimit={2}
                                    decimalSeparator=","
                                    fixedDecimalLength = {2}
                                    groupSeparator="."
                                    allowNegativeValue={false}
                                    value={inputProductPrice}
                                    onValueChange={(value, name, values) => setInputProductPrice(values.float)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-4">
                        <div className="col">
                            <label htmlFor="description" className="form-label">
                                <strong> Description: </strong>
                            </label>
                            <textarea name="description" id="description" className="form-control" ref={inputDescription}></textarea>
                        </div>


                        <div className="col-2 d-flex justify-content-end align-items-end">
                            <button type="button" className="btn btn-primary w-100" onClick={add}>Add</button>
                        </div>
                    </div>

                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr scope="row">
                                <th scope="col">Product</th>
                                <th scope="col">Product Type</th>
                                <th scope="col">Price</th>
                                <th scope="col">Tax</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {productList.map(product => (
                            <tr scope="row" key={product.id}>
                                <td scope="col">{product.name}</td>
                                <td scope="col">{product.type}</td>
                                <td scope="col">R$ {product.price.replace('.', ',')}</td>
                                <td scope="col">{product.tax}%</td>
                                <td scope="col" className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-center">
                        {(pages > 1) ?
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                                        <a className="page-link" href="#" aria-label="Previous" onClick={() => getProducts(currentPage - 1)}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {renderPages()}
                                    <li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
                                        <a className="page-link" href="#" aria-label="Next" onClick={() => getProducts(currentPage + 1)}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        : null}
                    </div>
                    <span className="h3">Products Count: {totalProducts}</span>
                </div>
            </form>
        </>
    )
}

export default Products
