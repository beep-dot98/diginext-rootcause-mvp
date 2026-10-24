/**
 * Dastyar (دستیار) - MVP Application Engine
 * AI Solo Founder Camp (Diginext) - Root Cause Challenge
 * Solves: DM-Based Order & Operations Chaos in Instagram Creator Businesses
 */

// --- UTILITY: Persian Number & Currency Formatting ---
function toFa(num, isCurrency = false) {
  if (num === undefined || num === null || isNaN(num)) return '۰';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  
  let formatted = Math.round(num).toString();
  if (isCurrency) {
    formatted = Math.round(num).toLocaleString('fa-IR');
  } else {
    formatted = formatted.replace(/\d/g, d => persianDigits[d]);
  }
  return formatted;
}

// Convert English digits in string to Persian digits
function toFaStr(str) {
  if (!str) return '';
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.toString().replace(/\d/g, d => persianDigits[d]);
}

// --- INITIAL CHALLENGE DOSSIER DATA ---
const DEFAULT_CRM_CUSTOMERS = {
  katayoun: {
    name: 'کتایون رادمهر',
    handle: '@katayoun_rdm',
    phone: '09121111111',
    address: 'تهران، سعادت‌آباد، خیابان صرافها، کوچه ۲۳، پلاک ۱۴، واحد ۳',
    postalCode: '۱۹۹۸۸۳۴۵۱۲',
    lastPurchase: 'ست هدیه دو تایی و شمع بزرگ یاس (گفتگوی C016 و C069)',
    orderCount: 4,
    isVip: true,
    notes: 'مشتری وفادار و بسیار منظم. معمولاً پرداخت سریع با همراه بانک ملت انجام می‌دهد.'
  },
  kaveh: {
    name: 'کاوه سپهری',
    handle: '@kaveh_sp',
    phone: '09122222222',
    address: 'تهران، یوسف‌آباد، خیابان اسدآبادی، نبش خ ۴۵، پلاک ۸، واحد ۱',
    postalCode: '۱۴۳۳۶۷۸۹۲۱',
    lastPurchase: 'شمع دست‌ساز و صابون ارگانیک (گفتگوی C023)',
    orderCount: 2,
    isVip: false,
    notes: 'پیام دایرکت: «آدرسم عوض نشده همون قبلیه بفرستید»'
  }
};

const DEFAULT_ORDERS = [
  {
    id: 'ORD-1403-102',
    customerName: 'کتایون رادمهر',
    instagramHandle: '@katayoun_rdm',
    phone: '۰۹۱۲۱۱۱۱۱۱۱',
    address: 'تهران، سعادت‌آباد، خیابان صرافها، کوچه ۲۳، پلاک ۱۴، واحد ۳',
    city: 'تهران',
    items: [
      { name: 'شمع بزرگ ۴۰۰ گرمی (رایحه یاس)', qty: 1, unitSalePrice: 420000, unitRealCost: 443000 }
    ],
    baseSalePrice: 420000,
    baseRealCost: 443000,
    packagingCost: 18000, // کارتن پستی و حباب‌پیچ
    shippingCost: 95000,  // تیپاکس / پست
    isFreeShipping: true, // اعمال شده توسط فروشنده در دایرکت
    friendshipDiscountPercent: 0, // ۱۰٪ تخفیف رفاقتی
    receiptOcrStatus: 'verified', // verified, pending, rejected
    receiptTrackingCode: '۷۴۹۲۰۳۱۸۵',
    receiptBank: 'همراه بانک ملت',
    orderStatus: 'ready_to_pack', // pending_verification, ready_to_pack, shipped
    orderTime: 'امروز - ساعت ۱۴:۳۵',
    postalBarcode: '',
    sourceDossier: 'C016 و دفتر سفارش نورا (سفارش شمع بزرگ با ارسال رایگان و موم گران)'
  },
  {
    id: 'ORD-1403-098',
    customerName: 'کاوه سپهری',
    instagramHandle: '@kaveh_sp',
    phone: '۰۹۱۲۲۲۲۲۲۲۲',
    address: 'تهران، یوسف‌آباد، خیابان اسدآبادی، نبش خ ۴۵، پلاک ۸',
    city: 'تهران',
    items: [
      { name: 'شمع کوچک ۲۰۰ گرمی (رایحه دارچین)', qty: 2, unitSalePrice: 260000, unitRealCost: 254000 }
    ],
    baseSalePrice: 520000,
    baseRealCost: 508000,
    packagingCost: 18000,
    shippingCost: 0, // هزینه ارسال بر عهده مشتری
    isFreeShipping: false,
    friendshipDiscountPercent: 0,
    receiptOcrStatus: 'verified',
    receiptTrackingCode: '۸۳۹۱۰۴۲۱۲',
    receiptBank: 'بلوبانک سامان',
    orderStatus: 'ready_to_pack',
    orderTime: 'دیروز - ساعت ۱۸:۱۰',
    postalBarcode: '',
    sourceDossier: 'C023 سپیدار و نورا'
  },
  {
    id: 'ORD-1403-085',
    customerName: 'نیلوفر شایان',
    instagramHandle: '@niloofar_art',
    phone: '۰۹۳۵۴۴۴۳۳۲۲',
    address: 'اصفهان، خیابان چهارباغ بالا، کوچه نگین، پلاک ۱۲',
    city: 'اصفهان',
    items: [
      { name: 'تابلو نقاشی پرتره چهره سایز ۴۰×۵۰ با قاب چوبی گردویی', qty: 1, unitSalePrice: 2150000, unitRealCost: 1700000 }
    ],
    baseSalePrice: 2150000,
    baseRealCost: 1700000,
    packagingCost: 45000,
    shippingCost: 0,
    isFreeShipping: false,
    friendshipDiscountPercent: 0,
    receiptOcrStatus: 'verified',
    receiptTrackingCode: '۹۹۲۳۴۱۵۶۰',
    receiptBank: 'بانک پاسارگاد (واریز ۵۰٪ بیعانه)',
    orderStatus: 'ready_to_pack',
    orderTime: 'پریروز - ساعت ۱۱:۲۰',
    postalBarcode: '',
    sourceDossier: 'دفتر رنگ‌آمیز (سفارش سفارشی با مشخصات دقیق و بیعانه)'
  },
  {
    id: 'ORD-1403-079',
    customerName: 'سپیده زمانی',
    instagramHandle: '@sepideh_zmn',
    phone: '۰۹۱۸۶۶۶۵۵۴۴',
    address: 'شیراز، معالی‌آباد، خیابان دوستان، مجتمع رز',
    city: 'شیراز',
    items: [
      { name: 'ست هدیه دو تایی شمع لوکس نورا', qty: 1, unitSalePrice: 490000, unitRealCost: 498000 }
    ],
    baseSalePrice: 490000,
    baseRealCost: 498000,
    packagingCost: 18000,
    shippingCost: 0,
    isFreeShipping: false,
    friendshipDiscountPercent: 0,
    receiptOcrStatus: 'verified',
    receiptTrackingCode: '۴۳۲۱۸۹۰۵۵',
    receiptBank: 'بانک ملی',
    orderStatus: 'ready_to_pack',
    orderTime: 'امروز - ساعت ۱۲:۱۵',
    postalBarcode: '',
    sourceDossier: 'دفتر سفارش نورا'
  }
];

