
import { useMemo, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

const products = [
  { id: 1, name: "Портландцемент М400", category: "Стройматериалы", price: 68000, oldPrice: 75000, unit: "Мешок 50 кг", image: "https://images.unsplash.com/photo-1513467655676-561b7d489a88?w=700", tag: "Хит" },
  { id: 2, name: "Красный строительный кирпич", category: "Стройматериалы", price: 1800, unit: "1 штука", image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=700", tag: "Популярное" },
  { id: 3, name: "Газоблок строительный", category: "Стройматериалы", price: 12500, unit: "1 штука", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700", tag: "Новинка" },
  { id: 4, name: "Песок строительный", category: "Стройматериалы", price: 95000, unit: "1 м³", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700", tag: "Выгодно" },
  { id: 5, name: "Щебень гранитный", category: "Стройматериалы", price: 145000, unit: "1 м³", image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=700", tag: "Хит" },
  { id: 6, name: "Гипсокартон влагостойкий", category: "Стройматериалы", price: 85000, unit: "Лист", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700", tag: "Популярное" },
  { id: 7, name: "Монтажная пена", category: "Стройматериалы", price: 42000, unit: "Баллон", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=700", tag: "Выгодно" },
  { id: 8, name: "Строительный клей", category: "Стройматериалы", price: 55000, unit: "Мешок", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700", tag: "Новинка" },

  { id: 9, name: "Профессиональная дрель", category: "Инструменты", price: 590000, oldPrice: 650000, unit: "Штука", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700", tag: "Скидка" },
  { id: 10, name: "Электрический шуруповёрт", category: "Инструменты", price: 420000, unit: "Штука", image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8a4b?w=700", tag: "Хит" },
  { id: 11, name: "Набор отвёрток", category: "Инструменты", price: 95000, unit: "Набор", image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8a4b?w=700", tag: "Популярное" },
  { id: 12, name: "Молоток строительный", category: "Инструменты", price: 75000, unit: "Штука", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700", tag: "Выгодно" },
  { id: 13, name: "Электрическая болгарка", category: "Инструменты", price: 480000, unit: "Штука", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=700", tag: "Новинка" },
  { id: 14, name: "Строительная рулетка", category: "Инструменты", price: 38000, unit: "Штука", image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8a4b?w=700", tag: "Хит" },
  { id: 15, name: "Лазерный уровень", category: "Инструменты", price: 350000, unit: "Штука", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700", tag: "Premium" },
  { id: 16, name: "Защитные перчатки", category: "Инструменты", price: 25000, unit: "Пара", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=700", tag: "Выгодно" },

  { id: 17, name: "Интерьерная краска Premium", category: "Краски", price: 195000, unit: "Ведро 10 л", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700", tag: "Premium" },
  { id: 18, name: "Белая акриловая краска", category: "Краски", price: 145000, unit: "Ведро 5 л", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700", tag: "Хит" },
  { id: 19, name: "Краска для фасадов", category: "Краски", price: 230000, unit: "Ведро 10 л", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700", tag: "Новинка" },
  { id: 20, name: "Валик малярный", category: "Краски", price: 35000, unit: "Штука", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700", tag: "Выгодно" },

  { id: 21, name: "Керамическая плитка Marble", category: "Отделка", price: 145000, unit: "м²", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700", tag: "Premium" },
  { id: 22, name: "Ламинат Oak Natural", category: "Отделка", price: 125000, unit: "м²", image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700", tag: "Хит" },
  { id: 23, name: "Обои Modern Design", category: "Отделка", price: 95000, unit: "Рулон", image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=700", tag: "Дизайн" },
  { id: 24, name: "Декоративная штукатурка", category: "Отделка", price: 175000, unit: "Ведро", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700", tag: "Новинка" },

  { id: 25, name: "Смеситель Modern Chrome", category: "Сантехника", price: 350000, unit: "Штука", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=700", tag: "Premium" },
  { id: 26, name: "Раковина Modern", category: "Сантехника", price: 650000, unit: "Штука", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=700", tag: "Хит" },
  { id: 27, name: "Душевая система", category: "Сантехника", price: 890000, unit: "Комплект", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=700", tag: "Premium" },
  { id: 28, name: "Керамический унитаз", category: "Сантехника", price: 1250000, unit: "Штука", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=700", tag: "Новинка" },

  { id: 29, name: "Настенный светильник", category: "Электрика", price: 185000, unit: "Штука", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700", tag: "Дизайн" },
  { id: 30, name: "Подвесная люстра", category: "Электрика", price: 750000, unit: "Штука", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700", tag: "Premium" },
  { id: 31, name: "LED лампы комплект", category: "Электрика", price: 65000, unit: "Набор 3 шт.", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700", tag: "Выгодно" },
  { id: 32, name: "Электрический кабель", category: "Электрика", price: 12000, unit: "Метр", image: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?w=700", tag: "Хит" },

  { id: 33, name: "Современное кресло", category: "Мебель", price: 1250000, unit: "Штука", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700", tag: "Premium" },
  { id: 34, name: "Дизайнерский журнальный столик", category: "Мебель", price: 850000, unit: "Штука", image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?w=700", tag: "Дизайн" },
  { id: 35, name: "Современный диван", category: "Мебель", price: 4500000, unit: "Штука", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700", tag: "Premium" },
  { id: 36, name: "Дизайнерский стеллаж", category: "Мебель", price: 980000, unit: "Штука", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=700", tag: "Новинка" },
];

const categories = [
  "Все товары", "Стройматериалы", "Инструменты",
  "Краски", "Отделка", "Сантехника", "Электрика", "Мебель"
];

const money = (n) => new Intl.NumberFormat("ru-RU").format(n) + " сум";

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2 2h2l2.7 13.2a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 7H5" />
    </svg>
  );
}

function App() {
  const [category, setCategory] = useState("Все товары");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) =>
      (category === "Все товары" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    return result;
  }, [category, search, sort]);

  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((old) => {
      const found = old.find((item) => item.id === product.id);
      if (found) {
        return old.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...old, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(id, amount) {
    setCart((old) => old
      .map((item) => item.id === id
        ? { ...item, quantity: item.quantity + amount }
        : item)
      .filter((item) => item.quantity > 0)
    );
  }

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id]
    );
  }

  return (
    <div className="app">
      <div className="topbar">
        <span>✦ QURILISH PREMIUM STORE ✦</span>
        <span>Доставка по всему Узбекистану</span>
        <span>Поддержка 24/7</span>
      </div>

      <header className="header">
        <div className="header-inner">
          <a href="#home" className="logo">
            <span className="logo-symbol">Q</span>
            <span className="logo-text">QURILISH<span>.</span>
              <small>BUILD YOUR FUTURE</small>
            </span>
          </a>

          <button className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}>☰</button>

          <nav className={mobileMenu ? "nav nav-open" : "nav"}>
            <a href="#home">Главная</a>
            <a href="#catalog">Каталог</a>
            <a href="#about">О магазине</a>
            <a href="#footer">Контакты</a>
          </nav>

          <div className="header-actions">
            <button className="favorite-header" title="Избранное">
              ♡ <span>{favorites.length}</span>
            </button>
            <button className="cart-button" onClick={() => setCartOpen(true)}>
              <CartIcon />
              <span>Корзина</span>
              <b>{count}</b>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="hero-label">
              <span></span> YOUR HOME. YOUR STYLE. YOUR FUTURE.
            </div>
            <h1>
              Создавай
              <br />
              <span>свою мечту.</span>
            </h1>
            <p>
              Строительные материалы, инструменты и стильные
              решения для дома. Всё, что нужно твоему проекту.
            </p>
            <div className="hero-buttons">
              <a href="#catalog" className="pink-button">
                Открыть каталог ↗
              </a>
              <a href="#about" className="outline-button">
                О магазине
              </a>
            </div>
            <div className="hero-numbers">
              <div><strong>36+</strong><span>Товаров в каталоге</span></div>
              <div><strong>08</strong><span>Категорий</span></div>
              <div><strong>24/7</strong><span>Поддержка</span></div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"
                alt="Современный интерьер" />
            </div>
            <div className="hero-bubble">
              <span>✦</span>
              <div><b>Build beautifully</b><small>Make it yours.</small></div>
            </div>
            <div className="hero-sticker">NEW<br />COLLECTION</div>
          </div>
        </section>

        <section className="benefits">
          <div><span>✦</span><b>Качество</b><small>Проверенные товары</small></div>
          <div><span>♧</span><b>Доставка</b><small>Быстро и удобно</small></div>
          <div><span>♡</span><b>Выгодные цены</b><small>Для каждого проекта</small></div>
          <div><span>✓</span><b>Поддержка</b><small>Поможем с выбором</small></div>
        </section>

        <section className="catalog" id="catalog">
          <div className="section-title">
            <div>
              <span className="eyebrow">CHOOSE YOUR MATERIALS</span>
              <h2>Наш <span>каталог.</span></h2>
              <p>Всё для строительства, ремонта и красивого дома.</p>
            </div>
            <div className="catalog-total">
              <strong>{filteredProducts.length}</strong>
              <span>товаров найдено</span>
            </div>
          </div>

          <div className="catalog-tools">
            <div className="categories">
              {categories.map((item) => (
                <button key={item}
                  className={category === item ? "category active" : "category"}
                  onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
            <div className="search-sort">
              <div className="search">
                <span>⌕</span>
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Поиск товаров..." />
              </div>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Сортировать</option>
                <option value="low">Сначала дешевле</option>
                <option value="high">Сначала дороже</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.length ? filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                favorite={favorites.includes(product.id)}
                onFavorite={() => toggleFavorite(product.id)}
              />
            )) : (
              <div className="empty-results">
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить поисковый запрос.</p>
                <button onClick={() => {
                  setSearch("");
                  setCategory("Все товары");
                }}>Сбросить фильтры</button>
              </div>
            )}
          </div>
        </section>

        <section className="promo" id="about">
          <div>
            <span className="eyebrow">DESIGNED FOR YOUR DREAM HOME</span>
            <h2>Не просто стройка.<br /><span>Твой стиль.</span></h2>
            <p>
              Выбирай качественные материалы и создавай пространство,
              в котором хочется жить.
            </p>
            <a href="#catalog" className="pink-button">Начать покупки ↗</a>
          </div>
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000"
            alt="Дизайн интерьера" />
        </section>

        <section className="newsletter">
          <div>
            <span className="eyebrow">QURILISH COMMUNITY</span>
            <h2>Твой проект начинается здесь.</h2>
            <p>Выбирай. Покупай. Создавай.</p>
          </div>
          <a href="#catalog" className="pink-button">В каталог ↗</a>
        </section>
      </main>

      <footer id="footer">
        <div className="footer-main">
          <div>
            <a href="#home" className="logo">
              <span className="logo-symbol">Q</span>
              <span className="logo-text">QURILISH<span>.</span>
                <small>BUILD YOUR FUTURE</small>
              </span>
            </a>
            <p>Создаём пространство для ваших идей.</p>
          </div>
          <div><h4>Магазин</h4><a href="#catalog">Каталог</a><a href="#about">О нас</a></div>
          <div><h4>Помощь</h4><a href="#footer">Доставка</a><a href="#footer">Контакты</a></div>
          <div><h4>Связаться</h4><a href="tel:+998900000000">+998 90 000 00 00</a><a href="mailto:info@qurilish.uz">info@qurilish.uz</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 QURILISH. Все права защищены.</span>
          <span>Made with ♡ by Dildora</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR SHOPPING BAG</span>
                <h2>Моя корзина <span>({count})</span></h2>
              </div>
              <button className="close-button" onClick={() => setCartOpen(false)}>×</button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <CartIcon />
                  <h3>Ваша корзина пуста</h3>
                  <p>Самое время найти что-нибудь интересное!</p>
                  <button onClick={() => setCartOpen(false)}>Перейти к покупкам</button>
                </div>
              ) : cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <small>{item.category}</small>
                    <b>{item.name}</b>
                    <strong>{money(item.price)}</strong>
                    <div className="quantity">
                      <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-button"
                    onClick={() => setCart((old) => old.filter((x) => x.id !== item.id))}>
                    ×
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="cart-subtotal">
                  <span>Количество товаров</span><b>{count}</b>
                </div>
                <div className="cart-total">
                  <span>Итого</span><strong>{money(total)}</strong>
                </div>
                <button className="checkout-button"
                  onClick={() => alert("Для настоящего оформления заказов нужно подключить сервер магазина и форму доставки.")}>
                  ОФОРМИТЬ ЗАКАЗ <span>↗</span>
                </button>
                <p>♡ Спасибо, что выбираете QURILISH</p>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;




