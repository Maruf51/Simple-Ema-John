import React from 'react';
import './cart.css'

const Cart = (props) => {
    const data = props.cart;

    let total = 0;
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        total = total + element.price;
    }

    let delivery = (0).toFixed(2);
    if(total === 0){
        delivery = 0;
    }
    else if(total < 20){
        delivery = 12.99;
    }
    else if(total < 50){
        delivery = 5.99;
    }
    else{
        delivery = 0;
    }

    let taxBefore = (total + delivery).toFixed(2);

    let tax = ((total * 5) / 100).toFixed(2);

    let orderTotal = (total + delivery + Number(tax)).toFixed(2);

    return (
        <div className="cart">
            <h2 className="itemSummery">Order Summery</h2>
            <h5 className="itemNum">Items Ordered: {props.cart.length}</h5>

            <div className="itemValue"><h5 className="moneyName">Items:</h5> <h5 className="money">$ {Number((total).toFixed(2))}</h5></div>
            <div className="itemValue"><h5 className="moneyName">Shipping & Handling:</h5> <h5 className="money">$ {delivery}</h5></div>
            <div className="itemValue"><h5 className="moneyName">Total Before Tax:</h5> <h5 className="money">$ {Number(taxBefore)}</h5></div>
            <div className="itemValue"><h5 className="moneyName">Estimated Tax (5%):</h5> <h5 className="money">$ {Number(tax)}</h5></div>
            <div className="itemValue"><h2 className="moneyName">Order Total:</h2> <h2 className="money">$ {Number(orderTotal)}</h2></div>
            <button className="cart-btn left-cart-btn">add to cart</button>
        </div>
    );
};

export default Cart;