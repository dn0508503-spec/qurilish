import React, { useState, useEffect, useMemo } from 'react';
import ProductCard from './components/ProductCard';
import './App.css';

// OzimizStroy - Maishiy texnika katalogi (Real ma'lumotlar bazasi)
const INITIAL_PRODUCTS = [
  {
    id: 101,
    name: 'Samsung Bespoke AI French Door Muzlatgich',
    brand: 'Samsung',
    category: 'Muzlatgichlar',
    price: 18450000,
    oldPrice: 21200000,
    discount: 13,
    rating: 4.9,
    reviewsCount: 142,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '3 yil rasmiy kafolat + 10 yil kompressor',
    energyClass: 'A+++',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80',
    specs: {
      Hajmi: '614 Litr',
      Tizim: 'Twin Cooling Plus No-Frost',
      Shovqin: '36 dB (Ultra Silent)',
      Boshqaruv: 'SmartThings Wi-Fi AI'
    },
    description: 'Zamonaviy oshxona uchun premium toifadagi Samsung Bespoke muzlatgichi. AI Energy rejimi elektr energiyasini 15% gacha tejaydi va mahsulotlarni uzoq muddat yangidek saqlaydi.'
  },
  {
    id: 102,
    name: 'LG AI DD TurboWash 360 Kir Yuvish Mashinasi',
    brand: 'LG',
    category: 'Kir yuvish',
    price: 7890000,
    oldPrice: 9100000,
    discount: 13,
    rating: 4.8,
    reviewsCount: 218,
    inStock: true,
    isNew: false,
    isHit: true,
    warranty: '3 yil rasmiy kafolat + 10 yil Inverter',
    energyClass: 'A+++',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80',
    specs: {
      Yuklash: '10.5 kg',
      Aylanish: '1400 ayl/min',
      Bugʻlash: 'Steam+ Allergiyaga qarshi',
      Motor: 'Direct Drive AI'
    },
    description: 'Mato turini sunʼiy intellekt orqali aniqlab, optimal yuvish algoritmini tanlaydigan LG TurboWash 360 texnologiyali kir yuvish mashinasi.'
  },
  {
    id: 103,
    name: 'Artel Shahrisabz Inverter Gold 18 Konditsioner',
    brand: 'Artel',
    category: 'Iqlim texnikasi',
    price: 6450000,
    oldPrice: 7300000,
    discount: 12,
    rating: 4.7,
    reviewsCount: 309,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '3 yil toʻliq servis kafolati',
    energyClass: 'A++',
    image: 'https://images.unsplash.com/photo-1614631446501-abcf76949eca?auto=format&fit=crop&w=800&q=80',
    specs: {
      Maydon: '55 kv.m gacha',
      Kompressor: 'Full DC Inverter',
      Ishlash: '-15°C dan +52°C gacha',
      Freon: 'R32 Ekologik'
    },
    description: 'O‘zbekiston iqlim sharoitiga maxsus moslashtirilgan, past kuchlanishda (135V) ham barqaror ishlovchi tilla korpusli premium inverter konditsioner.'
  },
  {
    id: 104,
    name: 'Sony Bravia XR OLED 65" 4K Google TV',
    brand: 'Sony',
    category: 'Televizorlar',
    price: 24900000,
    oldPrice: 28500000,
    discount: 13,
    rating: 5.0,
    reviewsCount: 89,
    inStock: true,
    isNew: true,
    isHit: false,
    warranty: '2 yil rasmiy kafolat',
    energyClass: 'A+',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    specs: {
      Ekran: '65" OLED 120Hz',
      Protsessor: 'Cognitive Processor XR',
      Ovoz: 'Acoustic Surface Audio+ 60W',
      Tizim: 'Google TV / Dolby Vision'
    },
    description: 'Kinoteatr muhitini uyingizga olib kiruvchi Sony Bravia XR OLED televizori. Chuqur qora ranglar va ekrandan taraluvchi jonli akustik ovoz tizimi.'
  },
  {
    id: 105,
    name: 'Dyson V15 Detect Absolute Simsiz Changyutgich',
    brand: 'Dyson',
    category: 'Tozalash texnikasi',
    price: 10200000,
    oldPrice: 11800000,
    discount: 14,
    rating: 4.9,
    reviewsCount: 175,
    inStock: true,
    isNew: false,
    isHit: true,
    warranty: '2 yil rasmiy kafolat',
    energyClass: 'A+++',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    specs: {
      Quvvat: '240 AW soʻrish kuchi',
      Batareya: '60 daqiqagacha avtonom',
      Lazer: 'Yashil chang aniqlovchi nur',
      Filtrlash: 'HEPA 99.99%'
    },
    description: 'Ko‘zga ko‘rinmas mayda chang zarralarini lazer nuri yordamida aniqlovchi va LCD ekranda real vaqtda ko‘rsatuvchi eng kuchli simsiz changyutgich.'
  },
  {
    id: 106,
    name: 'Bosch Serie 8 O‘rnatiladigan Duxovka Shkafi',
    brand: 'Bosch',
    category: 'Oshxona texnikasi',
    price: 11650000,
    oldPrice: 13200000,
    discount: 12,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    isNew: true,
    isHit: false,
    warranty: '2 yil Germaniya kafolati',
    energyClass: 'A+',
    image: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80',
    specs: {
      Hajmi: '71 Litr',
      Rejimlar: '14 ta 4D issiq havo rejimi',
      Tozalash: 'Pirolitik oʻzini tozalash',
      Termoshup: 'PerfectRoast sensori'
    },
    description: 'Nemis muhandisligi mukammalligi: 4D issiq havo aylanishi bir vaqtning o‘zida 4 xil darajada bir tekis pishirish imkonini beradi.'
  },
  {
    id: 107,
    name: 'DeLonghi Eletta Explore Avtomatik Qahva Mashinasi',
    brand: 'DeLonghi',
    category: 'Oshxona texnikasi',
    price: 13400000,
    oldPrice: 15000000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '2 yil rasmiy kafolat',
    energyClass: 'A++',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    specs: {
      Bosim: '19 Bar Italiya pompasi',
      Ichimliklar: '40+ issiq va sovuq retsept',
      Tizim: 'LatteCrema Hot & Cool',
      Displey: '3.5" Sensorli TFT'
    },
    description: 'Bir tugma bosish bilan professional barista darajasidagi issiq kapuchino va muzdek Cold Brew ichimliklarini tayyorlaydi.'
  },
  {
    id: 108,
    name: 'Bosch Serie 6 Idish Yuvish Mashinasi (14 kishi)',
    brand: 'Bosch',
    category: 'Oshxona texnikasi',
    price: 8950000,
    oldPrice: 10100000,
    discount: 11,
    rating: 4.7,
    reviewsCount: 163,
    inStock: true,
    isNew: false,
    isHit: false,
    warranty: '2 yil rasmiy kafolat',
    energyClass: 'A+++',
    image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?auto=format&fit=crop&w=800&q=80',
    specs: {
      Sigʻim: '14 ta idishlar toʻplami',
      Quritish: 'Zeolith® mukammal quritish',
      Suv_sarfi: '9.5 Litr (1 sikl uchun)',
      Shovqin: '42 dB EcoSilence'
    },
    description: 'Zeolith mineral texnologiyasi yordamida hatto plastik idishlarni ham tomchi izisiz quritib beruvchi tejamkor idish yuvish mashinasi.'
  },
  {
    id: 109,
    name: 'Samsung Neo QLED 75" 8K Infinity Screen TV',
    brand: 'Samsung',
    category: 'Televizorlar',
    price: 36800000,
    oldPrice: 41500000,
    discount: 11,
    rating: 5.0,
    reviewsCount: 47,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '3 yil rasmiy kafolat',
    energyClass: 'A+',
    image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80',
    specs: {
      Ekran: '75" Neo QLED 8K AI',
      Ramka: '0.8 mm cheksiz dizayn',
      Ovoz: 'Object Tracking Sound Pro 90W',
      Chastota: '144Hz Gaming Hub'
    },
    description: 'Chegarasiz ekran va sunʼiy intellekt asosida 8K darajasigacha tasvirni tiniqlashtiruvchi flagman televizor.'
  },
  {
    id: 110,
    name: 'Roborock S8 MaxV Ultra Robot Changyutgich',
    brand: 'Roborock',
    category: 'Tozalash texnikasi',
    price: 14200000,
    oldPrice: 16000000,
    discount: 11,
    rating: 4.9,
    reviewsCount: 134,
    inStock: true,
    isNew: true,
    isHit: true,
    warranty: '2 yil rasmiy kafolat',
    energyClass: 'A+++',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=800&q=80',
    specs: {
      Quvvat: '10 000 Pa HyperForce',
      Stansiya: '8-in-1 Avto yuvish va quritish',
      Navigatsiya: 'Reactive AI 2.0 Kamera',
      Nam_tozalash: 'VibraRise 3.0 4000/min'
    },
    description: 'O‘z-o‘zini issiq suvda yuvib, issiq havo bilan quritadigan va burchaklarni maxsus cho‘tka bilan tozalaydigan aqlli robot.'
  },
  {
    id: 111,
    name: 'LG DualCool PuriCare Wi-Fi 12 Konditsioner',
    brand: 'LG',
    category: 'Iqlim texnikasi',
    price: 8350000,
    oldPrice: 9400000,
    discount: 11,
    rating: 4.8,
    reviewsCount: 186,
    inStock: false,
    isNew: false,
    isHit: false,
    warranty: '3 yil kafolat + 10 yil Dual Inverter',
    energyClass: 'A+++',
    image: 'https://images.unsplash.com/photo-1631545806609-35d4ae440431?auto=format&fit=crop&w=800&q=80',
    specs: {
      Maydon: '35-40 kv.m gacha',
      Filtrlash: 'PM 1.0 Havo tozalagich sensori',
      Boshqaruv: 'LG ThinQ + Ovozli boshqaruv',
      Shovqin: '19 dB Tungi rejim'
    },
    description: 'Nafaqat xonani sovutadi, balki ichki havo sifatini PM1.0 sensori orqali tekshirib, chang va allergenlardan tozalaydi.'
  },
  {
    id: 112,
    name: 'Artel Grand Inverter Side-by-Side Muzlatgich',
    brand: 'Artel',
    category: 'Muzlatgichlar',
    price: 11900000,
    oldPrice: 13500000,
    discount: 12,
    rating: 4.7,
    reviewsCount: 254,
    inStock: true,
    isNew: false,
    isHit: true,
    warranty: '3 yil toʻliq kafolat',
    energyClass: 'A++',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    specs: {
      Hajmi: '562 Litr Side-by-Side',
      Tizim: 'Total No-Frost Multi Air Flow',
      Displey: 'Tashqi LED Sensor panel',
      Rang: 'Toʻq koʻk-qora shisha (Glass Navy)'
    },
    description: 'Katta oilalar uchun mo‘ljallangan keng sig‘imli, tashqi sensorli boshqaruv paneliga ega hashamatli Side-by-Side muzlatgich.'
  }
];

