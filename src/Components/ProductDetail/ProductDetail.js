import React from 'react';
import './ProductDetail.css'
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const productDetail = fakeData.find(pd => pd.key === productKey);
    console.log(productDetail);
    return (
        <div style={{margin: '50px', marginTop: '0'}}>
            <Product addToCart={false} product={productDetail}></Product>
        </div>
    );
};

export default ProductDetail;