import { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import Spinner from "../../components/Spinner/Spinner";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const newId = Number(id);
  console.log("product", product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/products/${newId}`);
        console.log(res, "res");
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
    <div>
      <section className="product-details">
        <h1 className="product-details__title">Product Details</h1>
        <p className="product-details__description">Detailed information about the product.</p>
        <div className="product-details__content">
          <img src="/images/product_image.jpg" alt="Product" className="product-details__image" />
          <div className="product-details__info">
            <h2 className="product-details__name">Product Name</h2>
            <p className="product-details__price">$99.99</p>
            <p className="product-details__features">Feature 1, Feature 2, Feature 3</p>
            <button className="product-details__add-to-cart">Add to Cart</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails;