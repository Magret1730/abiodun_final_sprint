import "./ProductListings.css";
import ProductListing from "../ProductListing/ProductListing";

const ProductListings = ({products}) => {
  return (
    <section className="product-listings">
        <h1 className="product-listings__title">Product Listing</h1>
        <p className="product-listings__subtitle">Explore our wide range of products.</p>
        <div className="product-listings__items">
          {products.length === 0 ? (
            <div className="product-listings__empty">
              <p>No products available at the moment.</p>
            </div>
          ) : (
            products.map((product) => (
                <ProductListing key={product.id} product={product} />
            ))
          )}
        </div>
    </section>
  )
}

export default ProductListings;