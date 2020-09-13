import React, { useState } from 'react';
import './Order.css'
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import orderCompleteGif from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';

const Order = () => {
    const [cart, setCart ] = useState([]);
    useEffect(() => {
        const savedDataKey = getDatabaseCart();
        const productKey = Object.keys(savedDataKey);
        const count = productKey.map(key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedDataKey[key];
            return product;
        });
        setCart(count);
    }, []);
    // console.log(cart);
    const removeButton = (productKey) => {
        console.log('Clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    // const [order, setOrder] = useState(false);
    const history = useHistory()
    const checkoutBtn = () => {
        history.push('/shipment')
    }

    // let thankYou;
    // if(order === true){
    //     thankYou = <img style={{marginTop: '50px'}} src={orderCompleteGif} alt=""/>
    // }
    return (
        <div className="review-area">
            <div className="product-container">
                { 
                    cart.map(pd => <ReviewItem key={pd.key} removeButton={removeButton} product={pd}></ReviewItem>)
                }
                {/* { thankYou } */}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={checkoutBtn} className="cart-btn left-cart-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Order;