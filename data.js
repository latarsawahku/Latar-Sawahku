// ============================================================
// KOPIKITA POS - SEED DATA FOR CAFE
// ============================================================

const DEFAULT_SETTINGS = {
  cafeName: "KopiKita Cafe & Roastery",
  tagline: "Artisan Coffee & Good Vibes",
  address: "Jl. Senopati No. 45, Jakarta Selatan",
  phone: "6281234567890",
  taxRate: 10,       // 10% PB1 Cafe
  serviceRate: 0,    // 0%
  receiptFooter: "Terima kasih sudah ngopi bersama kami!\nInstagram: @kopikita.cafe"
};

const DEFAULT_CATEGORIES = [
  { id: "all", name: "Semua", icon: "fa-solid fa-border-all" },
  { id: "Coffee", name: "Coffee", icon: "fa-solid fa-mug-hot" },
  { id: "Non-Coffee", name: "Non-Coffee", icon: "fa-solid fa-glass-water" },
  { id: "Food", name: "Makanan", icon: "fa-solid fa-bowl-food" },
  { id: "Snack", name: "Snack & Pastry", icon: "fa-solid fa-cookie-bite" },
  { id: "Mocktail", name: "Mocktail & Tea", icon: "fa-solid fa-martini-glass-citrus" }
];

const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Kopi Susu Gula Aren",
    category: "Coffee",
    price: 22000,
    emoji: "☕",
    description: "Espresso robusta & arabika, susu segar, dan gula aren murni.",
    customizable: true,
    available: true
  },
  {
    id: "p2",
    name: "Caramel Macchiato",
    category: "Coffee",
    price: 28000,
    emoji: "🧊",
    description: "Espresso lembut dengan saus karamel premium dan steamed milk.",
    customizable: true,
    available: true
  },
  {
    id: "p3",
    name: "Cafe Latte",
    category: "Coffee",
    price: 25000,
    emoji: "☕",
    description: "Double shot espresso dengan susu lembut microfoam.",
    customizable: true,
    available: true
  },
  {
    id: "p4",
    name: "Americano Ice / Hot",
    category: "Coffee",
    price: 20000,
    emoji: "🧊",
    description: "Espresso arabika blend dipadu air segar, bersih dan bold.",
    customizable: true,
    available: true
  },
  {
    id: "p5",
    name: "Matcha Latte",
    category: "Non-Coffee",
    price: 26000,
    emoji: "🍵",
    description: "Matcha murni Uji Jepang dengan susu creamy dan manis seimbang.",
    customizable: true,
    available: true
  },
  {
    id: "p6",
    name: "Signature Chocolate",
    category: "Non-Coffee",
    price: 26000,
    emoji: "🍫",
    description: "Cokelat Belgia pekat dengan susu hangat atau es segar.",
    customizable: true,
    available: true
  },
  {
    id: "p7",
    name: "Butter Croissant",
    category: "Snack",
    price: 24000,
    emoji: "🥐",
    description: "Pastry renyah berlapis dengan mentega Prancis yang harum.",
    customizable: false,
    available: true
  },
  {
    id: "p8",
    name: "French Fries Bolognese",
    category: "Snack",
    price: 26000,
    emoji: "🍟",
    description: "Kentang goreng renyah disiram saus daging bolognese & keju.",
    customizable: false,
    available: true
  },
  {
    id: "p9",
    name: "Roti Bakar Coklat Keju",
    category: "Snack",
    price: 22000,
    emoji: "🥪",
    description: "Roti brioche bakar dengan parutan keju cheddar melimpah.",
    customizable: false,
    available: true
  },
  {
    id: "p10",
    name: "Nasi Goreng Spesial Cafe",
    category: "Food",
    price: 35000,
    emoji: "🍳",
    description: "Nasi goreng bumbu rempah spesial, ayam suwir, telur mata sapi.",
    customizable: false,
    available: true
  },
  {
    id: "p11",
    name: "Spaghetti Aglio Olio",
    category: "Food",
    price: 36000,
    emoji: "🍝",
    description: "Pasta klasik dengan minyak zaitun, bawang putih, dan smoked beef.",
    customizable: false,
    available: true
  },
  {
    id: "p12",
    name: "Sparkling Sunset Breeze",
    category: "Mocktail",
    price: 25000,
    emoji: "🍹",
    description: "Mocktail soda dengan sari peach, jeruk segar, dan daun mint.",
    customizable: false,
    available: true
  },
  {
    id: "p13",
    name: "Lychee Iced Tea",
    category: "Mocktail",
    price: 22000,
    emoji: "🧋",
    description: "Teh melati wangi dengan buah leci segar asli.",
    customizable: true,
    available: true
  }
];

const DEFAULT_TABLES = [
  "Meja 01", "Meja 02", "Meja 03", "Meja 04", 
  "Meja 05", "Meja 06", "Bar 01", "Bar 02", 
  "VIP Room", "Outdoor 01", "Outdoor 02", "Take Away"
];
