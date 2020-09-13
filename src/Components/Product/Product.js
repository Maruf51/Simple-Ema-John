import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const data = props.product;
    // console.log(data);
    return (
        <div className="product">
            <div className="product-img">
                <img src={data.img} alt="" />
            </div>
            <div className="product-detail">
                <h2 className="productName"><Link to={"/product/" + data.key}>{data.name}</Link></h2>
                <p>by: {data.seller}</p>
                <h3 className="product-price">${data.price}</h3>
                <p>only {data.stock} left in stock - order soon</p>
                { props.addToCart === true &&
                    <button onClick={() => props.addCart(props.product)} className="cart-btn"><FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
                }
            </div>
        </div>
    );
};

export default Product;