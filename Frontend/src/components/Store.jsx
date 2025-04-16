import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Store = () => {
    const { isAuthenticated, loading } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [currency, setCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        if (!isAuthenticated) return;

        // Fetch products from the backend
        fetch('http://127.0.0.1:8000/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));

        // Fetch exchange rates from the backend
        fetch('http://127.0.0.1:8000/currency/rates?base_currency=USD')
            .then((res) => res.json())
            .then((data) => setExchangeRates(data.rates));
    }, [isAuthenticated]);

    const convertPrice = (price) => {
        const rate = exchangeRates[currency] || 1;
        return (price * rate).toFixed(2);
    };

    // Redirige a la página de inicio de sesión si no está autenticado
    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="store-container">
            <div className="currency-selector">
                <label htmlFor="currency">Moneda:</label>
                <select
                    id="currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="MXN">MXN</option>
                    <option value="CRC">CRC</option> {/* Colones costarricenses */}
                    <option value="JPY">JPY</option> {/* Yenes japoneses */}
                </select>
            </div>
            <h2>Productos</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>
                            Precio: {convertPrice(product.price)} {currency}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Store;