const CATEGORIES = [
  { id: 'Barchasi', name: 'Barcha texnikalar', icon: '⚡', count: 12 },
  { id: 'Muzlatgichlar', name: 'Muzlatgichlar', icon: '❄️', count: 2 },
  { id: 'Kir yuvish', name: 'Kir yuvish', icon: '🌊', count: 1 },
  { id: 'Iqlim texnikasi', name: 'Konditsionerlar', icon: '🌬️', count: 2 },
  { id: 'Televizorlar', name: 'Televizorlar', icon: '📺', count: 2 },
  { id: 'Oshxona texnikasi', name: 'Oshxona texnikasi', icon: '☕', count: 3 },
  { id: 'Tozalash texnikasi', name: 'Changyutgichlar', icon: '✨', count: 2 }
];

const BRANDS = ['Barchasi', 'Samsung', 'LG', 'Artel', 'Bosch', 'Sony', 'Dyson', 'DeLonghi', 'Roborock'];

const FAQ_ITEMS = [
  {
    q: 'OzimizStroy do‘konidan muddatli to‘lovga (rassrochka) texnika olish mumkinmi?',
    a: 'Ha, albatta! Pasport va plastik karta orqali boshlang‘ich to‘lovsiz 3 oydan 24 oygacha halol muddatli to‘lov asosida 15 daqiqa ichida rasmiylashtirib beramiz.'
  },
  {
    q: 'Yetkazib berish va o‘rnatib berish xizmati qanday ishlaydi?',
    a: 'Toshkent shahri bo‘ylab 24 soat ichida bepul yetkazib beramiz va uy ichiga olib kirib beramiz. O‘zbekistonning barcha viloyatlariga 1-3 ish kunida ishonchli kuryerlik xizmati mavjud.'
  },
  {
    q: 'Barcha maishiy texnikalarga rasmiy kafolat beriladimi?',
    a: 'OzimizStroy faqat rasmiy distribyutorlardan keltirilgan original texnikalarni sotadi. Har bir mahsulotga 1 yildan 10 yilgacha rasmiy servis kafolat taloni taqdim etiladi.'
  },
  {
    q: 'Sevimlilar ro‘yxatiga saqlangan mahsulotlar o‘chib ketmaydimi?',
    a: 'Yo‘q, siz "Sevimlilar" (юракча) tugmasini bosgan barcha mahsulotlar brauzeringiz xotirasida xavfsiz saqlanadi va istalgan vaqtda ularni solishtirib, savatchaga qo‘shishingiz mumkin.'
  }
];

