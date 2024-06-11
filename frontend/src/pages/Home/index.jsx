import { useEffect, useRef, useState } from "react"
import api from "../../services/api"

function Home() {
    const [products, setProducts] = useState([])
    const [productList, setProductList] = useState([])

    let [totalOrder, setTotalOrder] = useState(0)
    let [totalTax, setTotalTax] = useState(0)

    let [disabledButton, setDisabledButton] = useState(true)

    const inputProduct = useRef()
    const inputQuantity = useRef()
    const inputPrice = useRef()
    const inputTax = useRef()
    const inputTotal = useRef()

    useEffect(() => {
        getProducts()
        resetForm()
    }, [])

    async function getProducts() {
        const response = await api.get("/products")
        setProducts(response.data.data)
    }

    async function finishOrder() {
        await api.post("/orders", {
            products: productList,
            total_order: totalOrder,
            total_tax: totalTax
        })

        setProductList([])
        setTotalOrder(0)
        setTotalTax(0)
    }

    function updatePrice() {
        const product = products.find(product => product.id == inputProduct.current.value)

        if(!product) return

        const quantity = Number(inputQuantity.current.value)

        let price = Number(product.price)
        let tax = Number(product.tax)

        let iPrice = price * quantity
        let iTax = tax * quantity
        let iTotal = ((iPrice * iTax) / 100) + iPrice

        inputPrice.current.value = iPrice.toFixed(2)
        inputTax.current.value = iTax
        inputTotal.current.value = iTotal.toFixed(2)

        setDisabledButton(false)
    }

    function add() {
        const product = products.find(product => product.id == inputProduct.current.value)
        let price_tax = (inputTotal.current.value - inputPrice.current.value).toFixed(2)
        setProductList([...productList,{
            product_id: inputProduct.current.value,
            name: product.name,
            quantity: inputQuantity.current.value,
            price: inputPrice.current.value,
            price_tax,
            total: inputTotal.current.value,
            total_tax: price_tax
        }]);

        setTotalOrder(totalOrder + Number(inputTotal.current.value))
        setTotalTax(totalTax + Number(price_tax))

        resetForm()
    }

    function resetForm() {
        inputProduct.current.value = ""
        inputQuantity.current.value = 1
        inputPrice.current.value = 0
        inputTax.current.value = 0
        inputTotal.current.value = 0

        setDisabledButton(true)
    }

    function removeToList(id) {
        setProductList(productList.filter(product => product.id != id));
        setTotalOrder(totalOrder - Number(productList.find(product => product.id == id).total))
        setTotalTax(totalTax - Number(productList.find(product => product.id == id).priceTax))
    }

    return (
        <>
            <div className="card-body d-inline-block" style={{ height: "calc(100vh - 180px)" }}>
                <form method="POST">
                    <div className="row mt-2 mb-4">
                        <div className="col-auto">
                            <label htmlFor="product" className="col-form-label"><strong> Product: </strong></label>
                        </div>
                        <div className="col">
                            <select name="product" id="product" className="form-select" ref={inputProduct} onChange={() => updatePrice(inputProduct.current.value)}>
                                <option value="">Selecione um produto</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="quantity" className="col-form-label"><strong> Quantity: </strong></label>
                        </div>
                        <div className="col-1">
                            <input type="number" name="quantity" id="quantity" className="form-control" min="1" ref={inputQuantity} onBlur={updatePrice} />
                        </div>

                        <div className="col-auto">
                            <label htmlFor="price" className="col-form-label"><strong> Price: </strong></label>
                        </div>
                        <div className="col-1">
                            <input readOnly type="number" name="price" id="price" className="form-control-plaintext" ref={inputPrice} />
                        </div>

                        <div className="col-auto">
                            <label htmlFor="tax" className="col-form-label"><strong> Tax: </strong></label>
                        </div>
                        <div className="col-1 d-flex align-items-center">
                            <div className="col-sm-10">
                                <input readOnly type="number" name="tax" id="tax" className="form-control-plaintext" ref={inputTax} />
                            </div>
                            <span>%</span>
                        </div>

                        <div className="col-auto">
                            <label htmlFor="total" className="col-form-label"><strong> Total: </strong></label>
                        </div>
                        <div className="col-1">
                            <input readOnly type="number" name="total" id="total" className="form-control-plaintext" ref={inputTotal} />
                        </div>

                        <div className="col-auto d-flex justify-content-end align-items-center">
                            <button
                            disabled={disabledButton}
                            type="button" className="btn btn-primary btn-sm" onClick={add}>Add</button>
                        </div>
                    </div>
                </form>

                <hr />

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Price Tax</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map(product => (
                            <tr scope="row" key={product.id}>
                                <td className="col">{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>R$ {product.price.replace('.', ',')}</td>
                                <td>R$ {product.price_tax.replace('.', ',')}</td>
                                <td>R$ {product.total.replace('.', ',')}</td>
                                <td className="text-end">
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeToList(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <div></div>
                <div className="d-flex align-items-center mt-3">
                    <div className="mx-5 h2">Tax: R$ {totalTax.toFixed(2).replace('.', ',')}</div>
                    <div className="mx-5 h1">Total: R$ {totalOrder.toFixed(2).replace('.', ',')}</div>
                    <div className="mx-5 text-end">
                        <button className="btn btn-success btn-lg" onClick={finishOrder}>Finish Order</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
