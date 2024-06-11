import { useEffect, useRef, useState } from "react"
import api from "../../services/api"

function ProductTypes() {

    const [productTypesList, setProductTypesList] = useState([])
    const [totalProductTypes, setTotalProductTypes] = useState(0)
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const inputProductType = useRef()
    const inputProductTax = useRef()

    useEffect(() => {
        getProductTypes()
    }, [])

    async function getProductTypes(page = 1) {
        const response = await api.get("/product-types?page=" + page)
        setProductTypesList(response.data.data.result)
        setTotalProductTypes(response.data.data.count)
        setPages(response.data.data.pages)
        setCurrentPage(page)
    }

    async function add() {
        await api.post("/product-types", {
            name: inputProductType.current.value,
            tax: inputProductTax.current.value
        })

        resetForm()
        getProductTypes()
    }

    async function deleteProductType(id) {
        await api.delete(`/product-types/${id}`)
        getProductTypes()
    }

    function resetForm() {
        inputProductType.current.value = ""
        inputProductTax.current.value = ""
    }

    function renderPages() {
        let liPages = []
        for (let index = 1; index <= pages; index++) {
            liPages.push(<li className={`page-item ${currentPage === index ? "active" : ""}`}><a className="page-link" href="#" onClick={() => getProductTypes(index)}>{index}</a></li>)
        }

        return liPages
    }
    return (
        <>
            <form method="POST">
                <div className="card-body" style={{ minHeight: "calc(100vh - 130px)" }}>
                    <div className="row mt-2 mb-4">
                        <div className="col">
                            <label htmlFor="product_type" className="form-label">
                                <strong> Product Type: </strong>
                            </label>
                            <input type="text" className="form-control" id="product_type" ref={inputProductType} />
                        </div>

                        <div className="col-2">
                            <label htmlFor="tax" className="form-label">
                                <strong> Tax: </strong>
                            </label>

                            <input type="number" min={1} className="form-control" id="tax" ref={inputProductTax} />
                        </div>

                        <div className="col-2 d-flex justify-content-end align-items-end">
                            <button type="button" className="btn btn-primary w-100" onClick={add}>Add</button>
                        </div>
                    </div>

                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr scope="row">
                                <th scope="col">Product Type</th>
                                <th scope="col">Tax</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {productTypesList.map(productType => (
                                <tr key={productType.id}>
                                    <td>{productType.name}</td>
                                    <td>{productType.tax}</td>
                                    <td className="d-flex justify-content-end">
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteProductType(productType.id)}>Delete</button>
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
                                        <a className="page-link" href="#" aria-label="Previous" onClick={() => getProductTypes(currentPage - 1)}>
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    {renderPages()}
                                    <li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
                                        <a className="page-link" href="#" aria-label="Next" onClick={() => getProductTypes(currentPage + 1)}>
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        : null}
                    </div>
                    <span className="h3">Product Types Count: {totalProductTypes}</span>
                </div>
            </form>
        </>
    )
}

export default ProductTypes
