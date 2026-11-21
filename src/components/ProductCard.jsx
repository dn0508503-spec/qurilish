
function formatPrice(price) {
  return new Intl.NumberFormat("ru-RU").format(price) + " сум";
}

function ProductCard({ product, onAdd, favorite, onFavorite }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="product-tag">{product.tag}</span>

        <button
          className={`favorite-button ${favorite ? "favorite-active" : ""}`}
          onClick={onFavorite}
          aria-label="Добавить в избранное"
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-unit">{product.unit}</p>

        <div className="product-prices">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>

        <button className="add-to-cart" onClick={() => onAdd(product)}>
          <span>+</span>
          В корзину
          <span className="add-arrow">↗</span>
        </button>
      </div>
    </article>
  );
}

export default ProductCard;