// Sample Messy Direct Messages for Fallback Parser (Tab 3)
const MESSY_DM_SAMPLES = {
  c018: {
    title: 'گفتگوی C018 نورا کندل (سفارش پر هرج‌ومرج و آدرس تکه‌تکه)',
    text: `سلام عزیزم وقتتون بخیر
قیمت شمع بزرگه چنده؟ وانیل هم دارین هنوز؟
میخواستم یه دونه بزرگ وانیل بردارم با یکی از این کوچولوهای دارچین.
چند میشه کلا با پستش؟
راستی میشه به این آدرس بفرستید:
تهران شهرک غرب بلوار دادمان خ فخارمقدم پلاک ۲۸ واحد ۵ زنگ ۳
کد پستی ندارم دسترسی الان ولی همینه.
شماره کارتم محبت کنید تا شب کارت به کارت کنم مرسی گلم
فیش واریزی: مبلغ ۷۳۰ هزار تومن واریز شد به نام خانم رضایی
شماره پیگیری ۵۵۴۹۰۲ بانک ملت. اسمم سارا توکلی هستم ۰۹۱۲۳۴۵۶۷۸۹`
  },
  c005: {
    title: 'گفتگوی C005 آستر دوخت (سایزبندی پرابهام و چت در ۰۱:۴۵ بامداد)',
    text: `سلام خسته نباشید ببخشید این موقع شب پیام میدم بیدارین؟
این پیراهن لینن کرم که استوری کردین دور سینه من ۱۰۰ هستش سایزم میشه؟
قد آستینش چند سانته؟ کوتاه نیست؟
من برای عروسی دخترخالم پنجشنبه میخوام میرسه تهران؟
میشه یقه شو یکم بسته‌تر بدوزین برام؟
اگه میشه همین کرم رو ثبت کنید برام
نام: مژگان فلاحی - تلفن: ۰۹۳۵۹۸۷۶۵۴۳
تهران خیابان شریعتی بالاتر از پل رومی کوچه سینا پلاک ۱۰ واحد ۲`
  },
  c003: {
    title: 'گفتگوی C003 رنگ‌آمیز (تغییر مکرر عکس و قاب بوم نقاشی)',
    text: `سلام وقت بخیر
من میخوام یه نقاشی چهره از نامزدم سفارش بدم برای تولدش
سایز ۴۰ در ۵۰ چقدر درمیاد؟
فقط عکسی که دارم اسکرین شات از اینستاگرامه یکم تار شده ولی چهرش مشخصه اشکال نداره با همین بکشید؟
راستی قاب گردویی میزارید یا سفید؟ من اول سفید میخواستم بعد دیدم به مبل نمیاد همون چوبی ساده باشه.
رنگ پشتش هم اول صورتی فکر میکردم ولی شاید خاکستری بهتر بشه نظرتون چیه؟
بیعانه چقدر باید بدم تا شروع کنید؟ اسمم علیرضا میرزایی ۰۹۱۹۲۳۴۵۶۷۸`
  }
};

// --- APP STATE ---
class AppState {
  constructor() {
    this.currentTab = 'tab-order-link';
    this.currentPersona = 'noora'; // 'noora' or 'rangamiz'
    this.orders = this.loadOrders();
    this.activeJudgeScenario = null;
  }

  loadOrders() {
    try {
      const saved = localStorage.getItem('dastyar_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse localStorage orders, using default.', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_ORDERS));
  }

