import { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner/Spinner";
import { useCart } from "../../context/CartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const newId = Number(id);

  const { addItem } = useCart();

  // Fetch product details from backend
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/products/${newId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProduct(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  // Handle adding product to cart
  const handleAddToCart = async () => {
    await addItem(product);
    fetchProduct(); // Refetch product after update
  };

  useEffect(() => {
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
          <p className="product-details__price">${product.price}</p>
          <p className="product-details__description"><strong>Description: </strong> {product.description}</p>
          <p className="product-details__quantity"><strong> Quantity:</strong> {product.quantity}</p>
          <p className="product-details__category"><strong> Category:</strong> {product.category}</p>
          <button onClick={handleAddToCart} className="product-details__add-to-cart">Add to Cart</button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails;