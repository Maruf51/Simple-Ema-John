import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './product.css'

const Product = (props) => {
    const data = props.product;
    // console.log(data);
    return (
        <div className="product">
            <div className="product-img">
                <img src={data.img} alt="" />
            </div>
            <div className="product-detail">
                <h2>{data.name}</h2>
                <p>by: {data.seller}</p>
                <h3>${data.price}</h3>
                <p>only {data.stock} left in stock - order soon</p>
                <button onClick={() => props.addCart(props.product)} className="cart-btn"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
            </div>
        </div>
    );
};

export default Product;