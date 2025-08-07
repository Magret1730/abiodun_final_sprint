import { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner/Spinner";
import { useCart } from "../../context/Cart";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const newId = Number(id);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${newId}`);
        // console.log(res, "res");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spinner loading={loading} />;
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <section className="product-details">
      <h1 className="product-details__title">Product Details</h1>
      <p className="product-details__description">Detailed information about the product.</p>
      <div className="product-details__content">
        <img src={product.image} alt={product.name} className="product-details__image" />
        <div className="product-details__info">
          <h2 className="product-details__name">{product.name}</h2>
          <p className="product-details__price">{product.price}</p>
          <p className="product-details__description">{product.description}</p>
          <p className="product-details__quantity">{product.quantity}</p>
          <p className="product-details__category">{product.category}</p>
          <button onClick={handleAddToCart} className="product-details__add-to-cart">Add to Cart</button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;