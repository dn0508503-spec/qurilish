import React, { useState } from 'react';

/**
 * OzimizStroy - Premium Maishiy Texnika Kartochkasi
 * Dizayn: Deep Blue + Cyan Glow + Luxury Gold Accents
 */
function ProductCard({
  product,
  isFavorite,
  inCartQuantity,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  formatPrice
}) {
  // Mikro-animatsiyalar uchun ichki holatlar
  const [heartBurst, setHeartBurst] = useState(false);
  const [addedPulse, setAddedPulse] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Sevimlilarga qo'shish tugmasi bosilganda animatsiyani ishga tushirish
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      setHeartBurst(true);
      setTimeout(() => setHeartBurst(false), 750);
    }
    onToggleFavorite(product.id);
  };

  // Savatchaga qo'shish tugmasi bosilganda tasdiq animatsiyasi
  const handleCartClick = (e) => {
    e.stopPropagation();
    if (!product.inStock) return;
    setAddedPulse(true);
    setTimeout(() => setAddedPulse(false), 600);
    onAddToCart(product.id);
  };

  // Sichqoncha harakatiga qarab yengil 3D perspektiva va nur effekti
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.5;
    const rotateY = ((x - centerX) / centerX) * 3.5;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`,
      '--mouse-x': `${x}px`,
      '--mouse-y': `${y}px`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    });
  };

  // Yulduzchalar reytingini vizual chizish
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="pc-stars-row" title={`Reyting: ${rating} / 5.0`}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`pc-star ${index < fullStars ? 'filled' : 'half'}`}
          >
            ★
          </span>
        ))}
        <span className="pc-rating-num">{rating.toFixed(1)}</span>
        <span className="pc-reviews-cnt">({product.reviewsCount})</span>
      </div>
    );
  };

  // Texnik xususiyatlar ro'yxati
  const specEntries = Object.entries(product.specs || {});
  const visibleSpecs = showAllSpecs ? specEntries : specEntries.slice(0, 3);

  // 12 oylik muddatli to'lov hisobi
  const monthlyPayment = Math.round(product.price / 12);
  const savedAmount = product.oldPrice > product.price ? product.oldPrice - product.price : 0;

  return (
    <article
      className={`product-card ${!product.inStock ? 'out-of-stock' : ''} ${
        isFavorite ? 'is-favorited' : ''
      }`}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Kartochka ustidagi dinamik nur qatlami */}
      <div className="pc-spotlight-glare" aria-hidden="true"></div>

      {/* Yuqori rasm va nishonlar (Badges) qismi */}
      <div className="pc-media-box" onClick={() => onQuickView(product)}>
        {/* Chap yuqori burchakdagi status nishonlari */}
        <div className="pc-badges-stack">
          {product.discount > 0 && (
            <span className="pc-badge badge-gold-discount">
              −{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="pc-badge badge-cyan-new">
              YANGI
            </span>
          )}
          {product.isHit && (
            <span className="pc-badge badge-royal-hit">
              ★ XIT
            </span>
          )}
        </div>

        {/* O'ng yuqori burchak: SEVIMLILARGA QO'SHISH TUGMASI */}
        <button
          type="button"
          className={`pc-wishlist-btn ${isFavorite ? 'active' : ''} ${
            heartBurst ? 'bursting' : ''
          }`}
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? `${product.name} ni sevimlilardan olib tashlash`
              : `${product.name} ni sevimlilarga qo'shish`
          }
          title={isFavorite ? 'Sevimlilarda saqlangan' : 'Sevimlilarga qo‘shish'}
        >
          <span className="pc-heart-icon">{isFavorite ? '♥' : '♡'}</span>
          {heartBurst && (
            <span className="pc-sparkle-ring" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
          )}
        </button>

        {/* Mahsulot rasmi */}
        <div className="pc-img-wrapper">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="pc-product-img"
          />
        </div>

        {/* Energiya samaradorligi sinfi nishoni */}
        {product.energyClass && (
          <div className="pc-energy-pill" title="Energiya tejash klassi">
            <span className="bolt-mini">⚡</span>
            <span>{product.energyClass}</span>
          </div>
        )}

        {/* Hover bo'lganda chiqadigan Tezkor ko'rish tugmasi */}
        <div className="pc-hover-overlay">
          <button
            type="button"
            className="pc-quickview-trigger"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
          >
            <span>👁️ Batafsil ko‘rish</span>
          </button>
        </div>

        {/* Agar omborda tugagan bo'lsa */}
        {!product.inStock && (
          <div className="pc-soldout-banner">
            <span>Vaqtincha tugagan</span>
          </div>
        )}
      </div>

      {/* Kartochka ma'lumotlari (Body) */}
      <div className="pc-content-body">
        {/* Brend va ombor holati */}
        <div className="pc-top-meta">
          <span className="pc-brand-tag">{product.brand}</span>
          <span className={`pc-stock-indicator ${product.inStock ? 'in' : 'out'}`}>
            <i className="status-dot"></i>
            {product.inStock ? 'Omborda bor' : 'Buyurtma asosida'}
          </span>
        </div>

        {/* Mahsulot nomi */}
        <h3
          className="pc-title"
          onClick={() => onQuickView(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Reyting va sharhlar */}
        {renderStars(product.rating)}

        {/* Asosiy texnik xususiyatlar */}
        <div className="pc-specs-list">
          {visibleSpecs.map(([specKey, specValue]) => (
            <div key={specKey} className="pc-spec-item">
              <span className="pc-spec-k">{specKey.replace('_', ' ')}:</span>
              <span className="pc-spec-v">{specValue}</span>
            </div>
          ))}
          {specEntries.length > 3 && (
            <button
              type="button"
              className="pc-more-specs-btn"
              onClick={() => setShowAllSpecs((prev) => !prev)}
            >
              {showAllSpecs ? 'Yashirish ▲' : `+ yana ${specEntries.length - 3} ta xususiyat ▼`}
            </button>
          )}
        </div>

        {/* Kafolat eslatmasi */}
        <div className="pc-warranty-strip">
          <span>🛡️ {product.warranty}</span>
        </div>

        {/* Narxlar va muddatli to'lov bloki */}
        <div className="pc-pricing-section">
          <div className="pc-price-row">
            <div className="pc-price-stack">
              {product.oldPrice > product.price && (
                <div className="pc-old-price-wrap">
                  <span className="pc-old-price">{formatPrice(product.oldPrice)}</span>
                  <span className="pc-save-tag">−{formatPrice(savedAmount)}</span>
                </div>
              )}
              <div className="pc-current-price">{formatPrice(product.price)}</div>
            </div>
          </div>

          {/* 12 oylik muddatli to'lov */}
          <div className="pc-installment-pill">
            <span className="inst-gold-badge">0%</span>
            <span>
              <strong>{formatPrice(monthlyPayment)}</strong> × 12 oy
            </span>
          </div>
        </div>

        {/* Pastki harakat tugmalari: Savatchaga + Sevimlilar */}
        <div className="pc-footer-actions">
          <button
            type="button"
            className={`pc-add-cart-btn ${addedPulse ? 'pulse-success' : ''} ${
              inCartQuantity > 0 ? 'in-cart' : ''
            }`}
            disabled={!product.inStock}
            onClick={handleCartClick}
          >
            {!product.inStock ? (
              <span>Sotuvda yo‘q</span>
            ) : inCartQuantity > 0 ? (
              <>
                <span>✓ Savatchada ({inCartQuantity})</span>
                <span className="plus-one">+1</span>
              </>
            ) : (
              <>
                <span className="cart-ico">🛒</span>
                <span>Savatchaga</span>
              </>
            )}
          </button>

          <button
            type="button"
            className={`pc-secondary-fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Sevimlilardan olish' : 'Sevimlilarga saqlash'}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