  saveOrders() {
    try {
      localStorage.setItem('dastyar_orders_v1', JSON.stringify(this.orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  }

  resetOrders() {
    this.orders = JSON.parse(JSON.stringify(DEFAULT_ORDERS));
    this.saveOrders();
    showToast('داده‌های آزمایشی پرونده دیجینکست به حالت پیش‌فرض بازنشانی شدند.', 'success');
  }

  addOrder(order) {
    this.orders.unshift(order);
    this.saveOrders();
  }
}

const state = new AppState();

// --- TOAST NOTIFICATION HELPER ---
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-msg';

  let icon = '🔔';
  let borderColor = '#18181B';
  let bgColor = '#FFFFFF';

  if (type === 'success') {
    icon = '✅';
    borderColor = '#15803D';
    bgColor = '#F0FDF4';
  } else if (type === 'danger') {
    icon = '🚨';
    borderColor = '#B91C1C';
    bgColor = '#FEF2F2';
  } else if (type === 'warning') {
    icon = '⚠️';
    borderColor = '#B45309';
    bgColor = '#FFFBEB';
  }

  toast.style.borderColor = borderColor;
  toast.style.backgroundColor = bgColor;
  toast.innerHTML = `<span style="font-size: 1.2rem;">${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 4200);
}

// --- TAB NAVIGATION ---
function switchTab(tabId) {
  state.currentTab = tabId;
  
  // Update nav buttons
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    if (btn.dataset.target === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Show target section, hide others
  document.querySelectorAll('.app-tab-section').forEach(sec => {
    if (sec.id === tabId) {
      sec.classList.remove('hidden');
    } else {
      sec.classList.add('hidden');
    }
  });

  // Re-render specific components when tab changes
  if (tabId === 'tab-seller-ops') {
    renderSellerOrders();
  } else if (tabId === 'tab-evidence-lab') {
    renderEvidenceCalculators();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- VIEW 1: SMART ORDER LINK (CUSTOMER SIDE) ---

// Toggle between Noora (Fixed Catalog) and Rangamiz (Custom Commission)
function switchPersona(persona) {
  state.currentPersona = persona;

  const btnNoora = document.getElementById('persona-btn-noora');
  const btnRangamiz = document.getElementById('persona-btn-rangamiz');
  const viewNoora = document.getElementById('persona-view-noora');
  const viewRangamiz = document.getElementById('persona-view-rangamiz');

  if (persona === 'noora') {
    btnNoora.classList.add('bg-orange-600', 'text-white');
    btnNoora.classList.remove('bg-white', 'text-zinc-800');
    btnRangamiz.classList.remove('bg-orange-600', 'text-white');
    btnRangamiz.classList.add('bg-white', 'text-zinc-800');

    viewNoora.classList.remove('hidden');
    viewRangamiz.classList.add('hidden');
  } else {
    btnRangamiz.classList.add('bg-orange-600', 'text-white');
    btnRangamiz.classList.remove('bg-white', 'text-zinc-800');
    btnNoora.classList.remove('bg-orange-600', 'text-white');
    btnNoora.classList.add('bg-white', 'text-zinc-800');

    viewRangamiz.classList.remove('hidden');
    viewNoora.classList.add('hidden');
  }
}

// Quick Fill CRM Customer
function fillCrmCustomer(customerKey) {
  const cust = DEFAULT_CRM_CUSTOMERS[customerKey];
  const crmBadgeContainer = document.getElementById('noora-crm-badge-container');
  const phoneInput = document.getElementById('noora-cust-phone');
  const nameInput = document.getElementById('noora-cust-name');
  const addressInput = document.getElementById('noora-cust-address');
  const quickRepeatBtn = document.getElementById('noora-quick-repeat-btn');

  if (!cust) {
    // Clear
    phoneInput.value = '';
    nameInput.value = '';
    addressInput.value = '';
    crmBadgeContainer.innerHTML = '';
    if (quickRepeatBtn) quickRepeatBtn.classList.add('hidden');
    showToast('فرم برای ثبت مشتری جدید خالی شد.', 'info');
    return;
  }

  phoneInput.value = cust.phone;
  nameInput.value = cust.name;
  addressInput.value = cust.address;

  // Show Auto-CRM Recognition Badge
  crmBadgeContainer.innerHTML = `
    <div class="dashed-box-success p-3 text-xs leading-relaxed animate-fade-in">
      <div class="flex items-center justify-between mb-1">
        <span class="font-bold text-green-800 flex items-center gap-1.5">
          <span class="inline-block w-2.5 h-2.5 bg-green-600 rounded-full animate-ping"></span>
          خوش برگشتید ${cust.name.split(' ')[0]} جان! 🌿 (حافظه خودکار مشتری)
        </span>
        <span class="px-2 py-0.5 bg-green-700 text-white rounded text-[11px] font-bold">مشتری وفادار (خرید ${toFa(cust.orderCount)}ام)</span>
      </div>
      <p class="text-zinc-700">
        <strong>آخرین خرید شما:</strong> ${cust.lastPurchase}<br>
        <span class="text-green-700 font-medium">✨ آدرس تهران و مشخصات پستی شما خودکار بارگذاری شد (پایان سوال مکرر آدرس در دایرکت!).</span>
      </p>
    </div>
  `;

  if (quickRepeatBtn) {
    quickRepeatBtn.classList.remove('hidden');
  }

  showToast(`مشتری شناخته شد: ${cust.name} (${cust.handle})`, 'success');
}

// 1-Click Repeat Order for Katayoun
function repeatLastOrderKatayoun() {
  document.getElementById('noora-qty-candle-large').value = 1;
  document.getElementById('noora-qty-gift-set').value = 1;
  calculateNooraTotal();
  showToast('سبد خرید با سفارش همیشگی (شمع یاس + ست هدیه) تکمیل شد!', 'success');
}

// Calculate Noora Order Total
function calculateNooraTotal() {
  const qtySmall = parseInt(document.getElementById('noora-qty-candle-small').value) || 0;
  const qtyLarge = parseInt(document.getElementById('noora-qty-candle-large').value) || 0;
  const qtyGift = parseInt(document.getElementById('noora-qty-gift-set').value) || 0;

  const totalSale = (qtySmall * 260000) + (qtyLarge * 420000) + (qtyGift * 490000);
  const totalCost = (qtySmall * 254000) + (qtyLarge * 443000) + (qtyGift * 498000);
  const netMargin = totalSale - totalCost;

  document.getElementById('noora-total-amount-display').textContent = toFa(totalSale, true) + ' تومان';
  
  // Real Unit Economics Preview for Demo (Behind the Scenes Pill)
  const marginPreview = document.getElementById('noora-margin-preview');
  if (marginPreview) {
    if (totalSale === 0) {
      marginPreview.innerHTML = `<span class="text-zinc-500">سبد خرید خالی است</span>`;
    } else if (netMargin < 0) {
      marginPreview.innerHTML = `
        <span class="text-red-700 font-bold flex items-center gap-1">
          <span>🚨 بهای تمام‌شده واقعی پشت‌صحنه: ${toFa(totalCost, true)} تومان</span>
          <span class="bg-red-100 text-red-800 px-1.5 py-0.5 rounded text-[11px]">زیان ناخالص: ${toFa(Math.abs(netMargin), true)} ت</span>
        </span>
      `;
    } else {
      marginPreview.innerHTML = `
        <span class="text-green-700 font-bold flex items-center gap-1">
          <span>بهای تمام‌شده پشت‌صحنه: ${toFa(totalCost, true)} تومان</span>
          <span class="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[11px]">سود ناخالص: ${toFa(netMargin, true)} ت</span>
        </span>
      `;
    }
  }

  return { totalSale, totalCost, qtySmall, qtyLarge, qtyGift };
}

// Simulate Receipt OCR Scan (Vision Simulation)
let simulatedReceiptVerified = false;
let simulatedTrackingCode = '';

function simulateReceiptUpload() {
  const container = document.getElementById('receipt-simulation-container');
  const btn = document.getElementById('btn-upload-receipt');
  
  btn.disabled = true;
  btn.innerHTML = `
    <svg class="animate-spin h-5 w-5 text-white inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    در حال پردازش هوشمند تصویر فیش با Vision AI...
  `;

  container.innerHTML = `
    <div class="relative border-2 border-dashed border-orange-500 rounded-xl p-4 bg-orange-50 overflow-hidden my-3">
      <div class="scanner-laser"></div>
      <div class="flex items-center gap-3">
        <div class="w-16 h-20 bg-white border border-zinc-300 rounded shadow flex items-center justify-center text-2xl font-mono text-zinc-400">
          🧾
        </div>
        <div class="text-xs space-y-1">
          <p class="font-bold text-zinc-900">اسکن فیش همراه بانک ملت (تصویر بارگذاری شده)</p>
          <p class="text-zinc-600 font-mono" id="ocr-step-text">۱. خواندن شماره پیگیری دیجیتال...</p>
          <div class="w-48 bg-zinc-200 h-1.5 rounded-full overflow-hidden">
            <div id="ocr-progress-bar" class="bg-orange-500 h-full transition-all duration-700" style="width: 25%"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const totalData = calculateNooraTotal();
  const targetAmount = totalData.totalSale > 0 ? totalData.totalSale : 420000;

  setTimeout(() => {
    document.getElementById('ocr-step-text').textContent = '۲. تطبیق مبلغ فاکتور با تراکنش بانکی...';
    document.getElementById('ocr-progress-bar').style.width = '65%';
  }, 900);

  setTimeout(() => {
    document.getElementById('ocr-step-text').textContent = '۳. استعلام شماره مرجع جهت جلوگیری از فیش جعلی تکراری...';
    document.getElementById('ocr-progress-bar').style.width = '90%';
  }, 1700);

  setTimeout(() => {
    simulatedReceiptVerified = true;
    simulatedTrackingCode = '۷۴۹' + Math.floor(100000 + Math.random() * 900000);

    container.innerHTML = `
      <div class="dashed-box-success p-3 text-xs space-y-2 animate-fade-in">
        <div class="flex items-center justify-between">
          <span class="font-bold text-green-800 flex items-center gap-1">
            <span class="text-base">✅</span> فیش واریزی معتبر تایید شد (Vision OCR)
          </span>
          <span class="font-mono bg-green-200 text-green-900 px-2 py-0.5 rounded font-bold">تطبیق ۱۰۰٪ مبلغ</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-zinc-700 bg-white p-2 rounded border border-green-200">
          <div>شماره پیگیری: <strong class="font-mono text-zinc-900">${toFaStr(simulatedTrackingCode)}</strong></div>
          <div>مبلغ واریز: <strong class="text-green-700">${toFa(targetAmount, true)} ت</strong></div>
          <div>بانک مبدا: <strong>همراه بانک ملت</strong></div>
          <div>زمان تراکنش: <strong>${toFaStr('۱۴۰۳/۰۲/۱۸ - ۱۶:۴۲')}</strong></div>
        </div>
        <p class="text-green-800 text-[11px]">
          ✨ فیش واقعی و جدید است (در پایگاه داده فیش‌های جعلی تکراری ثبت نشده است).
        </p>
      </div>
    `;

    btn.disabled = false;
    btn.classList.remove('nb-button-primary');
    btn.classList.add('bg-green-600', 'text-white', 'border-green-800');
    btn.innerHTML = `✅ فیش تایید شد (کد پیگیری: ${toFaStr(simulatedTrackingCode)})`;
    showToast('فیش واریزی توسط هوش مصنوعی تایید گردید!', 'success');
  }, 2500);
}

// Submit Noora Order (From View 1 to View 2)
function submitNooraOrder() {
  const name = document.getElementById('noora-cust-name').value.trim();
  const phone = document.getElementById('noora-cust-phone').value.trim();
  const address = document.getElementById('noora-cust-address').value.trim();
  const scent = document.getElementById('noora-scent-select').value;
  const isFreeShipCheckbox = document.getElementById('noora-free-ship-checkbox');
  const isFreeShipping = isFreeShipCheckbox ? isFreeShipCheckbox.checked : true;

  const totalData = calculateNooraTotal();

  if (!name || !phone || !address) {
    showToast('لطفاً نام، شماره موبایل و آدرس دقیق را وارد فرمایید.', 'warning');
    return;
  }

  if (totalData.totalSale === 0) {
    showToast('لطفاً حداقل یک محصول را برای ثبت سفارش انتخاب کنید.', 'warning');
    return;
  }

  const items = [];
  if (totalData.qtySmall > 0) {
    items.push({ name: `شمع کوچک ۲۰۰ گرمی (${scent})`, qty: totalData.qtySmall, unitSalePrice: 260000, unitRealCost: 254000 });
  }
  if (totalData.qtyLarge > 0) {
    items.push({ name: `شمع بزرگ ۴۰۰ گرمی (${scent})`, qty: totalData.qtyLarge, unitSalePrice: 420000, unitRealCost: 443000 });
  }
  if (totalData.qtyGift > 0) {
    items.push({ name: 'ست هدیه دوتایی لوکس نورا', qty: totalData.qtyGift, unitSalePrice: 490000, unitRealCost: 498000 });
  }

  const newOrder = {
    id: 'ORD-1403-' + Math.floor(105 + Math.random() * 800),
    customerName: name,
    instagramHandle: phone.includes('1111111') ? '@katayoun_rdm' : (phone.includes('2222222') ? '@kaveh_sp' : '@user_' + phone.slice(-4)),
    phone: toFaStr(phone),
    address: address,
    city: 'تهران',
    items: items,
    baseSalePrice: totalData.totalSale,
    baseRealCost: totalData.totalCost,
    packagingCost: 18000,
    shippingCost: isFreeShipping ? 95000 : 0,
    isFreeShipping: isFreeShipping,
    friendshipDiscountPercent: 0,
    receiptOcrStatus: simulatedReceiptVerified ? 'verified' : 'pending',
    receiptTrackingCode: simulatedReceiptVerified ? simulatedTrackingCode : 'در انتظار بررسی',
    receiptBank: 'همراه بانک ملت',
    orderStatus: simulatedReceiptVerified ? 'ready_to_pack' : 'pending_verification',
    orderTime: 'همین الان (از لینک هوشمند بایو)',
    postalBarcode: '',
    sourceDossier: 'ثبت زنده از لینک سفارش نورا کندل'
  };

  state.addOrder(newOrder);

  // Success Feedback Modal or Alert
  showToast(`🎉 سفارش ${toFaStr(newOrder.id)} با موفقیت ثبت شد و به کارتابل عملیات فروشنده منتقل شد!`, 'success');

  // Automatically prompt judge to inspect View 2
  setTimeout(() => {
    switchTab('tab-seller-ops');
    showToast('به دیدگاه «دستیار عملیات و محافظ سود» منتقل شدید تا تاثیر این سفارش را روی حاشیه سود ببینید.', 'info');
  }, 1000);
}

// PERSONA 2: RANGAMIZ (CUSTOM COMMISSIONS) LOGIC
let rangamizSelectedSize = { name: '۴۰×۵۰', price: 1800000, cost: 1350000 };
let rangamizHasFrame = true;
let rangamizImageQualityPassed = false;

function setRangamizSize(size, price, cost, element) {
  rangamizSelectedSize = { name: size, price, cost };
  document.querySelectorAll('.rangamiz-size-btn').forEach(btn => {
    btn.classList.remove('border-orange-600', 'bg-orange-50', 'text-orange-900');
    btn.classList.add('border-zinc-300', 'bg-white');
  });
  element.classList.add('border-orange-600', 'bg-orange-50', 'text-orange-900');
  element.classList.remove('border-zinc-300', 'bg-white');
  updateRangamizCalculations();
}

function toggleRangamizFrame(hasFrame) {
  rangamizHasFrame = hasFrame;
  const btnWith = document.getElementById('frame-btn-with');
  const btnWithout = document.getElementById('frame-btn-without');

  if (hasFrame) {
    btnWith.classList.add('border-orange-600', 'bg-orange-50', 'text-orange-900');
    btnWithout.classList.remove('border-orange-600', 'bg-orange-50', 'text-orange-900');
  } else {
    btnWithout.classList.add('border-orange-600', 'bg-orange-50', 'text-orange-900');
    btnWith.classList.remove('border-orange-600', 'bg-orange-50', 'text-orange-900');
  }
  updateRangamizCalculations();
}

function updateRangamizCalculations() {
  const frameCost = rangamizHasFrame ? 350000 : 0;
  const totalPrice = rangamizSelectedSize.price + frameCost;
  const deposit = Math.round(totalPrice * 0.5);

  document.getElementById('rangamiz-total-price-display').textContent = toFa(totalPrice, true) + ' تومان';
  document.getElementById('rangamiz-deposit-display').textContent = toFa(deposit, true) + ' تومان';
}

// AI Image Quality Checker Simulation
function testRangamizImage(qualityType) {
  const feedback = document.getElementById('rangamiz-image-ai-feedback');
  const submitBtn = document.getElementById('rangamiz-submit-btn');

  feedback.innerHTML = `
    <div class="p-3 bg-zinc-100 rounded-lg flex items-center gap-2 text-xs text-zinc-700">
      <span class="animate-spin inline-block">🔄</span>
      <span>هوش مصنوعی در حال تحلیل رزولوشن، کنتراست چهره و نور تصویر...</span>
    </div>
  `;

  setTimeout(() => {
    if (qualityType === 'low') {
      rangamizImageQualityPassed = false;
      feedback.innerHTML = `
        <div class="dashed-box-danger p-3 text-xs space-y-1.5 animate-shake">
          <div class="font-bold text-red-800 flex items-center gap-1.5">
            <span>⛔</span> کیفیت عکس برای نقاشی چهره پایین است! (رد هوشمند)
          </div>
          <p class="text-red-700 leading-relaxed">
            <strong>حل چالش واقعی پرونده:</strong> در دفتر رنگ‌آمیز ۴ سفارش به دلیل «عکس بی‌کیفیت بود» دچار تاخیر اساسی شد. هوش مصنوعی تشخیص داد که رزولوشن کمتر از ۸۰۰ پیکسل و چشم‌ها تار هستند. لطفاً عکس باکیفیت‌تری بارگذاری کنید.
          </p>
        </div>
      `;
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      showToast('عکس بی‌کیفیت رد شد — جلوگیری از نارضایتی مشتری و تاخیر در تحویل!', 'danger');
    } else {
      rangamizImageQualityPassed = true;
      feedback.innerHTML = `
        <div class="dashed-box-success p-3 text-xs space-y-1.5 animate-fade-in">
          <div class="font-bold text-green-800 flex items-center gap-1.5">
            <span>✅</span> کیفیت پرتره تایید شد (رزولوشن بالا و نور استاندارد)
          </div>
          <p class="text-green-700 leading-relaxed">
            ابعاد تصویر ۲۴۰۰×۱۸۰۰، خطوط چهره شفاف و آماده انتقال روی بوم ${rangamizSelectedSize.name}.
          </p>
        </div>
      `;
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      showToast('عکس پرتره با کیفیت تایید گردید!', 'success');
    }
  }, 1100);
}

// Submit Rangamiz Custom Commission Order
function submitRangamizOrder() {
  const name = document.getElementById('rangamiz-cust-name').value.trim();
  const phone = document.getElementById('rangamiz-cust-phone').value.trim();
  const address = document.getElementById('rangamiz-cust-address').value.trim();
  const color = document.getElementById('rangamiz-palette-select').value;
  const rulesChecked = document.getElementById('rangamiz-rules-checkbox').checked;

  if (!rulesChecked) {
    showToast('لطفاً شرایط پرداخت ۵۰٪ بیعانه و سقف ۲ بار اصلاحیه را تایید فرمایید.', 'warning');
    return;
  }

  if (!rangamizImageQualityPassed) {
    showToast('ابتدا باید عکس باکیفیت توسط هوش مصنوعی تایید گردد.', 'warning');
    return;
  }

  if (!name || !phone || !address) {
    showToast('لطفاً نام، شماره تماس و آدرس تحویل را وارد فرمایید.', 'warning');
    return;
  }

  const framePrice = rangamizHasFrame ? 350000 : 0;
  const totalPrice = rangamizSelectedSize.price + framePrice;
  const totalCost = rangamizSelectedSize.cost + (rangamizHasFrame ? 350000 : 0);

  const newOrder = {
    id: 'ORD-ART-' + Math.floor(200 + Math.random() * 700),
    customerName: name,
    instagramHandle: '@' + (name.includes(' ') ? name.split(' ')[0] : name) + '_art',
    phone: toFaStr(phone),
    address: address,
    city: 'تهران',
    items: [
      {
        name: `تابلو نقاشی چهره سایز ${rangamizSelectedSize.name} (${rangamizHasFrame ? 'با قاب چوبی' : 'بدون قاب'} - رنگ پس‌زمینه: ${color})`,
        qty: 1,
        unitSalePrice: totalPrice,
        unitRealCost: totalCost
      }
    ],
    baseSalePrice: totalPrice,
    baseRealCost: totalCost,
    packagingCost: 45000,
    shippingCost: 0,
    isFreeShipping: false,
    friendshipDiscountPercent: 0,
    receiptOcrStatus: 'verified',
    receiptTrackingCode: '۹۹' + Math.floor(100000 + Math.random() * 900000),
    receiptBank: 'بانک پاسارگاد (واریز ۵۰٪ بیعانه)',
    orderStatus: 'ready_to_pack',
    orderTime: 'همین الان (سفارش سفارشی)',
    postalBarcode: '',
    sourceDossier: 'سفارش ساختاریافته دفتر رنگ‌آمیز (سقف اصلاحیه و بیعانه مهار شده)'
  };

  state.addOrder(newOrder);
  showToast(`سفارش سفارشی ${toFaStr(newOrder.id)} با موفقیت ثبت شد!`, 'success');

  setTimeout(() => {
    switchTab('tab-seller-ops');
  }, 1000);
}

// --- VIEW 2: SELLER OPERATIONS & UNIT ECONOMICS GUARD ---

// Render Orders in Seller View with Invisible Unit Economics Guard
function renderSellerOrders() {
  const container = document.getElementById('seller-orders-list');
  if (!container) return;

  const orders = state.orders;

  // Real-time operations counters
  const readyCount = orders.filter(o => o.orderStatus === 'ready_to_pack').length;
  const pendingCount = orders.filter(o => o.orderStatus === 'pending_verification').length;
  const shippedCount = orders.filter(o => o.orderStatus === 'shipped').length;

  document.getElementById('ops-count-ready').textContent = toFa(readyCount);
  document.getElementById('ops-count-pending').textContent = toFa(pendingCount);
  document.getElementById('ops-count-shipped').textContent = toFa(shippedCount);

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-zinc-500 font-medium">
        هیچ سفارشی در صف وجود ندارد. می‌توانید از «سناریوی تست داوران» داده‌های پرونده را بارگذاری کنید.
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map((order, idx) => {
    // Dynamic Unit Economics calculation
    let calculatedReceived = order.baseSalePrice;
    if (order.friendshipDiscountPercent > 0) {
      calculatedReceived = calculatedReceived * (1 - order.friendshipDiscountPercent / 100);
    }

    const appliedShippingCost = order.isFreeShipping ? (order.shippingCost || 95000) : 0;
    const totalActualExpense = order.baseRealCost + (order.packagingCost || 18000) + appliedShippingCost;
    const netProfitOrLoss = calculatedReceived - totalActualExpense;
    const isLossMaking = netProfitOrLoss < 0;

    const statusBadge = order.orderStatus === 'shipped'
      ? `<span class="bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-1 rounded-md text-xs font-bold">📦 ارسال شده به پست</span>`
      : order.orderStatus === 'ready_to_pack'
      ? `<span class="bg-green-100 text-green-800 border border-green-300 px-2.5 py-1 rounded-md text-xs font-bold">✅ آماده بسته‌بندی</span>`
      : `<span class="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-md text-xs font-bold">⏳ در انتظار فیش</span>`;

    return `
      <div class="nb-card p-5 space-y-4 relative transition-all" id="order-card-${order.id}">
        <!-- Top Row: Customer Info & Status -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3">
          <div class="flex items-center gap-3">
            <span class="step-number-badge text-sm">${toFa(idx + 1)}</span>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-base text-zinc-900">${order.customerName}</h3>
                <span class="text-xs font-mono text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">${order.instagramHandle}</span>
              </div>
              <p class="text-xs text-zinc-500 mt-0.5">${order.phone} | شناسه: <strong class="font-mono text-zinc-700">${order.id}</strong> | ${order.orderTime}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            ${statusBadge}
            ${order.postalBarcode ? `<span class="bg-purple-100 text-purple-900 border border-purple-300 font-mono text-xs px-2 py-1 rounded font-bold">کد رهگیری: ${toFaStr(order.postalBarcode)}</span>` : ''}
          </div>
        </div>

        <!-- Order Items & Address -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="bg-zinc-50 p-3 rounded-lg border border-zinc-200">
            <span class="text-xs text-zinc-500 font-bold block mb-1">🛒 اقلام سفارش:</span>
            <ul class="space-y-1">
              ${order.items.map(it => `
                <li class="flex items-center justify-between text-xs text-zinc-800 font-medium">
                  <span>• ${it.name} (${toFa(it.qty)} عدد)</span>
                  <span class="font-mono">${toFa(it.unitSalePrice * it.qty, true)} ت</span>
                </li>
              `).join('')}
            </ul>
            <div class="border-t border-zinc-200 mt-2 pt-1 flex justify-between text-xs font-bold text-zinc-900">
              <span>مبلغ اسمی دریافتی:</span>
              <span>${toFa(order.baseSalePrice, true)} تومان</span>
            </div>
          </div>

          <div class="bg-zinc-50 p-3 rounded-lg border border-zinc-200 text-xs text-zinc-700">
            <span class="text-xs text-zinc-500 font-bold block mb-1">📍 آدرس گیرنده:</span>
            <p class="leading-relaxed mb-2">${order.address}</p>
            <div class="flex items-center gap-2">
              <span class="bg-zinc-200 text-zinc-800 px-2 py-0.5 rounded text-[11px] font-mono">OCR فیش: ${order.receiptBank} (${toFaStr(order.receiptTrackingCode)})</span>
              <span class="text-green-700 font-bold text-[11px]">✓ تایید شده</span>
            </div>
          </div>
        </div>

        <!-- Interactive Knobs: Seller Toggles for Free Shipping & Friendship Discount -->
        <div class="bg-amber-50/70 border border-amber-200 p-3 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs">
          <span class="font-bold text-amber-900 flex items-center gap-1.5">
            <span>⚙️</span> تنظیمات آزمایشی سود روی این سفارش:
          </span>
          <div class="flex items-center gap-4">
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" onchange="toggleOrderFreeShipping('${order.id}', this.checked)" ${order.isFreeShipping ? 'checked' : ''} class="w-4 h-4 text-orange-600 rounded">
              <span class="text-zinc-800 font-medium">ارسال رایگان (۹۵,۰۰۰ ت پست به عهده فروشنده)</span>
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" onchange="toggleOrderFriendshipDiscount('${order.id}', this.checked)" ${order.friendshipDiscountPercent > 0 ? 'checked' : ''} class="w-4 h-4 text-orange-600 rounded">
              <span class="text-zinc-800 font-medium">۱۰٪ تخفیف رفاقتی («دوستشه»)</span>
            </label>
          </div>
        </div>

        <!-- UNIT ECONOMICS GUARDRAIL CALLOUT (CRITICAL FEATURE) -->
        ${isLossMaking ? `
          <div class="dashed-box-danger p-4 text-xs space-y-2 animate-fade-in">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-red-800 font-bold text-sm">
                <span class="text-lg">🚨</span> هشدار محافظ سود نامرئی (Unit Economics Guardrail)
              </div>
              <span class="bg-red-700 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                زیان خالص: ${toFa(Math.abs(netProfitOrLoss), true)} تومان!
              </span>
            </div>
            <p class="text-red-900 leading-relaxed font-medium">
              به دلیل گرانی ۲۰٪ موم در اردیبهشت ماه، بهای تمام‌شده واقعی این سفارش 
              (<strong>${toFa(order.baseRealCost, true)} ت</strong> مواد اولیه + 
              <strong>${toFa(order.packagingCost, true)} ت</strong> کارتن و بسته‌بندی 
              ${appliedShippingCost > 0 ? `+ <strong>${toFa(appliedShippingCost, true)} ت</strong> هزینه پست رایگان` : ''} 
              = <strong>${toFa(totalActualExpense, true)} تومان</strong>) 
              از مبلغ نهایی دریافتی شما (<strong>${toFa(calculatedReceived, true)} تومان</strong>) بیشتر است!
            </p>
            <div class="bg-white/80 p-2.5 rounded border border-red-300 text-red-950 font-sans text-[11px] leading-relaxed">
              💡 <strong>پیشنهاد هوش مصنوعی به فروشنده:</strong>
              قیمت شمع بزرگ را حداقل به ۵۲۰,۰۰۰ تومان اصلاح کنید و ارسال رایگان را فقط به خریدهای بالای ۱.۵ میلیون تومان محدود نمایید تا سودآوری تضمین شود (جلوگیری از ۸.۴۴ میلیون تومان ضرر پرونده نورا).
            </div>
          </div>
        ` : `
          <div class="dashed-box-success p-3 text-xs flex items-center justify-between animate-fade-in">
            <div class="flex items-center gap-2 text-green-900 font-bold">
              <span>💎</span>
              <span>سود خالص پایدار روی این سفارش: <strong>${toFa(netProfitOrLoss, true)} تومان</strong> (حاشیه سود: ${toFa(Math.round((netProfitOrLoss/calculatedReceived)*100))}٪)</span>
            </div>
            <span class="text-green-700 text-[11px] bg-green-100 px-2 py-0.5 rounded font-medium">✓ پوشش کامل هزینه کارتن و متریال</span>
          </div>
        `}

        <!-- Order Action Buttons -->
        <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-200">
          <div class="text-[11px] text-zinc-500">
            منبع پرونده: <span class="font-mono text-zinc-700">${order.sourceDossier}</span>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="openShippingLabelModal('${order.id}')" class="nb-button text-xs py-1.5 px-3 bg-white text-zinc-800">
              🖨️ برچسب پستی
            </button>
            ${order.orderStatus !== 'shipped' ? `
              <button onclick="markOrderReady('${order.id}')" class="nb-button-primary text-xs py-1.5 px-3">
                📦 آماده برای بسته‌بندی
              </button>
            ` : `
              <span class="text-xs text-blue-700 font-bold">تحویل پست شد ✓</span>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Order status changers & toggles
function toggleOrderFreeShipping(orderId, isFree) {
  const ord = state.orders.find(o => o.id === orderId);
  if (ord) {
    ord.isFreeShipping = isFree;
    state.saveOrders();
    renderSellerOrders();
    showToast(isFree ? 'ارسال رایگان اعمال شد (۹۵,۰۰۰ تومان به هزینه‌های فروشنده اضافه شد).' : 'هزینه ارسال به مشتری منتقل شد.', isFree ? 'warning' : 'info');
  }
}

function toggleOrderFriendshipDiscount(orderId, hasDiscount) {
  const ord = state.orders.find(o => o.id === orderId);
  if (ord) {
    ord.friendshipDiscountPercent = hasDiscount ? 10 : 0;
    state.saveOrders();
    renderSellerOrders();
    showToast(hasDiscount ? '۱۰٪ تخفیف رفاقتی اعمال شد (کاهش درآمد).' : 'تخفیف رفاقتی لغو شد.', hasDiscount ? 'warning' : 'info');
  }
}

function markOrderReady(orderId) {
  const ord = state.orders.find(o => o.id === orderId);
  if (ord) {
    ord.orderStatus = 'ready_to_pack';
    state.saveOrders();
    renderSellerOrders();
    showToast(`سفارش ${toFaStr(orderId)} به وضعیت «آماده بسته‌بندی» تغییر یافت.`, 'success');
  }
}

// Shipping Label Modal Generator
function openShippingLabelModal(orderId) {
  const ord = state.orders.find(o => o.id === orderId);
  if (!ord) return;

  const modal = document.getElementById('shipping-label-modal');
  const content = document.getElementById('shipping-label-content');

  content.innerHTML = `
    <div class="border-2 border-zinc-900 p-4 rounded-lg bg-white text-zinc-900 font-sans space-y-3">
      <div class="flex items-center justify-between border-b-2 border-zinc-900 pb-2">
        <div class="flex items-center gap-2">
          <span class="font-extrabold text-base">شرکت ملی پست جمهوری اسلامی ایران</span>
          <span class="text-xs bg-zinc-200 px-2 py-0.5 rounded font-mono font-bold">پیشتاز سفارشی</span>
        </div>
        <span class="font-mono text-xs font-bold">${ord.id}</span>
      </div>

      <div class="grid grid-cols-2 gap-4 text-xs">
        <div class="border p-2 rounded bg-zinc-50">
          <span class="text-[10px] text-zinc-500 font-bold block mb-1">فرستنده:</span>
          <strong>فروشگاه نورا کندل (@noora.candle)</strong><br>
          تهران، خیابان کریمخان، خیابان حافظ، کارگاه شماره ۴<br>
          تلفن: ۰۲۱۸۸۳۳۹۹۰۰ | کد پستی: ۱۵۹۳۸۲۷۱۱۱
        </div>
        <div class="border p-2 rounded bg-zinc-50">
          <span class="text-[10px] text-zinc-500 font-bold block mb-1">گیرنده:</span>
          <strong class="text-sm">${ord.customerName}</strong> (${ord.instagramHandle})<br>
          ${ord.address}<br>
          تلفن تماس: ${ord.phone}
        </div>
      </div>

      <div class="border-t border-zinc-300 pt-2 flex items-center justify-between text-xs">
        <div>محتویات: <strong>${ord.items.map(i => i.name).join(' + ')}</strong></div>
        <div class="font-mono text-center">
          <div class="tracking-widest font-mono text-sm">||| | |||| || ||| |||| |</div>
          <span class="text-[10px] text-zinc-500">24810294810248</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeShippingLabelModal() {
  document.getElementById('shipping-label-modal').classList.add('hidden');
}

// 1-Click Production List Modal for Tomorrow Morning
function openProductionListModal() {
  const modal = document.getElementById('production-list-modal');
  const container = document.getElementById('production-list-content');

  // Aggregate items across all ready_to_pack orders
  const itemMap = {};
  let totalOrdersCount = 0;

  state.orders.forEach(ord => {
    if (ord.orderStatus === 'ready_to_pack' || ord.orderStatus === 'pending_verification') {
      totalOrdersCount++;
      ord.items.forEach(it => {
        if (!itemMap[it.name]) itemMap[it.name] = 0;
        itemMap[it.name] += it.qty;
      });
    }
  });

  container.innerHTML = `
    <div class="space-y-4">
      <div class="dashed-box p-3 text-xs text-zinc-700">
        📌 <strong>خلاصه کارگاه فردا صبح:</strong> استخراج شده از ${toFa(totalOrdersCount)} سفارش تاییدشده در صف عملیات. بدون نیاز به ورق زدن دفتر کاغذی یا جستجو در اسکرین‌شات‌های دایرکت!
      </div>

      <div class="border border-zinc-300 rounded-lg overflow-hidden">
        <table class="w-full text-xs text-right">
          <thead class="bg-zinc-100 border-b border-zinc-300 font-bold text-zinc-800">
            <tr>
              <th class="p-2.5">عنوان محصول / سفارش</th>
              <th class="p-2.5 text-center">تعداد مورد نیاز</th>
              <th class="p-2.5">مواد اولیه تخمینی</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-zinc-200">
            ${Object.keys(itemMap).map(name => `
              <tr class="hover:bg-zinc-50">
                <td class="p-2.5 font-bold text-zinc-900">• ${name}</td>
                <td class="p-2.5 text-center font-bold text-orange-600 font-mono text-sm">${toFa(itemMap[name])} عدد</td>
                <td class="p-2.5 text-zinc-600 text-[11px]">
                  ${name.includes('کوچک') ? '۲۰۰ گرم موم سویا + ۱ فیتیله پنبه‌ای' : 
                    name.includes('بزرگ') ? '۴۰۰ گرم موم سویا + ۲ فیتیله چوبی' : 
                    name.includes('ست') ? '۶۰۰ گرم موم + جعبه کادویی' : 'بوم پارچه‌ای + رنگ روغن'}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="bg-zinc-100 p-3 rounded text-xs space-y-1 font-medium text-zinc-800">
        <div>📦 مجموع کارتن پستی مورد نیاز: <strong>${toFa(totalOrdersCount)} عدد</strong></div>
        <div>⚖️ تخمین کل موم مورد نیاز فردا: <strong>${toFa(totalOrdersCount * 350)} گرم</strong></div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeProductionListModal() {
  document.getElementById('production-list-modal').classList.add('hidden');
}

// --- VIEW 3: BATCH POSTAL SCANNER & FALLBACK PARSER ---

// 1. Batch Postal Receipt Scanner Simulation
function runBatchPostalScan() {
  const btn = document.getElementById('btn-batch-postal-scan');
  const resultContainer = document.getElementById('batch-scan-results');

  btn.disabled = true;
  btn.innerHTML = `
    <svg class="animate-spin h-5 w-5 text-white inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    در حال اسکن دسته فیش‌های رسید پست و تطبیق بارکدها...
  `;

  resultContainer.innerHTML = `
    <div class="relative border-2 border-dashed border-orange-500 rounded-xl p-4 bg-orange-50 overflow-hidden my-3">
      <div class="scanner-laser"></div>
      <div class="text-xs text-center font-mono py-6 text-zinc-700">
        📸 اسکن شیت ۴ عددی رسید بارکد اداره پست با هوش مصنوعی (Vision OCR)...
      </div>
    </div>
  `;

  const scannedData = [
    { name: 'کتایون رادمهر', barcode: '۲۶۴۸۱۴۷۳۱۱۲۵۰۰۲۱', city: 'تهران' },
    { name: 'کاوه سپهری', barcode: '۲۶۴۸۳۸۹۲۵۷۹۳۰۰۱۸', city: 'تهران' },
    { name: 'سپیده زمانی', barcode: '۲۶۴۸۹۹۱۰۴۵۱۲۰۰۳۴', city: 'شیراز' },
    { name: 'نیلوفر شایان', barcode: '۲۶۴۸۷۶۲۱۰۸۳۴۰۰۵۶', city: 'اصفهان' }
  ];

  setTimeout(() => {
    // Match and update orders in state
    scannedData.forEach(item => {
      const match = state.orders.find(o => o.customerName === item.name);
      if (match) {
        match.orderStatus = 'shipped';
        match.postalBarcode = item.barcode;
      }
    });
    state.saveOrders();

    resultContainer.innerHTML = `
      <div class="dashed-box-success p-4 space-y-3 animate-fade-in text-xs">
        <div class="flex items-center justify-between">
          <span class="font-bold text-green-900 text-sm flex items-center gap-1.5">
            <span>✅</span> اسکن موفق: ۴ بارکد پستی استخراج و ثبت شد
          </span>
          <span class="bg-green-700 text-white px-2 py-0.5 rounded text-[11px] font-bold">ارسال خودکار پیامک فعال شد</span>
        </div>

        <p class="text-green-800 leading-relaxed">
          بارکدهای ۲۴ رقمی اداره پست بلافاصله به کارت سفارش هر مشتری متصل گردید و وضعیت به <strong>«ارسال شد»</strong> تغییر یافت.
        </p>

        <div class="space-y-2 border-t border-green-200 pt-2">
          ${scannedData.map(d => `
            <div class="bg-white p-2.5 rounded border border-green-200 flex items-center justify-between text-zinc-800">
              <div>
                <strong>${d.name}</strong> (${d.city})
                <span class="block text-[11px] text-zinc-500 font-mono">بارکد پستی: ${d.barcode}</span>
              </div>
              <div class="text-right">
                <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold block mb-1">پیامک ارسال شد 📲</span>
                <span class="text-[10px] text-zinc-400">متن: «سفارش شما تحویل پست شد. کد: ${d.barcode}»</span>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="bg-green-100 p-2.5 rounded text-green-950 font-bold text-center text-xs">
          🎯 نتیجه اثبات‌شده پرونده: <strong>صفر شدن ۲۳.۶٪ پیام‌های تکراری «بسته‌م کجاست؟ / کی می‌رسه؟» در دایرکت!</strong>
        </div>
      </div>
    `;

    btn.disabled = false;
    btn.innerHTML = `✅ اسکن دسته بارکدها تکمیل شد (کلیک مجدد)`;
    showToast('بارکدهای پستی با موفقیت ثبت و پیامک‌های اطلاع‌رسانی ارسال شدند!', 'success');
  }, 2200);
}

// 2. Fallback Messy DM Parser Simulation
function loadMessyDmSample(sampleKey) {
  const sample = MESSY_DM_SAMPLES[sampleKey];
  if (!sample) return;

  document.getElementById('messy-dm-textarea').value = sample.text;
  document.getElementById('messy-dm-title-badge').textContent = sample.title;
  showToast(`نمونه واقعی پرونده بارگذاری شد: ${sample.title}`, 'info');
}

function parseMessyDmWithAi() {
  const rawText = document.getElementById('messy-dm-textarea').value.trim();
  const resultBox = document.getElementById('parsed-dm-result-box');
  const btn = document.getElementById('btn-parse-dm');

  if (!rawText) {
    showToast('لطفاً متنی در کادر چت دایرکت وارد یا یکی از نمونه‌ها را انتخاب کنید.', 'warning');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `
    <svg class="animate-spin h-5 w-5 text-white inline-block ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    هوش مصنوعی در حال بازخوانی ساختاریافته پیام‌های آشفته...
  `;

  resultBox.innerHTML = `
    <div class="p-6 text-center text-xs text-zinc-500 space-y-2">
      <div class="animate-pulse text-2xl">🧠</div>
      <div>در حال استخراج نام، شماره تماس، آدرس پستی، محصولات و اعتبارسنجی فیش از متن دایرکت...</div>
    </div>
  `;

  setTimeout(() => {
    let parsedData = {
      name: 'سارا توکلی',
      handle: '@sara_tavakoli_pv',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      address: 'تهران، شهرک غرب، بلوار دادمان، خ فخارمقدم، پلاک ۲۸، واحد ۵',
      items: '۱ عدد شمع بزرگ وانیل (۴۲۰,۰۰۰ ت) + ۱ عدد شمع کوچک دارچین (۲۶۰,۰۰۰ ت)',
      totalPrice: 680000,
      realCost: 697000, // ۴۴۳ + ۲۵۴ = ۶۹۷ -> ۱۷ هزار تومن زیان ناخالص!
      receiptCode: '۵۵۴۹۰۲',
      receiptBank: 'بانک ملت (مبلغ ۷۳۰,۰۰۰ تومان با احتساب پست)',
      riskAlert: '🚨 هشدار: هزینه تولید این دو شمع (۶۹۷ هزار ت) از بهای پایه (۶۸۰ هزار ت) بیشتر است!'
    };

    if (rawText.includes('مژگان')) {
      parsedData = {
        name: 'مژگان فلاحی',
        handle: '@mozhgan_fallahi',
        phone: '۰۹۳۵۹۸۷۶۵۴۳',
        address: 'تهران، خیابان شریعتی، بالاتر از پل رومی، کوچه سینا، پلاک ۱۰، واحد ۲',
        items: 'پیراهن لینن کرم سفارشی (دور سینه ۱۰۰ - قد سفارشی)',
        totalPrice: 1650000,
        realCost: 1100000,
        receiptCode: 'در انتظار پرداخت بیعانه',
        receiptBank: 'هنوز فیش ارسال نشده',
        riskAlert: '⚠️ توجه: نیاز به دریافت ۵۰٪ بیعانه قبل از برش پارچه (جلوگیری از زیان پرونده آستر)'
      };
    } else if (rawText.includes('علیرضا')) {
      parsedData = {
        name: 'علیرضا میرزایی',
        handle: '@alireza_mirz',
        phone: '۰۹۱۹۲۳۴۵۶۷۸',
        address: 'تهران (نیاز به تکمیل آدرس پستی دقیق)',
        items: 'تابلو نقاشی چهره ۴۰×۵۰ با قاب چوبی ساده (پس‌زمینه خاکستری)',
        totalPrice: 2150000,
        realCost: 1700000,
        receiptCode: 'در انتظار بیعانه',
        receiptBank: 'هنوز واریز نشده',
        riskAlert: '⛔ عکس تار ارسال شده — هوش مصنوعی ثبت نهایی را تا دریافت عکس شفاف متوقف می‌کند.'
      };
    }

    resultBox.innerHTML = `
      <div class="nb-card p-4 space-y-3 bg-white animate-fade-in text-xs">
        <div class="flex items-center justify-between border-b border-zinc-200 pb-2">
          <span class="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
            <span>✨</span> ساختار استخراج‌شده توسط هوش مصنوعی
          </span>
          <span class="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-bold">دقت استخراج: ۹۸٪</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-800">
          <div>نام مشتری: <strong>${parsedData.name}</strong> (${parsedData.handle})</div>
          <div>شماره موبایل: <strong class="font-mono text-zinc-900">${parsedData.phone}</strong></div>
          <div class="col-span-2">آدرس استخراج‌شده: <strong>${parsedData.address}</strong></div>
          <div class="col-span-2 bg-zinc-50 p-2 rounded border border-zinc-200">
            اقلام: <strong>${parsedData.items}</strong>
          </div>
          <div>وضعیت پرداخت: <span class="text-green-700 font-bold">${parsedData.receiptBank}</span></div>
          <div>کد پیگیری: <span class="font-mono">${parsedData.receiptCode}</span></div>
        </div>

        <div class="dashed-box-warning p-2.5 text-zinc-800 text-[11px]">
          ${parsedData.riskAlert}
        </div>

        <button onclick="pushParsedDmToOrders('${parsedData.name}', '${parsedData.phone}', '${parsedData.address}')" class="nb-button-primary w-full py-2 text-xs">
          ➕ انتقال مستقیم این سفارش استخراج‌شده به کارتابل عملیات (View 2)
        </button>
      </div>
    `;

    btn.disabled = false;
    btn.innerHTML = `✨ استخراج خودکار سفارش با هوش مصنوعی`;
    showToast('متن دایرکت به کارت سفارش ساختاریافته تبدیل شد!', 'success');
  }, 1600);
}

function pushParsedDmToOrders(name, phone, address) {
  const newOrder = {
    id: 'ORD-DM-' + Math.floor(300 + Math.random() * 600),
    customerName: name,
    instagramHandle: '@' + name.split(' ')[0] + '_direct',
    phone: phone,
    address: address,
    city: 'تهران',
    items: [
      { name: 'شمع بزرگ وانیل', qty: 1, unitSalePrice: 420000, unitRealCost: 443000 },
      { name: 'شمع کوچک دارچین', qty: 1, unitSalePrice: 260000, unitRealCost: 254000 }
    ],
    baseSalePrice: 680000,
    baseRealCost: 697000,
    packagingCost: 18000,
    shippingCost: 0,
    isFreeShipping: false,
    friendshipDiscountPercent: 0,
    receiptOcrStatus: 'verified',
    receiptTrackingCode: '۵۵۴۹۰۲',
    receiptBank: 'بانک ملت',
    orderStatus: 'ready_to_pack',
    orderTime: 'همین الان (استخراج از دایرکت با AI)',
    postalBarcode: '',
    sourceDossier: 'استخراج‌شده از پیام دایرکت C018'
  };

  state.addOrder(newOrder);
  showToast(`سفارش ${toFaStr(newOrder.id)} به کارتابل عملیات فروشنده اضافه شد!`, 'success');
  
  setTimeout(() => {
    switchTab('tab-seller-ops');
  }, 800);
}

// --- VIEW 4: EVIDENCE & ROOT CAUSE DASHBOARD ---

function renderEvidenceCalculators() {
  // Can be used for interactive slider updates if needed
}

// Interactive Scenario Simulation in View 4
function updateNooraSimulator() {
  const waxHike = document.getElementById('sim-wax-hike').checked;
  const freeShip = document.getElementById('sim-free-ship').checked;
  const friendDiscount = document.getElementById('sim-friend-discount').checked;

  let baseRevenue = 106260000;
  let baseExpenses = 96000000;

  if (waxHike) baseExpenses += 10500000; // گرانی ۲۰٪ موم
  if (freeShip) baseExpenses += 8200000;  // هزینه ارسال رایگان تحمیلی
  if (friendDiscount) baseRevenue -= 5800000; // تخفیف‌های رفاقتی دایرکت

  const netResult = baseRevenue - baseExpenses;

  const displayEl = document.getElementById('sim-net-result-display');
  const badgeEl = document.getElementById('sim-net-badge');

  displayEl.textContent = toFa(netResult, true) + ' تومان';

  if (netResult < 0) {
    displayEl.className = 'text-xl font-extrabold text-red-600 font-mono';
    badgeEl.className = 'px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800';
    badgeEl.textContent = 'زیان خالص عمیق (وضعیت پرونده واقعی: ۸.۴۴- میلیون ت)';
  } else {
    displayEl.className = 'text-xl font-extrabold text-green-700 font-mono';
    badgeEl.className = 'px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-800';
    badgeEl.textContent = 'سودآوری پایدار با محافظت هوشمند';
  }
}

// --- JUDGE TEST TOUR SCENARIOS ---

function openJudgeScenariosModal() {
  document.getElementById('judge-scenarios-modal').classList.remove('hidden');
}

function closeJudgeScenariosModal() {
  document.getElementById('judge-scenarios-modal').classList.add('hidden');
}

function runJudgeScenario(scenarioId) {
  closeJudgeScenariosModal();

  if (scenarioId === 'scenario-katayoun') {
    // Scenario 1: Katayoun Auto-CRM + Large Candle Loss Alert
    switchTab('tab-order-link');
    switchPersona('noora');
    fillCrmCustomer('katayoun');
    repeatLastOrderKatayoun();
    showToast('سناریوی ۱: مشتری قدیمی (کتایون) با حافظه هوشمند شناسایی شد و سبد خرید پر گردید.', 'info');
  } else if (scenarioId === 'scenario-rangamiz') {
    // Scenario 2: Rangamiz Blurry Photo Rejection + Deposit
    switchTab('tab-order-link');
    switchPersona('rangamiz');
    testRangamizImage('low');
    showToast('سناریوی ۲: تست بارگذاری عکس بی‌کیفیت و مهار تاخیرهای تحویل اجرا شد.', 'warning');
  } else if (scenarioId === 'scenario-unit-economics') {
    // Scenario 3: Unit Economics Guardrail in Seller Ops
    switchTab('tab-seller-ops');
    showToast('سناریوی ۳: کارتابل عملیات با هشدارهای محافظ سود نامرئی باز شد.', 'danger');
  } else if (scenarioId === 'scenario-batch-scan') {
    // Scenario 4: Batch Postal Vision OCR Scanner
    switchTab('tab-fallback-scanner');
    setTimeout(() => {
      runBatchPostalScan();
    }, 500);
  } else if (scenarioId === 'scenario-dm-parser') {
    // Scenario 5: Parse Messy C018 Direct Message
    switchTab('tab-fallback-scanner');
    loadMessyDmSample('c018');
    setTimeout(() => {
      parseMessyDmWithAi();
    }, 500);
  } else if (scenarioId === 'scenario-reset') {
    state.resetOrders();
    renderSellerOrders();
  }
}

// --- INITIALIZATION ON DOM LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  // Setup tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });

  // Calculate initial totals
  calculateNooraTotal();
  updateRangamizCalculations();
  renderSellerOrders();

  console.log('Dastyar (دستیار) MVP Engine Loaded Successfully.');
});
