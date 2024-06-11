import { Outlet, Link, useLocation } from "react-router-dom";
function Layout() {
    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header d-flex justify-content-between">
                                <h5 className="card-title">LSE - Loja SoftExpert</h5>
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <Link to="/" className={`nav-link ${useLocation().pathname === '/' ? 'active' : ''}`}> Home </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/products" className={`nav-link ${useLocation().pathname === '/products' ? 'active' : ''}`}> Products </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/product-types" className={`nav-link ${useLocation().pathname === '/product-types' ? 'active' : ''}`}> Types </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/orders" className={`nav-link ${useLocation().pathname === '/orders' ? 'active' : ''}`}> Orders </Link>
                                    </li>
                                </ul>
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
