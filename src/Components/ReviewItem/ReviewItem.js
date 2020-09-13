import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const {name, seller, quantity, price, key, img} = props.product;
    return (
        <div className="review-item">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h1 className="productName">{name}</h1>
                <h3 className="review-price">Price: {price}</h3>
                <p>by: {seller}</p>
                <h4 className="quantity">Quantity: {quantity}</h4>
                <button onClick={() => props.removeButton(key)} className="cart-btn">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;