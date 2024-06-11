import { useEffect, useState } from "react"
import api from "../../services/api"

function Orders() {

    const [ orderList, setOrderList ] = useState([])
    const [ totalOrders, setTotalOrders ] = useState(0)
    const [ pages, setPages ] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        getOrders()
    }, [])

    async function getOrders(page = 1) {
        const response = await api.get("/orders?page=" + page)
        setOrderList(response.data.data.result)
        setTotalOrders(response.data.data.count)
        setPages(response.data.data.pages)
        setCurrentPage(page)
    }

    function renderPages() {
        let liPages = []
        for (let index = 1; index <= pages; index++) {
            liPages.push(<li className={`page-item ${currentPage === index ? "active" : ""}`} key={index}><a className="page-link" href="#" onClick={() => getOrders(index)}>{index}</a></li>)
        }

        return liPages
    }

    return (
        <>
            <div className="card-body" style={{ minHeight: "calc(100vh - 130px)" }}>
                <table className="table table-striped">
                    <thead>
                        <tr scope="row">
                            <th scope="col">ID</th>
                            <th scope="col">Total</th>
                            <th scope="col">Total Tax</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderList.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>R$ {order.total.replace('.', ',')}</td>
                                <td>R$ {order.total_tax.replace('.', ',')}</td>
                                <td>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th>Total Tax</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.products.map(product => (
                                                <tr key={product.product_id}>
                                                    <td>{product.name}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>R$ {product.total.replace('.', ',')}</td>
                                                    <td>R$ {product.total_tax.replace('.', ',')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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
                                    <a className="page-link" href="#" aria-label="Previous" onClick={() => getOrders(currentPage - 1)}>
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {renderPages()}
                                <li className={`page-item ${currentPage === pages ? "disabled" : ""}`}>
                                    <a className="page-link" href="#" aria-label="Next" onClick={() => getOrders(currentPage + 1)}>
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    : null}
                </div>
                <span className="h3">Orders Count: {totalOrders}</span>
            </div>
        </>
    )
}

export default Orders