function App() {
  // Asosiy ma'lumotlar holati
  const [products] = useState(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('Barchasi');
  const [selectedBrand, setSelectedBrand] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPriceLimit, setMaxPriceLimit] = useState(40000000);

  // Sevimlilar (Wishlist) - localStorage bilan sinxronlashgan
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('ozimizstroy_favorites');
      return saved ? JSON.parse(saved) : [101, 105];
    } catch {
      return [101, 105];
    }
  });

  // Savatcha (Cart) - localStorage bilan sinxronlashgan
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ozimizstroy_cart');
      return saved ? JSON.parse(saved) : [{ id: 103, quantity: 1 }];
    } catch {
      return [{ id: 103, quantity: 1 }];
    }
  });

  // Modallar va yon panellar (Drawers) holati
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);

  // Promo-kod va bildirishnoma (Toast)
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Buyurtma formasi
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+998 ');
  const [customerAddress, setCustomerAddress] = useState('');

  // Aksiya taymeri (Flash Sale Countdown)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45
  });

  // LocalStorage saqlash effektlari
  useEffect(() => {
    localStorage.setItem('ozimizstroy_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('ozimizstroy_cart', JSON.stringify(cart));
  }, [cart]);

  // Jonli taymer effekti
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Bildirishnoma ko'rsatish funksiyasi
  const showToast = (text, type = 'gold') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Narxni formatlash (masalan: 18 450 000 so'm)
  const formatPrice = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + " so'm";
  };

  // Sevimlilarga qo'shish / olib tashlash
  const toggleFavorite = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`"${product.name}" sevimlilardan olib tashlandi`, 'blue');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`"${product.name}" sevimlilarga qo'shildi ★`, 'gold');
        return [...prev, productId];
      }
    });
  };

  // Savatchaga qo'shish
  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product || !product.inStock) return;

    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });

    showToast(`"${product.name}" savatchaga qo'shildi`, 'cyan');
  };

  // Savatcha miqdorini o'zgartirish
  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Savatchadan o'chirish
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Barcha sevimlilarni savatchaga o'tkazish
  const moveAllFavoritesToCart = () => {
    let addedCount = 0;
    favorites.forEach((favId) => {
      const prod = products.find((p) => p.id === favId);
      if (prod && prod.inStock) {
        addToCart(favId);
        addedCount++;
      }
    });
    if (addedCount > 0) {
      setIsFavoritesOpen(false);
      setIsCartOpen(true);
      showToast(`${addedCount} ta sevimli mahsulot savatchaga o'tkazildi!`, 'gold');
    }
  };

  // Promo-kodni tekshirish
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'OZIMIZ10' || code === 'GOLD2026') {
      setAppliedPromo({ code, percent: 10 });
      showToast(`Promo-kod "${code}" qo'llandi! 10% qo'shimcha chegirma`, 'gold');
    } else {
      showToast('Noto‘g‘ri promo-kod. "GOLD2026" kodini sinab ko‘ring', 'blue');
    }
  };

  // Filtrlangan va saralangan mahsulotlar ro'yxati
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchCategory =
          selectedCategory === 'Barchasi' || item.category === selectedCategory;
        const matchBrand =
          selectedBrand === 'Barchasi' || item.brand === selectedBrand;
        const matchSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchDiscount = !onlyDiscount || item.discount > 0;
        const matchStock = !onlyInStock || item.inStock;
        const matchPrice = item.price <= maxPriceLimit;

        return (
          matchCategory &&
          matchBrand &&
          matchSearch &&
          matchDiscount &&
          matchStock &&
          matchPrice
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount - a.discount;
        return (b.isHit ? 1 : 0) - (a.isHit ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    selectedBrand,
    searchQuery,
    sortBy,
    onlyDiscount,
    onlyInStock,
    maxPriceLimit
  ]);

  // Sevimli mahsulotlar obyektlari
  const favoriteProductsList = useMemo(() => {
    return products.filter((p) => favorites.includes(p.id));
  }, [products, favorites]);

  // Savatchadagi mahsulotlar va jami summa
  const cartDetails = useMemo(() => {
    const items = cart
      .map((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter(Boolean);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalSaved = items.reduce(
      (sum, item) => sum + (item.oldPrice - item.price) * item.quantity,
      0
    );
    const promoDiscount = appliedPromo ? Math.round((subtotal * appliedPromo.percent) / 100) : 0;
    const finalTotal = subtotal - promoDiscount;
    const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { items, subtotal, totalSaved, promoDiscount, finalTotal, totalCount };
  }, [cart, products, appliedPromo]);

  // Buyurtmani yuborish
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || customerPhone.trim().length < 9) {
      showToast('Iltimos, ismingiz va telefon raqamingizni to‘liq kiriting', 'blue');
      return;
    }
    setCart([]);
    setAppliedPromo(null);
    setIsCartOpen(false);
    setIsCheckoutSuccess(true);
    setCustomerName('');
    setCustomerPhone('+998 ');
    setCustomerAddress('');
  };

  // Filtrlarni tozalash
  const resetAllFilters = () => {
    setSelectedCategory('Barchasi');
    setSelectedBrand('Barchasi');
    setSearchQuery('');
    setOnlyDiscount(false);
    setOnlyInStock(false);
    setMaxPriceLimit(40000000);
    setSortBy('popular');
  };

  return (
    <div className="ozimiz-app">
      {/* Orqa fondagi suzuvchi nurli sharlar (Ambient Motion Blobs) */}
      <div className="ambient-backdrop" aria-hidden="true">
        <div className="glow-orb orb-cyan"></div>
        <div className="glow-orb orb-royal"></div>
        <div className="glow-orb orb-gold"></div>
      </div>

      {/* Yuqori axborot paneli (Top Announcement Bar) */}
      <div className="top-promo-ribbon">
        <div className="container ribbon-inner">
          <div className="ribbon-badge">
            <span className="pulse-dot"></span>
            <span>GOLD SALE 2026</span>
          </div>
          <p className="ribbon-text">
            Barcha maishiy texnikalarga <strong>0% boshlang‘ich to‘lov</strong> va{' '}
            <span className="gold-highlight">GOLD2026</span> promo-kodi bilan qo‘shimcha 10% chegirma!
          </p>
          <div className="ribbon-contact">
            <span>📞 +998 (71) 200-88-99</span>
            <span className="divider">|</span>
            <span>📍 Toshkent, Chilonzor 19</span>
          </div>
        </div>
      </div>

      {/* Asosiy Navigatsiya (Sticky Glass Header) */}
      <header className="main-header">
        <div className="container header-inner">
          {/* Brend Logotipi */}
          <a href="#top" className="brand-logo" onClick={resetAllFilters}>
            <div className="logo-emblem">
              <span className="logo-crown">♛</span>
              <span className="logo-bolt">⚡</span>
            </div>
            <div className="logo-text-group">
              <span className="logo-title">
                Ozimiz<span className="gold-text">Stroy</span>
              </span>
              <span className="logo-subtitle">PREMIUM APPLIANCES</span>
            </div>
          </a>

          {/* Qidiruv tizimi */}
          <div className="header-search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Muzlatgich, konditsioner, Samsung, Dyson qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                title="Tozalash"
              >
                ✕
              </button>
            )}
          </div>

          {/* Foydalanuvchi harakat tugmalari: Sevimlilar va Savatcha */}
          <div className="header-actions">
            <button
              className={`action-pill-btn favorites-trigger ${
                favorites.length > 0 ? 'has-items' : ''
              }`}
              onClick={() => setIsFavoritesOpen(true)}
              aria-label="Sevimlilar ro'yxati"
            >
              <span className="btn-icon heart-pulse">♥</span>
              <div className="btn-label-group">
                <span className="btn-small-hint">Saqlangan</span>
                <span className="btn-main-text">Sevimlilar</span>
              </div>
              <span className="counter-badge gold-badge">{favorites.length}</span>
            </button>

            <button
              className="action-pill-btn cart-trigger"
              onClick={() => setIsCartOpen(true)}
              aria-label="Savatcha"
            >
              <span className="btn-icon">🛒</span>
              <div className="btn-label-group">
                <span className="btn-small-hint">Xaridlar</span>
                <span className="btn-main-text">Savatcha</span>
              </div>
              <span className="counter-badge cyan-badge">{cartDetails.totalCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Bo'limi */}
      <section className="hero-section" id="top">
        <div className="container hero-grid">
          <div className="hero-content fade-in-up">
            <div className="hero-eyebrow">
              <span className="gold-star">✦</span>
              <span>YANGI AVLOD AQLLI UY TEXNIKALARI</span>
            </div>
            <h1 className="hero-title">
              Uyingiz uchun <span className="cyan-gradient-text">zamonaviy</span> va{' '}
              <span className="gold-gradient-text">hashamatli</span> texnikalar olami
            </h1>
            <p className="hero-description">
              <strong>OzimizStroy</strong> — jahonning yetakchi brendlaridan (Samsung, LG, Bosch,
              Dyson, Sony) rasmiy kafolatli maishiy texnikalar. Yoqqan mahsulotlaringizni{' '}
              <span className="inline-fav-link" onClick={() => setIsFavoritesOpen(true)}>
                Sevimlilar ro‘yxatiga ♥
              </span>{' '}
              saqlang va eng qulay narxda xarid qiling.
            </p>

            <div className="hero-cta-group">
              <a href="#catalog" className="btn-gold-primary">
                <span>Katalogni ko‘rish</span>
                <span className="arrow-shift">→</span>
              </a>
              <button
                className="btn-blue-glass"
                onClick={() => setIsFavoritesOpen(true)}
              >
                <span>♥ Sevimlilar ({favorites.length})</span>
              </button>
            </div>

            {/* Statistika ko'rsatkichlari */}
            <div className="hero-metrics">
              <div className="metric-card">
                <span className="metric-value">12 500+</span>
                <span className="metric-label">Mamnun mijozlar</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">10 yilgacha</span>
                <span className="metric-label">Rasmiy kafolat</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">24 soat</span>
                <span className="metric-label">Bepul yetkazish</span>
              </div>
            </div>
          </div>

          {/* O'ng tarafdagi 3D / Floating Showcase Karta */}
          <div className="hero-visual float-animation">
            <div className="showcase-glass-frame">
              <div className="showcase-top-tag">
                <span className="tag-gold">TOP TANLOV</span>
                <span className="tag-cyan">-14% CHEGIRMA</span>
              </div>
              <img
                src="https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=85"
                alt="Samsung Bespoke AI Muzlatgich"
                className="showcase-hero-img"
              />
              <div className="showcase-floating-card">
                <div className="floating-info">
                  <span className="floating-brand">SAMSUNG BESPOKE AI</span>
                  <h4>Smart French Door 614L</h4>
                  <p className="floating-price">18 450 000 so'm</p>
                </div>
                <button
                  className="floating-fav-btn"
                  onClick={() => toggleFavorite(101)}
                  title="Sevimlilarga qo'shish"
                >
                  {favorites.includes(101) ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale / Kun Aksiyasi Taymeri */}
      <section className="flash-sale-strip">
        <div className="container flash-inner">
          <div className="flash-left">
            <span className="flash-icon">⏳</span>
            <div>
              <h3>Oltin Soatlar Aksiyasi</h3>
              <p>Chegirmadagi premium texnikalar tugashiga oz vaqt qoldi</p>
            </div>
          </div>

          <div className="countdown-boxes">
            <div className="time-unit">
              <span className="time-num">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-lbl">Soat</span>
            </div>
            <span className="time-sep">:</span>
            <div className="time-unit">
              <span className="time-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="time-lbl">Daqiqa</span>
            </div>
            <span className="time-sep">:</span>
            <div className="time-unit gold-unit">
              <span className="time-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="time-lbl">Soniya</span>
            </div>
          </div>

          <button
            className="flash-filter-btn"
            onClick={() => {
              setOnlyDiscount(true);
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Chegirmalarni ko‘rish ⚡
          </button>
        </div>
      </section>

      {/* Kategoriyalar Karuseli */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-kicker">KATALOG BO‘LIMLARI</span>
              <h2 className="section-heading">Kerakli texnika turini tanlang</h2>
            </div>
            <button
              className="wishlist-shortcut-pill"
              onClick={() => setIsFavoritesOpen(true)}
            >
              <span>♥ Sevimlilar ro‘yxatim</span>
              <span className="pill-count">{favorites.length}</span>
            </button>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-tile ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
                <span className="cat-badge">{cat.count} ta</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Asosiy Katalog va Filtrlar Bo'limi */}
      <main className="catalog-section" id="catalog">
        <div className="container catalog-layout">
          {/* Chap tarafdagi Filtrlar Paneli (Sidebar) */}
          <aside className="filters-sidebar">
            <div className="sidebar-header">
              <h3>🎛️ Aqlli Filtr</h3>
              <button className="reset-link" onClick={resetAllFilters}>
                Tozalash
              </button>
            </div>

            {/* Brendlar bo'yicha filtr */}
            <div className="filter-group">
              <label className="filter-title">Ishlab chiqaruvchi brend</label>
              <div className="brand-chips">
                {BRANDS.map((brand) => (
                  <button
                    key={brand}
                    className={`brand-chip ${selectedBrand === brand ? 'selected' : ''}`}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Maksimal narx slayderi */}
            <div className="filter-group">
              <div className="price-label-row">
                <label className="filter-title">Maksimal narx</label>
                <span className="price-val-gold">{formatPrice(maxPriceLimit)}</span>
              </div>
              <input
                type="range"
                min="5000000"
                max="40000000"
                step="500000"
                value={maxPriceLimit}
                onChange={(e) => setMaxPriceLimit(Number(e.target.value))}
                className="gold-range-slider"
              />
              <div className="range-limits">
                <span>5 mln</span>
                <span>40 mln</span>
              </div>
            </div>

            {/* Qo'shimcha shartlar (Checkboxlar) */}
            <div className="filter-group">
              <label className="filter-title">Maxsus takliflar</label>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={onlyDiscount}
                  onChange={(e) => setOnlyDiscount(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span>Faqat chegirmadagi texnikalar</span>
              </label>

              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                />
                <span className="checkmark"></span>
                <span>Hozir omborda mavjud</span>
              </label>
            </div>

            {/* Sevimlilar tezkor bloki (Sidebar ichida) */}
            <div className="sidebar-wishlist-box">
              <div className="sw-header">
                <span>♥ Sevimlilar ({favorites.length})</span>
                <button onClick={() => setIsFavoritesOpen(true)}>Ochish →</button>
              </div>
              {favoriteProductsList.length === 0 ? (
                <p className="sw-empty">
                  Hozircha sevimli texnikalar yo‘q. Kartochkadagi yurakchani bosing!
                </p>
              ) : (
                <div className="sw-mini-list">
                  {favoriteProductsList.slice(0, 3).map((fav) => (
                    <div key={fav.id} className="sw-mini-item">
                      <img src={fav.image} alt={fav.name} />
                      <div className="sw-mini-info">
                        <p>{fav.name}</p>
                        <span>{formatPrice(fav.price)}</span>
                      </div>
                      <button
                        onClick={() => toggleFavorite(fav.id)}
                        title="Olib tashlash"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* O'ng tarafdagi Mahsulotlar Setkasi */}
          <div className="catalog-main-area">
            {/* Yuqori saralash paneli */}
            <div className="catalog-toolbar">
              <div className="results-counter">
                Topildi: <strong>{filteredProducts.length} ta</strong> premium texnika
              </div>

              <div className="sort-control">
                <label htmlFor="sortSelect">Saralash:</label>
                <select
                  id="sortSelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Ommabop modellar</option>
                  <option value="price-asc">Arzonroqdan qimmatga</option>
                  <option value="price-desc">Qimmatroqdan arzonga</option>
                  <option value="rating">Yuqori reyting (5.0 ★)</option>
                  <option value="discount">Katta chegirmalar</option>
                </select>
              </div>
            </div>

            {/* Mahsulotlar Ro'yxati (ProductCard komponentlari) */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    inCartQuantity={
                      cart.find((item) => item.id === product.id)?.quantity || 0
                    }
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onQuickView={setQuickViewProduct}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-catalog-state">
                <div className="empty-icon">🔎</div>
                <h3>Hech qanday texnika topilmadi</h3>
                <p>
                  Qidiruv so‘zini o‘zgartirib ko‘ring yoki barcha filtrlarni qayta tiklang.
                </p>
                <button className="btn-gold-primary" onClick={resetAllFilters}>
                  Barcha texnikalarni ko‘rsatish
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Nega aynan OzimizStroy? (Afzalliklar bo'limi) */}
      <section className="benefits-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">ISHONCH VA SIFAT</span>
            <h2 className="section-heading">Nega mijozlar OzimizStroy’ni tanlaydi?</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon-wrap gold-glow">🛡️</div>
              <h3>100% Original Kafolat</h3>
              <p>
                Barcha maishiy texnikalar zavod plombasi va rasmiy servis markazlari kafolati bilan
                taqdim etiladi.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon-wrap cyan-glow">🚚</div>
              <h3>Bepul Tezkor Yetkazish</h3>
              <p>
                Buyurtmangizni ehtiyotkorlik bilan uyingiz eshigigacha yetkazib, joyiga o‘rnatib
                beramiz.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon-wrap blue-glow">💳</div>
              <h3>Halol Muddatli To‘lov</h3>
              <p>
                Hech qanday jarima va yashirin foizlarsiz 24 oygacha qulay bo‘lib to‘lash tizimi.
              </p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon-wrap gold-glow">🎧</div>
              <h3>24/7 Ekspert Maslahati</h3>
              <p>
                Tajribali mutaxassislarimiz xonadoningiz o‘lchami va byudjetiga mos texnikani
                tanlashda yordam beradi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ko'p Beriladigan Savollar (FAQ) */}
      <section className="faq-section">
        <div className="container faq-container">
          <div className="section-header-center">
            <span className="section-kicker">MIJOZLAR UCHUN MA’LUMOT</span>
            <h2 className="section-heading">Ko‘p beriladigan savollar</h2>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaqIndex === idx ? 'open' : ''}`}
                onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? -1 : idx)}
              >
                <div className="faq-question">
                  <h4>{item.q}</h4>
                  <span className="faq-toggle">{activeFaqIndex === idx ? '−' : '+'}</span>
                </div>
                {activeFaqIndex === idx && <p className="faq-answer">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (Sayt pastki qismi) */}
      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <div className="brand-logo">
              <div className="logo-emblem">
                <span className="logo-crown">♛</span>
              </div>
              <span className="logo-title">
                Ozimiz<span className="gold-text">Stroy</span>
              </span>
            </div>
            <p className="footer-desc">
              O‘zbekistondagi zamonaviy maishiy texnika va elektronika gipermarketi. Uyingizga
              qulaylik va hashamat olib kiramiz.
            </p>
            <div className="social-links">
              <a href="#telegram" aria-label="Telegram">Telegram</a>
              <a href="#instagram" aria-label="Instagram">Instagram</a>
              <a href="#youtube" aria-label="YouTube">YouTube</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Katalog</h4>
            <ul>
              {CATEGORIES.slice(1).map((c) => (
                <li key={c.id}>
                  <a
                    href="#catalog"
                    onClick={() => setSelectedCategory(c.id)}
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Mijozlarga</h4>
            <ul>
              <li>
                <button onClick={() => setIsFavoritesOpen(true)}>
                  Sevimlilar ro‘yxati ({favorites.length})
                </button>
              </li>
              <li>
                <button onClick={() => setIsCartOpen(true)}>
                  Savatcha ({cartDetails.totalCount})
                </button>
              </li>
              <li><a href="#catalog">Muddatli to‘lov shartlari</a></li>
              <li><a href="#catalog">Servis markazlari</a></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4>Aloqa markazi</h4>
            <p className="footer-phone">+998 (71) 200-88-99</p>
            <p className="footer-hours">Har kuni: 09:00 dan 22:00 gacha</p>
            <p className="footer-address">Toshkent sh., Chilonzor tumani, Bunyodkor shoh ko‘chasi 19</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© 2026 OzimizStroy. Barcha huquqlar himoyalangan.</p>
            <p className="gold-signature">Premium Blue & Gold Edition</p>
          </div>
        </div>
      </footer>

      {/* =========================================================
          1. SEVIMLILAR YON PANELI (FAVORITES / WISHLIST DRAWER)
      ========================================================= */}
      {isFavoritesOpen && (
        <div className="drawer-overlay" onClick={() => setIsFavoritesOpen(false)}>
          <div
            className="drawer-panel wishlist-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="drawer-title-wrap">
                <span className="drawer-icon gold-heart">♥</span>
                <div>
                  <h3>Sevimlilar ro‘yxati</h3>
                  <p>{favoriteProductsList.length} ta tanlangan texnika</p>
                </div>
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setIsFavoritesOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              {favoriteProductsList.length === 0 ? (
                <div className="drawer-empty">
                  <div className="empty-heart-circle">♡</div>
                  <h4>Sevimlilar ro‘yxatingiz bo‘sh</h4>
                  <p>
                    Katalogdagi mahsulotlar ustidagi yurakcha tugmasini bosib, o‘zingizga yoqqan
                    texnikalarni shu yerga saqlashingiz mumkin.
                  </p>
                  <button
                    className="btn-gold-primary"
                    onClick={() => setIsFavoritesOpen(false)}
                  >
                    Texnikalarni tanlash
                  </button>
                </div>
              ) : (
                <div className="wishlist-items-list">
                  {favoriteProductsList.map((item) => (
                    <div key={item.id} className="wishlist-card-row">
                      <img src={item.image} alt={item.name} className="wl-thumb" />
                      <div className="wl-details">
                        <span className="wl-brand">{item.brand}</span>
                        <h4 onClick={() => setQuickViewProduct(item)}>{item.name}</h4>
                        <div className="wl-price-row">
                          <span className="wl-price">{formatPrice(item.price)}</span>
                          {item.oldPrice > item.price && (
                            <span className="wl-old-price">{formatPrice(item.oldPrice)}</span>
                          )}
                        </div>
                        <div className="wl-actions">
                          <button
                            className="wl-to-cart-btn"
                            disabled={!item.inStock}
                            onClick={() => addToCart(item.id)}
                          >
                            {item.inStock ? '🛒 Savatchaga' : 'Sotuvda yo‘q'}
                          </button>
                          <button
                            className="wl-remove-btn"
                            onClick={() => toggleFavorite(item.id)}
                            title="Sevimlilardan o‘chirish"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {favoriteProductsList.length > 0 && (
              <div className="drawer-footer">
                <button
                  className="btn-gold-primary full-width"
                  onClick={moveAllFavoritesToCart}
                >
                  Barchasini savatchaga o‘tkazish ({favoriteProductsList.length})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          2. SAVATCHA YON PANELI (SHOPPING CART DRAWER)
      ========================================================= */}
      {isCartOpen && (
        <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div
            className="drawer-panel cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <div className="drawer-title-wrap">
                <span className="drawer-icon cyan-cart">🛒</span>
                <div>
                  <h3>Xarid savatchasi</h3>
                  <p>{cartDetails.totalCount} ta mahsulot</p>
                </div>
              </div>
              <button
                className="drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="drawer-body">
              {cartDetails.items.length === 0 ? (
                <div className="drawer-empty">
                  <div className="empty-heart-circle">🛒</div>
                  <h4>Savatchangiz hozircha bo‘sh</h4>
                  <p>
                    Katalogdan yoki sevimlilar ro‘yxatidan o‘zingizga kerakli maishiy texnikani
                    tanlang.
                  </p>
                  <button
                    className="btn-gold-primary"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Xaridni boshlash
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items-list">
                    {cartDetails.items.map((item) => (
                      <div key={item.id} className="cart-item-row">
                        <img src={item.image} alt={item.name} />
                        <div className="cart-item-info">
                          <h4>{item.name}</h4>
                          <p className="cart-item-price">{formatPrice(item.price)}</p>
                          <div className="qty-controls">
                            <button onClick={() => updateCartQuantity(item.id, -1)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                          </div>
                        </div>
                        <button
                          className="cart-del-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Promo-kod kiritish */}
                  <form className="promo-form" onSubmit={handleApplyPromo}>
                    <input
                      type="text"
                      placeholder="Promo-kod (masalan: GOLD2026)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <button type="submit">Qo‘llash</button>
                  </form>

                  {/* Buyurtma rasmiylashtirish formasi */}
                  <form className="checkout-mini-form" onSubmit={handleCheckoutSubmit}>
                    <h4>Tezkor buyurtma berish</h4>
                    <input
                      type="text"
                      placeholder="Ismingiz (masalan: Sardor)"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Telefon raqamingiz (+998 90 123 45 67)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Yetkazib berish manzili (Shahar, tuman)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                    />

                    <div className="cart-summary-box">
                      <div className="summary-row">
                        <span>Mahsulotlar:</span>
                        <span>{formatPrice(cartDetails.subtotal)}</span>
                      </div>
                      <div className="summary-row saved">
                        <span>Tejalgan summa:</span>
                        <span>−{formatPrice(cartDetails.totalSaved)}</span>
                      </div>
                      {cartDetails.promoDiscount > 0 && (
                        <div className="summary-row gold">
                          <span>Promo-kod chegirmasi:</span>
                          <span>−{formatPrice(cartDetails.promoDiscount)}</span>
                        </div>
                      )}
                      <div className="summary-row">
                        <span>Yetkazib berish:</span>
                        <span className="free-tag">BEPUL</span>
                      </div>
                      <div className="summary-total">
                        <span>Jami to‘lov:</span>
                        <span>{formatPrice(cartDetails.finalTotal)}</span>
                      </div>
                    </div>

                    <button type="submit" className="btn-gold-primary full-width">
                      Buyurtmani tasdiqlash ✓
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          3. TEZKOR KO'RISH MODALI (QUICK VIEW MODAL)
      ========================================================= */}
      {quickViewProduct && (
        <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-x"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="qv-grid">
              <div className="qv-image-side">
                <div className="qv-badges">
                  {quickViewProduct.isNew && <span className="badge-new">YANGI</span>}
                  {quickViewProduct.discount > 0 && (
                    <span className="badge-sale">-{quickViewProduct.discount}%</span>
                  )}
                </div>
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
                <div className="qv-energy-tag">
                  Energiya samaradorligi: <strong>{quickViewProduct.energyClass}</strong>
                </div>
              </div>

              <div className="qv-info-side">
                <div className="qv-meta">
                  <span className="qv-brand">{quickViewProduct.brand}</span>
                  <span className="qv-rating">
                    ★ {quickViewProduct.rating} ({quickViewProduct.reviewsCount} sharh)
                  </span>
                </div>

                <h2>{quickViewProduct.name}</h2>
                <p className="qv-description">{quickViewProduct.description}</p>

                <div className="qv-specs-table">
                  {Object.entries(quickViewProduct.specs).map(([key, val]) => (
                    <div key={key} className="qv-spec-row">
                      <span className="spec-key">{key.replace('_', ' ')}:</span>
                      <span className="spec-val">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="qv-warranty-box">
                  🛡️ {quickViewProduct.warranty}
                </div>

                <div className="qv-price-block">
                  <div>
                    <span className="qv-current-price">
                      {formatPrice(quickViewProduct.price)}
                    </span>
                    {quickViewProduct.oldPrice > quickViewProduct.price && (
                      <span className="qv-old-price">
                        {formatPrice(quickViewProduct.oldPrice)}
                      </span>
                    )}
                  </div>
                  <span className="qv-installment">
                    yoki {formatPrice(Math.round(quickViewProduct.price / 12))} / oyiga
                  </span>
                </div>

                <div className="qv-action-buttons">
                  <button
                    className="btn-gold-primary"
                    disabled={!quickViewProduct.inStock}
                    onClick={() => {
                      addToCart(quickViewProduct.id);
                      setQuickViewProduct(null);
                    }}
                  >
                    {quickViewProduct.inStock ? '🛒 Savatchaga qo‘shish' : 'Sotuvda mavjud emas'}
                  </button>
                  <button
                    className={`qv-fav-btn ${
                      favorites.includes(quickViewProduct.id) ? 'active' : ''
                    }`}
                    onClick={() => toggleFavorite(quickViewProduct.id)}
                  >
                    {favorites.includes(quickViewProduct.id)
                      ? '♥ Sevimlilarda'
                      : '♡ Sevimlilarga'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buyurtma qabul qilinganligi haqida tasdiq modali */}
      {isCheckoutSuccess && (
        <div className="modal-overlay" onClick={() => setIsCheckoutSuccess(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <div className="success-crown-icon">✓</div>
            <h3>Buyurtmangiz qabul qilindi!</h3>
            <p>
              <strong>OzimizStroy</strong> operatorlari 5 daqiqa ichida siz bilan bog‘lanib,
              yetkazib berish vaqtini tasdiqlaydi.
            </p>
            <button
              className="btn-gold-primary"
              onClick={() => setIsCheckoutSuccess(false)}
            >
              Ajoyib, rahmat!
            </button>
          </div>
        </div>
      )}

      {/* Bildirishnoma (Toast Notification) */}
      {toastMessage && (
        <div className={`toast-banner toast-${toastMessage.type}`}>
          <span>{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}

export default App;




