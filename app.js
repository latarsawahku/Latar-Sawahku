// ============================================================
// KOPIKITA POS - CORE APPLICATION LOGIC
// Optimized for Mobile Touch & Instant Android Usability
// ============================================================

(function () {
  'use strict';

  // State
  let products = [];
  let cart = [];
  let settings = {};
  let currentCategory = 'all';
  let searchQuery = '';
  let currentOrderType = 'Dine In';
  let currentTable = 'Meja 01';
  let activePaymentMethod = 'Tunai';
  let lastCompletedOrder = null;
  let deferredInstallPrompt = null;

  // Customizer state
  let customizingProduct = null;
  let customizerState = {
    temp: 'Iced',
    sugar: 'Normal Sugar',
    addons: [],
    notes: '',
    qty: 1
  };

  // DOM Elements
  const el = {
    displayCafeName: document.getElementById('displayCafeName'),
    currentTableBadge: document.getElementById('currentTableBadge'),
    searchBarWrap: document.getElementById('searchBarWrap'),
    searchInput: document.getElementById('searchInput'),
    btnClearSearch: document.getElementById('btnClearSearch'),
    btnToggleSearch: document.getElementById('btnToggleSearch'),
    btnQuickTable: document.getElementById('btnQuickTable'),
    
    categoryNav: document.getElementById('categoryNav'),
    productsGrid: document.getElementById('productsGrid'),
    emptyProducts: document.getElementById('emptyProducts'),
    btnResetFilter: document.getElementById('btnResetFilter'),
    
    // Floating Cart
    floatingCartBar: document.getElementById('floatingCartBar'),
    cartTotalCount: document.getElementById('cartTotalCount'),
    cartBarTotal: document.getElementById('cartBarTotal'),
    btnOpenCartModal: document.getElementById('btnOpenCartModal'),
    cartBarInfo: document.getElementById('cartBarInfo'),
    
    // Bottom Nav
    bottomNavItems: document.querySelectorAll('.bottom-nav .nav-item'),
    tabViews: document.querySelectorAll('.tab-view'),
    
    // Cart Modal
    cartModalBackdrop: document.getElementById('cartModalBackdrop'),
    btnCloseCartModal: document.getElementById('btnCloseCartModal'),
    cartItemCountSubtitle: document.getElementById('cartItemCountSubtitle'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    taxLine: document.getElementById('taxLine'),
    cartTaxLabel: document.getElementById('cartTaxLabel'),
    cartTaxVal: document.getElementById('cartTaxVal'),
    serviceLine: document.getElementById('serviceLine'),
    cartServiceLabel: document.getElementById('cartServiceLabel'),
    cartServiceVal: document.getElementById('cartServiceVal'),
    cartGrandTotal: document.getElementById('cartGrandTotal'),
    btnClearCart: document.getElementById('btnClearCart'),
    btnProceedToPay: document.getElementById('btnProceedToPay'),
    orderTableName: document.getElementById('orderTableName'),
    btnOrderDineIn: document.getElementById('btnOrderDineIn'),
    btnOrderTakeAway: document.getElementById('btnOrderTakeAway'),
    tableQuickBadges: document.getElementById('tableQuickBadges'),
    
    // Payment Modal
    paymentModalBackdrop: document.getElementById('paymentModalBackdrop'),
    btnClosePayModal: document.getElementById('btnClosePayModal'),
    payGrandTotalDisplay: document.getElementById('payGrandTotalDisplay'),
    payMethodBtns: document.querySelectorAll('.pay-method-btn'),
    cashPaySection: document.getElementById('cashPaySection'),
    cashReceivedInput: document.getElementById('cashReceivedInput'),
    cashChangeDisplay: document.getElementById('cashChangeDisplay'),
    quickCashPills: document.getElementById('quickCashPills'),
    btnConfirmPayment: document.getElementById('btnConfirmPayment'),
    
    // Customizer Modal
    customizerModalBackdrop: document.getElementById('customizerModalBackdrop'),
    btnCloseCustomize: document.getElementById('btnCloseCustomize'),
    customizeItemName: document.getElementById('customizeItemName'),
    customizeItemPrice: document.getElementById('customizeItemPrice'),
    optTemperatureGroup: document.getElementById('optTemperatureGroup'),
    optSugarGroup: document.getElementById('optSugarGroup'),
    addonExtraShot: document.getElementById('addonExtraShot'),
    addonOatMilk: document.getElementById('addonOatMilk'),
    customizeNotes: document.getElementById('customizeNotes'),
    customizerQty: document.getElementById('customizerQty'),
    btnCustomizerQtyDec: document.getElementById('btnCustomizerQtyDec'),
    btnCustomizerQtyInc: document.getElementById('btnCustomizerQtyInc'),
    customizerSubtotalDisplay: document.getElementById('customizerSubtotalDisplay'),
    btnAddCustomizedToCart: document.getElementById('btnAddCustomizedToCart'),
    
    // Receipt Modal
    receiptModalBackdrop: document.getElementById('receiptModalBackdrop'),
    btnCloseReceipt: document.getElementById('btnCloseReceipt'),
    thermalReceipt: document.getElementById('thermalReceipt'),
    btnPrintReceiptNative: document.getElementById('btnPrintReceiptNative'),
    btnShareWhatsApp: document.getElementById('btnShareWhatsApp'),
    btnNewTransaction: document.getElementById('btnNewTransaction'),
    
    // Orders View
    ordersList: document.getElementById('ordersList'),
    emptyOrders: document.getElementById('emptyOrders'),
    orderFilterChips: document.querySelectorAll('.filter-chip-group .chip'),
    btnExportCSV: document.getElementById('btnExportCSV'),
    
    // Menu Admin View
    btnOpenAddProduct: document.getElementById('btnOpenAddProduct'),
    menuAdminList: document.getElementById('menuAdminList'),
    statTotalItems: document.getElementById('statTotalItems'),
    statTotalCategories: document.getElementById('statTotalCategories'),
    statSoldOut: document.getElementById('statSoldOut'),
    productModalBackdrop: document.getElementById('productModalBackdrop'),
    btnCloseProductModal: document.getElementById('btnCloseProductModal'),
    productForm: document.getElementById('productForm'),
    productModalTitle: document.getElementById('productModalTitle'),
    editProductId: document.getElementById('editProductId'),
    prodName: document.getElementById('prodName'),
    prodCategory: document.getElementById('prodCategory'),
    prodPrice: document.getElementById('prodPrice'),
    prodEmoji: document.getElementById('prodEmoji'),
    prodDescription: document.getElementById('prodDescription'),
    prodCustomizable: document.getElementById('prodCustomizable'),
    prodAvailable: document.getElementById('prodAvailable'),
    quickEmojiList: document.getElementById('quickEmojiList'),
    
    // Table Selector Modal
    tableSelectorModalBackdrop: document.getElementById('tableSelectorModalBackdrop'),
    btnCloseTableModal: document.getElementById('btnCloseTableModal'),
    tablesModalGrid: document.getElementById('tablesModalGrid'),
    
    // Report View
    reportTotalSales: document.getElementById('reportTotalSales'),
    reportCountOrders: document.getElementById('reportCountOrders'),
    reportCashSales: document.getElementById('reportCashSales'),
    reportTransferSales: document.getElementById('reportTransferSales'),
    bestSellerList: document.getElementById('bestSellerList'),
    btnResetDayData: document.getElementById('btnResetDayData'),
    btnPrintReport: document.getElementById('btnPrintReport'),
    
    // Settings View
    settingsForm: document.getElementById('settingsForm'),
    settingCafeName: document.getElementById('settingCafeName'),
    settingCafeTagline: document.getElementById('settingCafeTagline'),
    settingCafeAddress: document.getElementById('settingCafeAddress'),
    settingCafePhone: document.getElementById('settingCafePhone'),
    settingTaxRate: document.getElementById('settingTaxRate'),
    settingServiceRate: document.getElementById('settingServiceRate'),
    settingReceiptFooter: document.getElementById('settingReceiptFooter'),
    btnRestoreDemoData: document.getElementById('btnRestoreDemoData'),
    btnInstallPwa: document.getElementById('btnInstallPwa'),
    pwaInstallBox: document.getElementById('pwaInstallBox'),
    
    toastContainer: document.getElementById('toastContainer')
  };

  // ============================================================
  // FORMATTING & HELPERS
  // ============================================================
  function formatRupiah(num) {
    return 'Rp ' + Number(num || 0).toLocaleString('id-ID');
  }

  function showToast(message, icon = 'fa-circle-check') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon} text-amber"></i><span>${message}</span>`;
    el.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2400);
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================
  function init() {
    // Load local storage
    settings = StorageManager.getSettings();
    products = StorageManager.getProducts();
    cart = StorageManager.getCart();
    currentTable = StorageManager.getCurrentTable();

    // Apply header & settings info
    updateHeaderBrand();
    initSettingsForm();

    // Render Categories & Products
    renderCategories();
    renderProducts();
    updateFloatingCart();

    // Setup event listeners
    bindEventListeners();

    // Setup PWA
    setupPWA();
  }

  function updateHeaderBrand() {
    el.displayCafeName.textContent = settings.cafeName || 'KopiKita Cafe';
    el.currentTableBadge.textContent = currentTable;
    if (el.orderTableName) el.orderTableName.value = currentTable;
  }

  // ============================================================
  // CATEGORIES & PRODUCTS RENDERING
  // ============================================================
  function renderCategories() {
    el.categoryNav.innerHTML = '';
    DEFAULT_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-pill ${cat.id === currentCategory ? 'active' : ''}`;
      btn.dataset.category = cat.id;
      btn.innerHTML = `<i class="${cat.icon}"></i> <span>${cat.name}</span>`;
      btn.addEventListener('click', () => {
        currentCategory = cat.id;
        document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts();
      });
      el.categoryNav.appendChild(btn);
    });
  }

  function renderProducts() {
    el.productsGrid.innerHTML = '';

    // Filter by category & search
    const filtered = products.filter(p => {
      const matchCat = (currentCategory === 'all' || p.category === currentCategory);
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      el.emptyProducts.classList.remove('hidden');
    } else {
      el.emptyProducts.classList.add('hidden');
    }

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = `product-card ${!p.available ? 'sold-out' : ''}`;
      card.innerHTML = `
        <div class="prod-img-box">
          <span class="prod-tag">${p.category}</span>
          ${!p.available ? '<span class="prod-sold-out-badge">Habis</span>' : ''}
          <span class="prod-emoji">${p.emoji || '☕'}</span>
        </div>
        <div class="prod-info">
          <h3 class="prod-name">${p.name}</h3>
          <p class="prod-desc">${p.description || ''}</p>
          <div class="prod-bottom-row">
            <span class="prod-price">${formatRupiah(p.price)}</span>
            <button class="prod-add-btn" title="Tambah">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!p.available) {
          showToast('Menu sedang habis (Sold Out)', 'fa-circle-exclamation');
          return;
        }
        // If customizable, open modal
        if (p.customizable) {
          openCustomizer(p);
        } else {
          // Direct add to cart
          quickAddToCart(p);
        }
      });

      el.productsGrid.appendChild(card);
    });
  }

  // ============================================================
  // CUSTOMIZER MODAL (HOT/ICE, SUGAR, ADDONS)
  // ============================================================
  function openCustomizer(product) {
    customizingProduct = product;
    customizerState = {
      temp: 'Iced',
      sugar: 'Normal Sugar',
      addons: [],
      notes: '',
      qty: 1
    };

    el.customizeItemName.textContent = product.name;
    el.customizeItemPrice.textContent = formatRupiah(product.price);
    el.customizeNotes.value = '';
    el.customizerQty.textContent = '1';
    el.addonExtraShot.checked = false;
    el.addonOatMilk.checked = false;

    // Reset pill selections
    document.querySelectorAll('.opt-pill[data-type="temp"]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.val === 'Iced');
    });
    document.querySelectorAll('.opt-pill[data-type="sugar"]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.val === 'Normal Sugar');
    });

    // Hide temperature if not beverage
    if (product.category === 'Food' || product.category === 'Snack') {
      el.optTemperatureGroup.classList.add('hidden');
      el.optSugarGroup.classList.add('hidden');
    } else {
      el.optTemperatureGroup.classList.remove('hidden');
      el.optSugarGroup.classList.remove('hidden');
    }

    updateCustomizerSubtotal();
    el.customizerModalBackdrop.classList.add('active');
  }

  function closeCustomizer() {
    el.customizerModalBackdrop.classList.remove('active');
    customizingProduct = null;
  }

  function updateCustomizerSubtotal() {
    if (!customizingProduct) return;
    let unitPrice = customizingProduct.price;

    if (el.addonExtraShot.checked) unitPrice += 5000;
    if (el.addonOatMilk.checked) unitPrice += 7000;

    const total = unitPrice * customizerState.qty;
    el.customizerSubtotalDisplay.textContent = formatRupiah(total);
  }

  function addCustomizedItemToCart() {
    if (!customizingProduct) return;

    let extraPrice = 0;
    const selectedAddons = [];
    if (el.addonExtraShot.checked) {
      extraPrice += 5000;
      selectedAddons.push('Extra Shot');
    }
    if (el.addonOatMilk.checked) {
      extraPrice += 7000;
      selectedAddons.push('Oat Milk');
    }

    const isBeverage = (customizingProduct.category === 'Coffee' || customizingProduct.category === 'Non-Coffee' || customizingProduct.category === 'Mocktail');

    const variantDesc = isBeverage
      ? `${customizerState.temp} • ${customizerState.sugar}${selectedAddons.length ? ' • ' + selectedAddons.join(', ') : ''}`
      : (selectedAddons.length ? selectedAddons.join(', ') : 'Standard');

    const notes = el.customizeNotes.value.trim();

    // Check if duplicate exists in cart with exact same specs
    const itemKey = `${customizingProduct.id}-${variantDesc}-${notes}`;
    const existingIndex = cart.findIndex(c => c.cartKey === itemKey);

    const unitPrice = customizingProduct.price + extraPrice;

    if (existingIndex > -1) {
      cart[existingIndex].qty += customizerState.qty;
    } else {
      cart.push({
        cartKey: itemKey,
        id: customizingProduct.id,
        name: customizingProduct.name,
        price: unitPrice,
        basePrice: customizingProduct.price,
        qty: customizerState.qty,
        variant: variantDesc,
        notes: notes,
        emoji: customizingProduct.emoji
      });
    }

    StorageManager.saveCart(cart);
    updateFloatingCart();
    closeCustomizer();
    showToast(`+${customizerState.qty} ${customizingProduct.name} ditambahkan`);
  }

  function quickAddToCart(product) {
    const itemKey = `${product.id}-regular-`;
    const existingIndex = cart.findIndex(c => c.cartKey === itemKey);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        cartKey: itemKey,
        id: product.id,
        name: product.name,
        price: product.price,
        basePrice: product.price,
        qty: 1,
        variant: 'Standard',
        notes: '',
        emoji: product.emoji
      });
    }

    StorageManager.saveCart(cart);
    updateFloatingCart();
    showToast(`+1 ${product.name} masuk keranjang`);
  }

  // ============================================================
  // CART & TOTAL CALCULATIONS
  // ============================================================
  function updateFloatingCart() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    el.cartTotalCount.textContent = totalCount;
    el.cartBarTotal.textContent = formatRupiah(subtotal);

    if (totalCount > 0) {
      el.floatingCartBar.classList.add('visible');
    } else {
      el.floatingCartBar.classList.remove('visible');
      el.cartModalBackdrop.classList.remove('active');
    }
  }

  function calculateCartTotals() {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const taxRate = Number(settings.taxRate || 0);
    const serviceRate = Number(settings.serviceRate || 0);

    const tax = Math.round(subtotal * (taxRate / 100));
    const service = Math.round(subtotal * (serviceRate / 100));
    const grandTotal = subtotal + tax + service;

    return { subtotal, taxRate, tax, serviceRate, service, grandTotal };
  }

  function renderCartModal() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    el.cartItemCountSubtitle.textContent = `${totalCount} Item`;

    el.cartItemsList.innerHTML = '';
    if (cart.length === 0) {
      el.cartItemsList.innerHTML = `<div class="empty-state"><i class="fa-solid fa-basket-shopping"></i><p>Keranjang kosong</p></div>`;
      el.cartGrandTotal.textContent = 'Rp 0';
      return;
    }

    cart.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-info">
          <div class="cart-item-title">${item.emoji || '☕'} ${item.name}</div>
          <span class="cart-item-variant">${item.variant}</span>
          ${item.notes ? `<small style="color:#806857;display:block;">"${item.notes}"</small>` : ''}
          <div class="cart-item-price">${formatRupiah(item.price * item.qty)} <small style="color:#ba9e8b;">(${formatRupiah(item.price)}/item)</small></div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn ${item.qty === 1 ? 'trash' : ''}" data-index="${index}" data-action="dec">
            <i class="fa-solid ${item.qty === 1 ? 'fa-trash' : 'fa-minus'}"></i>
          </button>
          <span class="cart-qty-val">${item.qty}</span>
          <button class="cart-qty-btn" data-index="${index}" data-action="inc">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      `;
      el.cartItemsList.appendChild(row);
    });

    // Totals
    const totals = calculateCartTotals();
    el.cartSubtotal.textContent = formatRupiah(totals.subtotal);

    if (totals.taxRate > 0) {
      el.taxLine.classList.remove('hidden');
      el.cartTaxLabel.textContent = `Pajak PB1 (${totals.taxRate}%)`;
      el.cartTaxVal.textContent = formatRupiah(totals.tax);
    } else {
      el.taxLine.classList.add('hidden');
    }

    if (totals.serviceRate > 0) {
      el.serviceLine.classList.remove('hidden');
      el.cartServiceLabel.textContent = `Service Charge (${totals.serviceRate}%)`;
      el.cartServiceVal.textContent = formatRupiah(totals.service);
    } else {
      el.serviceLine.classList.add('hidden');
    }

    el.cartGrandTotal.textContent = formatRupiah(totals.grandTotal);
  }

  // ============================================================
  // PAYMENT MODAL FLOW
  // ============================================================
  function openPaymentModal() {
    if (cart.length === 0) {
      showToast('Keranjang masih kosong', 'fa-triangle-exclamation');
      return;
    }

    // Read Table & Order Type
    currentTable = el.orderTableName.value.trim() || 'Meja 01';
    StorageManager.saveCurrentTable(currentTable);
    el.currentTableBadge.textContent = currentTable;

    const totals = calculateCartTotals();
    el.payGrandTotalDisplay.textContent = formatRupiah(totals.grandTotal);

    // Reset Cash input
    el.cashReceivedInput.value = '';
    calculateCashChange(0, totals.grandTotal);

    // Default method: Tunai
    selectPaymentMethod('Tunai');

    el.cartModalBackdrop.classList.remove('active');
    el.paymentModalBackdrop.classList.add('active');
  }

  function selectPaymentMethod(method) {
    activePaymentMethod = method;
    el.payMethodBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });
    el.cashPaySection.classList.remove('hidden');
  }

  function calculateCashChange(received, grandTotal) {
    const change = received - grandTotal;
    if (change >= 0) {
      el.cashChangeDisplay.textContent = formatRupiah(change);
      el.cashChangeDisplay.style.color = 'var(--success)';
    } else {
      el.cashChangeDisplay.textContent = `Kurang ${formatRupiah(Math.abs(change))}`;
      el.cashChangeDisplay.style.color = 'var(--danger)';
    }
  }

  function handleConfirmPayment() {
    const totals = calculateCartTotals();
    let cashGiven = totals.grandTotal;

    if (activePaymentMethod === 'Tunai') {
      cashGiven = Number(el.cashReceivedInput.value) || 0;
      if (cashGiven < totals.grandTotal) {
        showToast('Nominal uang tunai kurang!', 'fa-circle-xmark');
        return;
      }
    }

    const orderNumber = 'KP-' + Date.now().toString().slice(-6);
    const now = new Date();

    const orderRecord = {
      orderId: orderNumber,
      timestamp: now.toISOString(),
      formattedDate: now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      formattedTime: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      orderType: currentOrderType,
      table: currentTable,
      items: JSON.parse(JSON.stringify(cart)),
      subtotal: totals.subtotal,
      tax: totals.tax,
      service: totals.service,
      grandTotal: totals.grandTotal,
      paymentMethod: activePaymentMethod,
      cashReceived: cashGiven,
      cashChange: cashGiven - totals.grandTotal
    };

    // Save to storage
    StorageManager.saveOrder(orderRecord);
    lastCompletedOrder = orderRecord;

    // Clear cart
    cart = [];
    StorageManager.clearCart();
    updateFloatingCart();

    // Close pay modal & open receipt
    el.paymentModalBackdrop.classList.remove('active');
    showReceiptModal(orderRecord);
    showToast(`Transaksi ${orderNumber} Berhasil!`, 'fa-circle-check');
  }

  // ============================================================
  // THERMAL RECEIPT RENDERING & SHARING
  // ============================================================
  function showReceiptModal(order) {
    if (!order) return;
    lastCompletedOrder = order;

    el.thermalReceipt.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-cafe-title">${settings.cafeName || 'KOPIKITA CAFE'}</div>
        <div class="receipt-cafe-sub">${settings.tagline || ''}</div>
        <div class="receipt-cafe-sub">${settings.address || ''}</div>
        <div class="receipt-cafe-sub">Telp: ${settings.phone || '-'}</div>
      </div>

      <div class="receipt-meta">
        <div class="receipt-meta-row"><span>No. Struk:</span> <strong>#${order.orderId}</strong></div>
        <div class="receipt-meta-row"><span>Waktu:</span> <span>${order.formattedDate} ${order.formattedTime}</span></div>
        <div class="receipt-meta-row"><span>Tipe/Meja:</span> <strong>${order.orderType} • ${order.table}</strong></div>
        <div class="receipt-meta-row"><span>Kasir:</span> <span>Kasir Utama</span></div>
      </div>

      <div class="receipt-items-table">
        ${order.items.map(item => `
          <div class="rc-item-row">
            <div>
              <span class="rc-item-name">${item.name}</span>
              <div class="rc-item-variant">${item.variant}</div>
              ${item.notes ? `<div class="rc-item-variant"><i>"${item.notes}"</i></div>` : ''}
              <div style="font-size:10px;color:#555;">${item.qty} x ${formatRupiah(item.price)}</div>
            </div>
            <div style="font-weight:600;">${formatRupiah(item.qty * item.price)}</div>
          </div>
        `).join('')}
      </div>

      <div class="receipt-calc">
        <div class="rc-calc-row"><span>Subtotal:</span> <span>${formatRupiah(order.subtotal)}</span></div>
        ${order.tax > 0 ? `<div class="rc-calc-row"><span>PB1:</span> <span>${formatRupiah(order.tax)}</span></div>` : ''}
        ${order.service > 0 ? `<div class="rc-calc-row"><span>Service:</span> <span>${formatRupiah(order.service)}</span></div>` : ''}
        <div class="rc-calc-row bold"><span>TOTAL:</span> <span>${formatRupiah(order.grandTotal)}</span></div>
        <div class="rc-calc-row" style="margin-top:6px;"><span>Bayar (${order.paymentMethod}):</span> <span>${formatRupiah(order.cashReceived)}</span></div>
        ${order.paymentMethod === 'Tunai' ? `<div class="rc-calc-row"><span>Kembalian:</span> <span>${formatRupiah(order.cashChange)}</span></div>` : ''}
      </div>

      <div class="receipt-footer">
        <p>${(settings.receiptFooter || 'Terima kasih atas kunjungan Anda!').replace(/\n/g, '<br>')}</p>
        <div class="receipt-barcode">||| | ||||| || |||</div>
        <small style="color:#777;margin-top:4px;display:block;">Powered by KopiKita POS</small>
      </div>
    `;

    el.receiptModalBackdrop.classList.add('active');
  }

  function shareReceiptToWhatsApp() {
    if (!lastCompletedOrder) return;
    const o = lastCompletedOrder;

    let text = `*☕ STRUK PEMBAYARAN ${settings.cafeName.toUpperCase()}*\n`;
    text += `--------------------------------\n`;
    text += `No. Transaksi: #${o.orderId}\n`;
    text += `Waktu: ${o.formattedDate} ${o.formattedTime}\n`;
    text += `Pesanan: ${o.orderType} (${o.table})\n`;
    text += `--------------------------------\n`;
    
    o.items.forEach(item => {
      text += `• ${item.name} x${item.qty} = ${formatRupiah(item.price * item.qty)}\n`;
      if (item.variant && item.variant !== 'Standard') {
        text += `  _${item.variant}_\n`;
      }
    });

    text += `--------------------------------\n`;
    text += `Subtotal: ${formatRupiah(o.subtotal)}\n`;
    if (o.tax > 0) text += `PB1: ${formatRupiah(o.tax)}\n`;
    text += `*TOTAL: ${formatRupiah(o.grandTotal)}*\n`;
    text += `Metode: ${o.paymentMethod}\n`;
    if (o.paymentMethod === 'Tunai') {
      text += `Kembalian: ${formatRupiah(o.cashChange)}\n`;
    }
    text += `--------------------------------\n`;
    text += `${settings.receiptFooter || 'Terima kasih sudah ngopi bersama kami!'}\n`;

    const encoded = encodeURI(text);
    const waUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(waUrl, '_blank');
  }

  // ============================================================
  // ORDERS HISTORY VIEW
  // ============================================================
  function renderOrdersView(filter = 'all') {
    const orders = StorageManager.getOrders();
    el.ordersList.innerHTML = '';

    const filtered = orders.filter(o => {
      if (filter === 'dine_in') return o.orderType === 'Dine In';
      if (filter === 'take_away') return o.orderType === 'Take Away';
      return true;
    });

    if (filtered.length === 0) {
      el.emptyOrders.classList.remove('hidden');
      return;
    }
    el.emptyOrders.classList.add('hidden');

    filtered.forEach(order => {
      const card = document.createElement('div');
      card.className = 'order-card';
      const itemsSummary = order.items.map(i => `${i.name} (x${i.qty})`).join(', ');

      card.innerHTML = `
        <div class="order-card-header">
          <span class="order-id">#${order.orderId}</span>
          <span class="order-badge paid">${order.paymentMethod} • ${order.orderType}</span>
        </div>
        <div class="order-card-body">
          <small><i class="fa-regular fa-clock"></i> ${order.formattedDate} ${order.formattedTime} • Meja: ${order.table}</small>
          <p style="margin-top:4px;color:#f5ece4;">${itemsSummary}</p>
        </div>
        <div class="order-card-footer">
          <span class="order-total-val">${formatRupiah(order.grandTotal)}</span>
          <div class="order-actions">
            <button class="btn btn-outline btn-sm btn-view-receipt" data-id="${order.orderId}">
              <i class="fa-solid fa-receipt"></i> Struk
            </button>
          </div>
        </div>
      `;

      card.querySelector('.btn-view-receipt').addEventListener('click', () => {
        showReceiptModal(order);
      });

      el.ordersList.appendChild(card);
    });
  }

  function exportOrdersToCSV() {
    const orders = StorageManager.getOrders();
    if (orders.length === 0) {
      showToast('Tidak ada data transaksi untuk diekspor', 'fa-circle-info');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID Transaksi,Tanggal,Waktu,Tipe,Meja,Item,Total,Metode Bayar\n";

    orders.forEach(o => {
      const itemsStr = o.items.map(i => `${i.name}(x${i.qty})`).join('; ');
      csvContent += `"${o.orderId}","${o.formattedDate}","${o.formattedTime}","${o.orderType}","${o.table}","${itemsStr}","${o.grandTotal}","${o.paymentMethod}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Kasir_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Laporan berhasil diekspor ke CSV!');
  }

  // ============================================================
  // MENU MANAGEMENT VIEW (ADMIN)
  // ============================================================
  function renderMenuAdmin() {
    el.menuAdminList.innerHTML = '';
    const totalItems = products.length;
    const categoriesSet = new Set(products.map(p => p.category));
    const soldOutCount = products.filter(p => !p.available).length;

    el.statTotalItems.textContent = totalItems;
    el.statTotalCategories.textContent = categoriesSet.size;
    el.statSoldOut.textContent = soldOutCount;

    products.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = 'menu-item-row';
      row.innerHTML = `
        <div class="menu-item-left">
          <div class="menu-item-emoji">${p.emoji || '☕'}</div>
          <div class="menu-item-info">
            <strong>${p.name}</strong>
            <span>${formatRupiah(p.price)} • <small style="color:#ba9e8b;">${p.category}</small></span>
          </div>
        </div>
        <div class="menu-item-ctrls">
          <label class="switch" title="Stok Tersedia/Habis">
            <input type="checkbox" class="toggle-stock" data-id="${p.id}" ${p.available ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
          <button class="icon-btn btn-edit-prod" data-id="${p.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
          <button class="icon-btn btn-del-prod" data-id="${p.id}" title="Hapus" style="color:var(--danger);"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;

      // Toggle stock
      row.querySelector('.toggle-stock').addEventListener('change', (e) => {
        p.available = e.target.checked;
        StorageManager.saveProducts(products);
        renderProducts();
        renderMenuAdmin();
        showToast(`Stok ${p.name} diubah jadi ${p.available ? 'Ready' : 'Habis'}`);
      });

      // Edit
      row.querySelector('.btn-edit-prod').addEventListener('click', () => {
        openEditProductModal(p);
      });

      // Delete
      row.querySelector('.btn-del-prod').addEventListener('click', () => {
        if (confirm(`Yakin ingin menghapus menu "${p.name}"?`)) {
          products = products.filter(item => item.id !== p.id);
          StorageManager.saveProducts(products);
          renderProducts();
          renderMenuAdmin();
          showToast(`Menu ${p.name} berhasil dihapus`);
        }
      });

      el.menuAdminList.appendChild(row);
    });
  }

  function openEditProductModal(prod = null) {
    if (prod) {
      el.productModalTitle.textContent = 'Edit Menu';
      el.editProductId.value = prod.id;
      el.prodName.value = prod.name;
      el.prodCategory.value = prod.category;
      el.prodPrice.value = prod.price;
      el.prodEmoji.value = prod.emoji || '☕';
      el.prodDescription.value = prod.description || '';
      el.prodCustomizable.checked = prod.customizable !== false;
      el.prodAvailable.checked = prod.available !== false;
    } else {
      el.productModalTitle.textContent = 'Tambah Menu Baru';
      el.productForm.reset();
      el.editProductId.value = '';
      el.prodEmoji.value = '☕';
      el.prodCustomizable.checked = true;
      el.prodAvailable.checked = true;
    }
    el.productModalBackdrop.classList.add('active');
  }

  function handleSaveProduct(e) {
    e.preventDefault();
    const id = el.editProductId.value;
    const name = el.prodName.value.trim();
    const category = el.prodCategory.value;
    const price = Number(el.prodPrice.value);
    const emoji = el.prodEmoji.value.trim() || '☕';
    const description = el.prodDescription.value.trim();
    const customizable = el.prodCustomizable.checked;
    const available = el.prodAvailable.checked;

    if (!name || price <= 0) {
      alert('Mohon isi nama menu dan harga yang valid');
      return;
    }

    if (id) {
      // Edit existing
      const idx = products.findIndex(p => p.id === id);
      if (idx > -1) {
        products[idx] = { ...products[idx], name, category, price, emoji, description, customizable, available };
        showToast(`Menu ${name} berhasil diperbarui`);
      }
    } else {
      // Add new
      const newProd = {
        id: 'p_' + Date.now(),
        name,
        category,
        price,
        emoji,
        description,
        customizable,
        available
      };
      products.unshift(newProd);
      showToast(`Menu baru ${name} ditambahkan!`);
    }

    StorageManager.saveProducts(products);
    el.productModalBackdrop.classList.remove('active');
    renderProducts();
    renderMenuAdmin();
  }

  // ============================================================
  // REPORT VIEW
  // ============================================================
  function renderReportView() {
    const orders = StorageManager.getOrders();
    const totalSales = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
    const cashSales = orders.filter(o => o.paymentMethod === 'Tunai').reduce((sum, o) => sum + o.grandTotal, 0);
    el.reportTotalSales.textContent = formatRupiah(totalSales);
    el.reportCountOrders.textContent = `${orders.length} Transaksi`;
    el.reportCashSales.textContent = formatRupiah(cashSales);

    // Calculate best selling items
    const itemMap = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        if (!itemMap[item.name]) itemMap[item.name] = { count: 0, revenue: 0, emoji: item.emoji || '☕' };
        itemMap[item.name].count += item.qty;
        itemMap[item.name].revenue += (item.price * item.qty);
      });
    });

    const sortedItems = Object.entries(itemMap).sort((a, b) => b[1].count - a[1].count).slice(0, 5);

    el.bestSellerList.innerHTML = '';
    if (sortedItems.length === 0) {
      el.bestSellerList.innerHTML = '<p style="font-size:0.8rem;color:#ba9e8b;">Belum ada penjualan hari ini.</p>';
      return;
    }

    sortedItems.forEach(([name, data], i) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'best-seller-item';
      itemEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-weight:800;color:var(--accent);">#${i + 1}</span>
          <span>${data.emoji} <strong>${name}</strong></span>
        </div>
        <div style="text-align:right;">
          <strong style="color:var(--primary-light);">${data.count} terjual</strong>
          <small style="display:block;color:#ba9e8b;font-size:0.75rem;">${formatRupiah(data.revenue)}</small>
        </div>
      `;
      el.bestSellerList.appendChild(itemEl);
    });
  }

  // ============================================================
  // SETTINGS FORM
  // ============================================================
  function initSettingsForm() {
    el.settingCafeName.value = settings.cafeName || '';
    el.settingCafeTagline.value = settings.tagline || '';
    el.settingCafeAddress.value = settings.address || '';
    el.settingCafePhone.value = settings.phone || '';
    el.settingTaxRate.value = settings.taxRate || 0;
    el.settingServiceRate.value = settings.serviceRate || 0;
    el.settingReceiptFooter.value = settings.receiptFooter || '';
  }

  function handleSaveSettings(e) {
    e.preventDefault();
    settings = {
      cafeName: el.settingCafeName.value.trim(),
      tagline: el.settingCafeTagline.value.trim(),
      address: el.settingCafeAddress.value.trim(),
      phone: el.settingCafePhone.value.trim(),
      taxRate: parseFloat(el.settingTaxRate.value) || 0,
      serviceRate: parseFloat(el.settingServiceRate.value) || 0,
      receiptFooter: el.settingReceiptFooter.value.trim()
    };
    StorageManager.saveSettings(settings);
    updateHeaderBrand();
    showToast('Pengaturan Cafe Berhasil Disimpan!', 'fa-circle-check');
  }

  // ============================================================
  // TABLE SELECTOR MODAL
  // ============================================================
  function renderTableSelectorModal() {
    el.tablesModalGrid.innerHTML = '';
    DEFAULT_TABLES.forEach(tName => {
      const item = document.createElement('div');
      item.className = `table-modal-item ${currentTable === tName ? 'active' : ''}`;
      item.innerHTML = `
        <i class="fa-solid fa-chair"></i>
        <span>${tName}</span>
      `;
      item.addEventListener('click', () => {
        currentTable = tName;
        StorageManager.saveCurrentTable(tName);
        el.currentTableBadge.textContent = tName;
        if (el.orderTableName) el.orderTableName.value = tName;
        el.tableSelectorModalBackdrop.classList.remove('active');
        showToast(`Meja aktif: ${tName}`);
      });
      el.tablesModalGrid.appendChild(item);
    });
  }

  // ============================================================
  // PWA INSTALLATION HELPER
  // ============================================================
  function setupPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      if (el.pwaInstallBox) el.pwaInstallBox.classList.remove('hidden');
    });

    if (el.btnInstallPwa) {
      el.btnInstallPwa.addEventListener('click', async () => {
        if (!deferredInstallPrompt) {
          alert('Untuk menginstall di Android: Buka menu Chrome (titik tiga di kanan atas) -> Ketuk "Tambahkan ke Layar Utama / Install App".');
          return;
        }
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          showToast('Aplikasi berhasil dipasang di layar HP!');
        }
        deferredInstallPrompt = null;
      });
    }

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').then(() => {
        console.log('KopiKita ServiceWorker registered');
      }).catch(err => {
        console.log('SW registration error:', err);
      });
    }
  }

  // ============================================================
  // EVENT LISTENERS BINDING
  // ============================================================
  function bindEventListeners() {
    // Bottom Nav Switching
    el.bottomNavItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.dataset.target;
        el.bottomNavItems.forEach(b => b.classList.remove('active'));
        item.classList.add('active');

        el.tabViews.forEach(view => {
          view.classList.toggle('active', view.id === targetId);
        });

        // Specific view renders
        if (targetId === 'view-orders') renderOrdersView();
        if (targetId === 'view-menu') renderMenuAdmin();
        if (targetId === 'view-report') renderReportView();
      });
    });

    // Search Toggle & Input
    el.btnToggleSearch.addEventListener('click', () => {
      el.searchBarWrap.classList.toggle('active');
      if (el.searchBarWrap.classList.contains('active')) {
        el.searchInput.focus();
      }
    });

    el.searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });

    el.btnClearSearch.addEventListener('click', () => {
      el.searchInput.value = '';
      searchQuery = '';
      renderProducts();
      el.searchBarWrap.classList.remove('active');
    });

    el.btnResetFilter.addEventListener('click', () => {
      currentCategory = 'all';
      searchQuery = '';
      el.searchInput.value = '';
      renderCategories();
      renderProducts();
    });

    // Quick Table Trigger
    el.btnQuickTable.addEventListener('click', () => {
      renderTableSelectorModal();
      el.tableSelectorModalBackdrop.classList.add('active');
    });
    el.btnCloseTableModal.addEventListener('click', () => {
      el.tableSelectorModalBackdrop.classList.remove('active');
    });

    // Floating Cart Trigger
    el.btnOpenCartModal.addEventListener('click', () => {
      renderCartModal();
      el.cartModalBackdrop.classList.add('active');
    });
    el.cartBarInfo.addEventListener('click', () => {
      renderCartModal();
      el.cartModalBackdrop.classList.add('active');
    });
    el.btnCloseCartModal.addEventListener('click', () => {
      el.cartModalBackdrop.classList.remove('active');
    });

    // Cart Quantity +/- & Delete
    el.cartItemsList.addEventListener('click', (e) => {
      const btn = e.target.closest('.cart-qty-btn');
      if (!btn) return;
      const index = parseInt(btn.dataset.index, 10);
      const action = btn.dataset.action;

      if (action === 'inc') {
        cart[index].qty += 1;
      } else if (action === 'dec') {
        if (cart[index].qty > 1) {
          cart[index].qty -= 1;
        } else {
          cart.splice(index, 1);
        }
      }

      StorageManager.saveCart(cart);
      updateFloatingCart();
      renderCartModal();
    });

    // Clear Cart
    el.btnClearCart.addEventListener('click', () => {
      if (confirm('Kosongkan semua pesanan di keranjang?')) {
        cart = [];
        StorageManager.clearCart();
        updateFloatingCart();
        el.cartModalBackdrop.classList.remove('active');
        showToast('Keranjang dikosongkan');
      }
    });

    // Order Type Dine In / Take Away
    el.btnOrderDineIn.addEventListener('click', () => {
      currentOrderType = 'Dine In';
      el.btnOrderDineIn.classList.add('active');
      el.btnOrderTakeAway.classList.remove('active');
    });
    el.btnOrderTakeAway.addEventListener('click', () => {
      currentOrderType = 'Take Away';
      el.btnOrderTakeAway.classList.add('active');
      el.btnOrderDineIn.classList.remove('active');
    });

    // Quick table badges in cart
    if (el.tableQuickBadges) {
      el.tableQuickBadges.addEventListener('click', (e) => {
        const badge = e.target.closest('.t-badge');
        if (!badge) return;
        el.orderTableName.value = badge.dataset.tbl;
      });
    }

    // Proceed to Pay
    el.btnProceedToPay.addEventListener('click', openPaymentModal);
    el.btnClosePayModal.addEventListener('click', () => {
      el.paymentModalBackdrop.classList.remove('active');
    });

    // Payment Methods Switch
    el.payMethodBtns.forEach(btn => {
      btn.addEventListener('click', () => selectPaymentMethod(btn.dataset.method));
    });

    // Cash Input & Calculation
    el.cashReceivedInput.addEventListener('input', (e) => {
      const totals = calculateCartTotals();
      const val = Number(e.target.value) || 0;
      calculateCashChange(val, totals.grandTotal);
    });

    // Quick Cash Pills
    el.quickCashPills.addEventListener('click', (e) => {
      const pill = e.target.closest('.cash-pill');
      if (!pill) return;
      const amount = pill.dataset.amount;
      const totals = calculateCartTotals();

      if (amount === 'exact') {
        el.cashReceivedInput.value = totals.grandTotal;
      } else {
        el.cashReceivedInput.value = amount;
      }
      calculateCashChange(Number(el.cashReceivedInput.value), totals.grandTotal);
    });

    // Confirm Payment
    el.btnConfirmPayment.addEventListener('click', handleConfirmPayment);

    // Customizer Modal
    el.btnCloseCustomize.addEventListener('click', closeCustomizer);
    
    // Customizer options toggle
    document.querySelectorAll('.opt-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;
        document.querySelectorAll(`.opt-pill[data-type="${type}"]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        customizerState[type] = val;
      });
    });

    el.addonExtraShot.addEventListener('change', updateCustomizerSubtotal);
    el.addonOatMilk.addEventListener('change', updateCustomizerSubtotal);

    el.btnCustomizerQtyDec.addEventListener('click', () => {
      if (customizerState.qty > 1) {
        customizerState.qty--;
        el.customizerQty.textContent = customizerState.qty;
        updateCustomizerSubtotal();
      }
    });

    el.btnCustomizerQtyInc.addEventListener('click', () => {
      customizerState.qty++;
      el.customizerQty.textContent = customizerState.qty;
      updateCustomizerSubtotal();
    });

    el.btnAddCustomizedToCart.addEventListener('click', addCustomizedItemToCart);

    // Receipt Modal Actions
    el.btnCloseReceipt.addEventListener('click', () => {
      el.receiptModalBackdrop.classList.remove('active');
    });

    el.btnPrintReceiptNative.addEventListener('click', () => {
      window.print();
    });

    el.btnShareWhatsApp.addEventListener('click', shareReceiptToWhatsApp);

    el.btnNewTransaction.addEventListener('click', () => {
      el.receiptModalBackdrop.classList.remove('active');
      // Switch back to POS view
      document.querySelector('.nav-item[data-target="view-pos"]').click();
    });

    // Orders Filter Chips
    el.orderFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        el.orderFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderOrdersView(chip.dataset.filter);
      });
    });

    el.btnExportCSV.addEventListener('click', exportOrdersToCSV);

    // Menu Management Actions
    el.btnOpenAddProduct.addEventListener('click', () => openEditProductModal(null));
    el.btnCloseProductModal.addEventListener('click', () => {
      el.productModalBackdrop.classList.remove('active');
    });
    el.productForm.addEventListener('submit', handleSaveProduct);

    // Quick emoji click in product modal
    if (el.quickEmojiList) {
      el.quickEmojiList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
          el.prodEmoji.value = e.target.textContent;
        }
      });
    }

    // Reset Daily Orders Data
    el.btnResetDayData.addEventListener('click', () => {
      if (confirm('PERINGATAN: Apakah Anda yakin ingin menghapus seluruh riwayat transaksi hari ini?')) {
        StorageManager.clearOrders();
        renderReportView();
        showToast('Riwayat transaksi berhasil direset');
      }
    });

    el.btnPrintReport.addEventListener('click', () => {
      window.print();
    });

    // Settings
    el.settingsForm.addEventListener('submit', handleSaveSettings);

    el.btnRestoreDemoData.addEventListener('click', () => {
      if (confirm('Kembalikan semua daftar menu dan pengaturan ke contoh awal bawaan cafe?')) {
        StorageManager.resetAllToDemo();
        products = StorageManager.getProducts();
        settings = StorageManager.getSettings();
        cart = [];
        updateHeaderBrand();
        initSettingsForm();
        renderCategories();
        renderProducts();
        updateFloatingCart();
        showToast('Data demo berhasil dimuat ulang!');
      }
    });
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();
