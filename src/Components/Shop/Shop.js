import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedDataKey = getDatabaseCart();
        const productKey = Object.keys(savedDataKey)
        const count = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedDataKey[key];
            return product;
        })
        setCart(count);
    }, [])

    const addCart = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="cart-container">
            <div className="product-container">
                {
                    products.map(pd => <Product addToCart={true} key={pd.key} addCart={addCart} product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/order" className="placeOrder">
                        <button className="cart-btn left-cart-btn">Show Cart</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;