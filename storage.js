// ============================================================
// KOPIKITA POS - STORAGE MANAGER (LocalStorage Persistence)
// ============================================================

const STORAGE_KEYS = {
  PRODUCTS: 'kopikita_products',
  ORDERS: 'kopikita_orders',
  SETTINGS: 'kopikita_settings',
  CART: 'kopikita_cart',
  CURRENT_TABLE: 'kopikita_current_table'
};

const StorageManager = {
  // Load Settings
  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
    } catch (e) {
      console.error("Error reading settings:", e);
      return { ...DEFAULT_SETTINGS };
    }
  },

  saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error("Error saving settings:", e);
    }
  },

  // Load Products
  getProducts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) {
        return JSON.parse(data);
      }
      // If not yet saved, seed with default products
      this.saveProducts(DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS;
    } catch (e) {
      console.error("Error reading products:", e);
      return DEFAULT_PRODUCTS;
    }
  },

  saveProducts(products) {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error("Error saving products:", e);
    }
  },

  // Load Orders / Transactions
  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error reading orders:", e);
      return [];
    }
  },

  saveOrder(newOrder) {
    try {
      const orders = this.getOrders();
      orders.unshift(newOrder); // newest first
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return orders;
    } catch (e) {
      console.error("Error saving order:", e);
      return [];
    }
  },

  clearOrders() {
    try {
      localStorage.removeItem(STORAGE_KEYS.ORDERS);
    } catch (e) {
      console.error("Error clearing orders:", e);
    }
  },

  // Cart
  getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  },

  clearCart() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CART);
    } catch (e) {
      console.error("Error clearing cart:", e);
    }
  },

  // Current Table
  getCurrentTable() {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TABLE) || "Meja 01";
  },

  saveCurrentTable(tableName) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TABLE, tableName);
  },

  // Reset to Demo Data
  resetAllToDemo() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    this.clearCart();
  }
};
