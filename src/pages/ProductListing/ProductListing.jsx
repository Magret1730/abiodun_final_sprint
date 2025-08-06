import React from 'react';
import "./ProductListing.css";
import { Link } from 'react-router-dom';

const ProductListing = ({product}) => {
  // console.log(product);

  return (
    <section className="product-listing__item">
        <Link to={`/products/${product.id}`} className="product-listing__link">
          <img src={product.image} alt="Product" className="product-listing__image" />
        </Link>
        <section className='product-listing__details'>
          <h3 className="product-listing__name">{product.name}</h3>
          <p className="product-listing__price">{product.price}</p>
          <button className="product-listing__add-to-cart">Add to Cart</button>
        </section>
    </section>
  )
}

export default ProductListing;