// Initial Mock Data for Fresh Meadow Dairy CMS
// Consistent across all modules, matching the exact screenshots provided.

export const initialCategories = [
  {
    id: 'cat-1',
    name: 'Milk',
    slug: 'milk',
    description: 'Fresh milk, UHT, and plant-based alternatives',
    productsCount: 28,
    status: 'Active',
    displayOrder: 1,
    image: '/assets/cat-milk.png',
    updatedAt: '12 Apr 2026, 10:24 AM',
    seoTitle: 'Fresh Milk & Dairy Beverages | Fresh Meadow Dairy',
    metaDescription: 'Discover our farm-fresh pasteurized and whole milk straight from pasture-raised cows.'
  },
  {
    id: 'cat-2',
    name: 'Yogurt',
    slug: 'yogurt',
    description: 'Greek, drinking, and probiotic yogurt',
    productsCount: 18,
    status: 'Active',
    displayOrder: 2,
    image: '/assets/cat-yogurt.png',
    updatedAt: '10 Apr 2026, 02:17 PM',
    seoTitle: 'Artisan Greek & Drinking Yogurt | Fresh Meadow Dairy',
    metaDescription: 'Creamy high-protein Greek yogurt and live probiotic drinks crafted with natural fruit puree.'
  },
  {
    id: 'cat-3',
    name: 'Cheese',
    slug: 'cheese',
    description: 'Cheddar, mozzarella, and artisan cheese',
    productsCount: 24,
    status: 'Active',
    displayOrder: 3,
    image: '/assets/cat-cheese.png',
    updatedAt: '08 Apr 2026, 09:41 AM',
    seoTitle: 'Handcrafted Artisan Cheeses | Fresh Meadow Dairy',
    metaDescription: 'Aged cheddar, stretch curd mozzarella, and cream cheeses made with 100% pasture milk.'
  },
  {
    id: 'cat-4',
    name: 'Butter',
    slug: 'butter',
    description: 'Salted, unsalted, and cultured butter',
    productsCount: 12,
    status: 'Active',
    displayOrder: 4,
    image: '/assets/cat-butter.png',
    updatedAt: '06 Apr 2026, 11:03 AM',
    seoTitle: 'Grass-Fed Cultured & Sweet Cream Butter',
    metaDescription: 'Slow-churned European-style butter with 82% milkfat for baking and spreading.'
  },
  {
    id: 'cat-5',
    name: 'Cream',
    slug: 'cream',
    description: 'Cooking, whipping, and fresh cream',
    productsCount: 11,
    status: 'Active',
    displayOrder: 5,
    image: '/assets/cat-cream.png',
    updatedAt: '03 Apr 2026, 04:28 PM',
    seoTitle: 'Pure Heavy Whipping & Cooking Cream',
    metaDescription: 'Rich whipping cream and culinary heavy cream with no artificial stabilizers.'
  },
  {
    id: 'cat-6',
    name: 'Dairy Desserts',
    slug: 'dairy-desserts',
    description: 'Pudding and chilled dairy treats',
    productsCount: 9,
    status: 'Inactive',
    displayOrder: 6,
    image: '/assets/cat-desserts.png',
    updatedAt: '28 Mar 2026, 01:12 PM',
    seoTitle: 'Gourmet Dairy Desserts & Puddings',
    metaDescription: 'Delicious chilled puddings and custards prepared fresh weekly.'
  },
  {
    id: 'cat-7',
    name: 'Plant-Based Alternatives',
    slug: 'plant-based',
    description: 'Oat, almond, and soy milk beverages',
    productsCount: 14,
    status: 'Active',
    displayOrder: 7,
    image: '/assets/cat-milk.png',
    updatedAt: '22 Mar 2026, 09:15 AM',
    seoTitle: 'Plant-Based Milk & Dairy Free Drinks',
    metaDescription: 'Nutrient-rich barista oat and almond milks.'
  },
  {
    id: 'cat-8',
    name: 'Ice Cream',
    slug: 'ice-cream',
    description: 'Artisan small-batch gelato and ice cream',
    productsCount: 9,
    status: 'Active',
    displayOrder: 8,
    image: '/assets/cat-desserts.png',
    updatedAt: '20 Mar 2026, 03:40 PM',
    seoTitle: 'Real Cream Artisan Ice Cream & Gelato',
    metaDescription: 'Craft gelato made with fresh whole milk and Madagascar vanilla.'
  },
  {
    id: 'cat-9',
    name: 'Dairy Gift Packs',
    slug: 'gift-packs',
    description: 'Assorted artisan cheese & butter bundles',
    productsCount: 3,
    status: 'Active',
    displayOrder: 9,
    image: '/assets/cat-preview.png',
    updatedAt: '18 Mar 2026, 11:00 AM',
    seoTitle: 'Gourmet Dairy Hampers & Gift Boxes',
    metaDescription: 'Curated tasting collections of fine cheeses and pasture butters.'
  }
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Fresh Whole Milk 1L',
    sku: 'FM-MILK-001',
    category: 'Milk',
    brand: 'Fresh Meadow Dairy',
    description: 'Pure, wholesome pasteurized whole milk from pasture-fed cows. Non-homogenized with a natural creamline on top.',
    price: 28000,
    salePrice: 26000,
    priceIncludesTax: true,
    stock: 48,
    lowStockThreshold: 10,
    unit: 'Piece (pc)',
    status: 'Active',
    storageType: 'Chilled (Refrigerated)',
    shelfLifeDays: 7,
    temperatureRange: '2–6 °C',
    ingredients: '100% Fresh Cow Milk. Contains Milk. No preservatives.',
    images: ['/assets/prod-milk.png', '/assets/cat-preview.png'],
    coverImage: '/assets/prod-milk.png',
    variants: [
      { id: 'v1', name: '500ml', price: 15000 },
      { id: 'v2', name: '1L', price: 28000 },
      { id: 'v3', name: '2L', price: 52000 }
    ],
    batchNumber: 'FM-261028',
    expiryDate: '28 Oct 2026',
    updatedAt: '24 Oct 2026'
  },
  {
    id: 'prod-2',
    name: 'Greek Yogurt Original 500g',
    sku: 'FM-YOG-014',
    category: 'Yogurt',
    brand: 'Fresh Meadow Dairy',
    description: 'Thick and velvety strained Greek yogurt packed with 18g protein per serving. Made with live and active probiotics.',
    price: 42000,
    salePrice: 0,
    priceIncludesTax: true,
    stock: 12,
    lowStockThreshold: 15,
    unit: 'Piece (pc)',
    status: 'Low Stock',
    storageType: 'Chilled (Refrigerated)',
    shelfLifeDays: 14,
    temperatureRange: '2–6 °C',
    ingredients: 'Pasteurized Milk, Cream, Live Active Cultures (S. thermophilus, L. bulgaricus, L. acidophilus).',
    images: ['/assets/prod-yogurt.png'],
    coverImage: '/assets/prod-yogurt.png',
    variants: [
      { id: 'v1', name: '250g', price: 24000 },
      { id: 'v2', name: '500g', price: 42000 }
    ],
    batchNumber: 'GY-261030',
    expiryDate: '30 Oct 2026',
    updatedAt: '24 Oct 2026'
  },
  {
    id: 'prod-3',
    name: 'Unsalted Butter 250g',
    sku: 'FM-BTR-008',
    category: 'Butter',
    brand: 'Fresh Meadow Dairy',
    description: 'Traditional slow-churned sweet cream butter with 82% milkfat. Ideal for laminating pastry and gourmet cooking.',
    price: 38000,
    salePrice: 0,
    priceIncludesTax: true,
    stock: 8,
    lowStockThreshold: 10,
    unit: 'Piece (pc)',
    status: 'Low Stock',
    storageType: 'Chilled (Refrigerated)',
    shelfLifeDays: 45,
    temperatureRange: '2–6 °C',
    ingredients: 'Pasteurized Sweet Cream (from Cow Milk). Contains Milk.',
    images: ['/assets/prod-butter.png'],
    coverImage: '/assets/prod-butter.png',
    variants: [
      { id: 'v1', name: '250g', price: 38000 },
      { id: 'v2', name: '500g', price: 72000 }
    ],
    batchNumber: 'UB-261102',
    expiryDate: '02 Nov 2026',
    updatedAt: '24 Oct 2026'
  },
  {
    id: 'prod-4',
    name: 'Cheddar Cheese Block 200g',
    sku: 'FM-CHS-023',
    category: 'Cheese',
    brand: 'Fresh Meadow Dairy',
    description: 'Naturally aged sharp cheddar aged 12 months for a complex nutty sharpness and crumbly texture.',
    price: 55000,
    salePrice: 50000,
    priceIncludesTax: true,
    stock: 0,
    lowStockThreshold: 8,
    unit: 'Piece (pc)',
    status: 'Out of Stock',
    storageType: 'Chilled (Refrigerated)',
    shelfLifeDays: 90,
    temperatureRange: '2–6 °C',
    ingredients: 'Cultured Pasteurized Milk, Salt, Vegetarian Enzymes, Annatto (natural color).',
    images: ['/assets/prod-cheese.png'],
    coverImage: '/assets/prod-cheese.png',
    variants: [
      { id: 'v1', name: '200g', price: 55000 },
      { id: 'v2', name: '500g', price: 125000 }
    ],
    batchNumber: 'CC-261115',
    expiryDate: '15 Nov 2026',
    updatedAt: '24 Oct 2026'
  },
  {
    id: 'prod-5',
    name: 'Fresh Cream 200ml',
    sku: 'FM-CRM-011',
    category: 'Cream',
    brand: 'Fresh Meadow Dairy',
    description: 'Rich pasteurized heavy whipping cream with 36% butterfat. Whips to stiff peaks in minutes.',
    price: 31000,
    salePrice: 0,
    priceIncludesTax: true,
    stock: 34,
    lowStockThreshold: 12,
    unit: 'Piece (pc)',
    status: 'Active',
    storageType: 'Chilled (Refrigerated)',
    shelfLifeDays: 12,
    temperatureRange: '2–6 °C',
    ingredients: 'Fresh Dairy Cream, Carrageenan (natural stabilizer <0.02%).',
    images: ['/assets/prod-cream.png'],
    coverImage: '/assets/prod-cream.png',
    variants: [
      { id: 'v1', name: '200ml', price: 31000 },
      { id: 'v2', name: '1L', price: 115000 }
    ],
    batchNumber: 'FC-261105',
    expiryDate: '05 Nov 2026',
    updatedAt: '23 Oct 2026'
  },
  {
    id: 'prod-6',
    name: 'Artisan Mozzarella 200g',
    sku: 'FM-CHS-024',
    category: 'Cheese',
    brand: 'Fresh Meadow Dairy',
    description: 'Fresh ball of fior di latte mozzarella suspended in brine. Soft, juicy, and milky.',
    price: 46000,
    salePrice: 0,
    priceIncludesTax: true,
    stock: 22,
    lowStockThreshold: 10,
    unit: 'Piece (pc)',
    status: 'Active',
    storageType: 'Chilled (Refrigerated)',
    shelfLifeDays: 10,
    temperatureRange: '2–4 °C',
    ingredients: 'Pasteurized Whole Milk, Salt, Microbial Rennet, Lactic Ferments.',
    images: ['/assets/prod-cheese.png'],
    coverImage: '/assets/prod-cheese.png',
    variants: [{ id: 'v1', name: '200g', price: 46000 }],
    batchNumber: 'MZ-261101',
    expiryDate: '01 Nov 2026',
    updatedAt: '22 Oct 2026'
  }
];

export const initialOrders = [
  {
    id: '#FM-2048',
    customer: 'Amelia Putri',
    customerEmail: 'amelia.putri@email.com',
    customerPhone: '+62 812-3456-7890',
    shippingAddress: {
      label: 'Home',
      recipient: 'Amelia Putri',
      address: 'Jl. Senopati Raya No. 42, Kebayoran Baru',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      notes: 'Tolong titip di pos satpam bila rumah kosong'
    },
    items: [
      { productId: 'prod-1', name: 'Whole Milk 2L', quantity: 2, price: 52000, total: 104000 },
      { productId: 'prod-2', name: 'Greek Yogurt 500g', quantity: 1, price: 42000, total: 42000 },
      { productId: 'prod-5', name: 'Fresh Cream 200ml', quantity: 1, price: 31000, total: 31000 }
    ],
    itemsSummary: 'Whole Milk 2L + Greek Yogurt',
    subtotal: 177000,
    shippingFee: 9000,
    total: 186000,
    paymentMethod: 'Virtual Account',
    paymentStatus: 'Paid',
    status: 'Processing',
    orderDate: '26 Oct 2026, 09:14 AM',
    timeline: [
      { title: 'Order Placed', time: '26 Oct 2026, 09:14 AM', note: 'Customer completed checkout' },
      { title: 'Payment Confirmed', time: '26 Oct 2026, 09:16 AM', note: 'BCA Virtual Account verified' },
      { title: 'Processing in Cold-Store', time: '26 Oct 2026, 10:00 AM', note: 'Packed by Inventory Team' }
    ]
  },
  {
    id: '#FM-2047',
    customer: 'Rizky Hartono',
    customerEmail: 'rizky.h@email.com',
    customerPhone: '+62 813-4567-8901',
    shippingAddress: {
      label: 'Office',
      recipient: 'Rizky Hartono',
      address: 'Gedung Menara Mandiri Lt. 18, Jl. Jend. Sudirman Kav. 54-55',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      notes: 'Lantai 18 Ruang IT'
    },
    items: [
      { productId: 'prod-1', name: 'Fresh Milk 1L', quantity: 3, price: 28000, total: 84000 },
      { productId: 'prod-4', name: 'Cheddar Cheese 200g', quantity: 1, price: 55000, total: 55000 }
    ],
    itemsSummary: 'Fresh Milk 1L × 3',
    subtotal: 139000,
    shippingFee: 8000,
    total: 147000,
    paymentMethod: 'E-Wallet (GoPay)',
    paymentStatus: 'Paid',
    status: 'Shipped',
    orderDate: '26 Oct 2026, 08:30 AM',
    timeline: [
      { title: 'Order Placed', time: '26 Oct 2026, 08:30 AM', note: 'Checkout complete' },
      { title: 'Payment Confirmed', time: '26 Oct 2026, 08:31 AM', note: 'GoPay instant approval' },
      { title: 'Dispatched via Chilled Van', time: '26 Oct 2026, 11:20 AM', note: 'Driver: Pak Joko (B 1234 FM)' }
    ]
  },
  {
    id: '#FM-2046',
    customer: 'Siti Rahmawati',
    customerEmail: 'siti.r@email.com',
    customerPhone: '+62 811-2345-6789',
    shippingAddress: {
      label: 'Home',
      recipient: 'Siti Rahmawati',
      address: 'Komplek Pondok Indah Hijau Blok D2 No. 8',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12310',
      notes: 'Pagar warna coklat'
    },
    items: [
      { productId: 'prod-3', name: 'Unsalted Butter 250g', quantity: 3, price: 38000, total: 114000 },
      { productId: 'prod-4', name: 'Cheddar Cheese 200g', quantity: 1, price: 55000, total: 55000 },
      { productId: 'prod-2', name: 'Greek Yogurt 500g', quantity: 1, price: 41000, total: 41000 }
    ],
    itemsSummary: 'Unsalted Butter + Cheddar Cheese',
    subtotal: 210000,
    shippingFee: 0,
    total: 210000,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    orderDate: '25 Oct 2026, 04:15 PM',
    timeline: [
      { title: 'Delivered', time: '26 Oct 2026, 09:30 AM', note: 'Received by customer with insulated cooler pack' }
    ]
  },
  {
    id: '#FM-2045',
    customer: 'Dimas Pratama',
    customerEmail: 'dimas.p@email.com',
    customerPhone: '+62 815-6789-0123',
    shippingAddress: {
      label: 'Home',
      recipient: 'Dimas Pratama',
      address: 'Jl. Tebet Barat Dalam Raya No. 15',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12810',
      notes: ''
    },
    items: [
      { productId: 'prod-2', name: 'Greek Yogurt 500g', quantity: 2, price: 42000, total: 84000 },
      { productId: 'prod-1', name: 'Fresh Milk 1L', quantity: 1, price: 28000, total: 28000 }
    ],
    itemsSummary: 'Greek Yogurt × 2',
    subtotal: 112000,
    shippingFee: 12000,
    total: 124000,
    paymentMethod: 'Virtual Account',
    paymentStatus: 'Pending',
    status: 'New',
    orderDate: '25 Oct 2026, 07:45 PM',
    timeline: [
      { title: 'Awaiting Payment', time: '25 Oct 2026, 07:45 PM', note: 'Virtual Account issued, expires in 24 hours' }
    ]
  },
  {
    id: '#FM-2044',
    customer: 'Nadia Kirana',
    customerEmail: 'nadia.k@email.com',
    customerPhone: '+62 817-8901-2345',
    shippingAddress: {
      label: 'Bakery Studio',
      recipient: 'Nadia Kirana',
      address: 'Ruko Kemang Arcade No. 7, Jl. Kemang Raya',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
      notes: 'Buka jam 08:00 - 17:00'
    },
    items: [
      { productId: 'prod-1', name: 'Whole Milk 2L', quantity: 2, price: 52000, total: 104000 },
      { productId: 'prod-5', name: 'Fresh Cream 200ml', quantity: 2, price: 31000, total: 62000 },
      { productId: 'prod-1', name: 'Fresh Milk 1L', quantity: 1, price: 26000, total: 26000 }
    ],
    itemsSummary: 'Whole Milk 2L + Fresh Cream',
    subtotal: 192000,
    shippingFee: 0,
    total: 192000,
    paymentMethod: 'E-Wallet',
    paymentStatus: 'Paid',
    status: 'Delivered',
    orderDate: '24 Oct 2026, 11:20 AM',
    timeline: [
      { title: 'Delivered', time: '25 Oct 2026, 10:10 AM', note: 'Order signed by Nadia' }
    ]
  }
];

export const initialTransactions = [
  {
    id: 'TXN-982048',
    orderId: '#FM-2048',
    customer: 'Amelia Putri',
    method: 'Virtual Account',
    channel: 'BCA Virtual Account',
    date: '26 Oct 2026',
    amount: 186000,
    status: 'Successful',
    fee: 4000,
    netAmount: 182000,
    reference: 'REF-BCA-20261026-982048'
  },
  {
    id: 'TXN-982047',
    orderId: '#FM-2047',
    customer: 'Rizky Hartono',
    method: 'E-Wallet',
    channel: 'GoPay',
    date: '26 Oct 2026',
    amount: 147000,
    status: 'Successful',
    fee: 2940,
    netAmount: 144060,
    reference: 'REF-GOPAY-20261026-982047'
  },
  {
    id: 'TXN-982046',
    orderId: '#FM-2046',
    customer: 'Siti Rahmawati',
    method: 'Credit Card',
    channel: 'Visa / Mastercard',
    date: '25 Oct 2026',
    amount: 210000,
    status: 'Successful',
    fee: 5250,
    netAmount: 204750,
    reference: 'REF-VISA-20261025-982046'
  },
  {
    id: 'TXN-982045',
    orderId: '#FM-2045',
    customer: 'Dimas Pratama',
    method: 'Virtual Account',
    channel: 'Mandiri Virtual Account',
    date: '25 Oct 2026',
    amount: 124000,
    status: 'Pending',
    fee: 4000,
    netAmount: 120000,
    reference: 'REF-MDR-20261025-982045'
  },
  {
    id: 'TXN-982044',
    orderId: '#FM-2044',
    customer: 'Nadia Kirana',
    method: 'E-Wallet',
    channel: 'OVO',
    date: '24 Oct 2026',
    amount: 192000,
    status: 'Refunded',
    fee: 0,
    netAmount: 0,
    reference: 'REF-OVO-20261024-982044'
  }
];

export const initialPayments = [
  {
    id: 'PAY-982048',
    orderId: '#FM-2048',
    customer: 'Amelia Putri',
    paymentMethod: 'Virtual Account',
    amount: 186000,
    date: '26 Oct 2026',
    status: 'Successful',
    gatewayReference: 'GW-XND-982048-BCA',
    canVerify: false,
    canRefund: true
  },
  {
    id: 'PAY-982047',
    orderId: '#FM-2047',
    customer: 'Rizky Hartono',
    paymentMethod: 'E-Wallet',
    amount: 147000,
    date: '26 Oct 2026',
    status: 'Successful',
    gatewayReference: 'GW-XND-982047-GOPAY',
    canVerify: false,
    canRefund: true
  },
  {
    id: 'PAY-982045',
    orderId: '#FM-2045',
    customer: 'Dimas Pratama',
    paymentMethod: 'Virtual Account',
    amount: 124000,
    date: '25 Oct 2026',
    status: 'Pending',
    gatewayReference: 'GW-XND-982045-VA-PENDING',
    canVerify: true,
    canRefund: false
  },
  {
    id: 'PAY-982043',
    orderId: '#FM-2043',
    customer: 'Clarisa Wijaya',
    paymentMethod: 'Bank Transfer',
    amount: 98000,
    date: '25 Oct 2026',
    status: 'Failed',
    gatewayReference: 'GW-XND-982043-EXPIRED',
    canVerify: false,
    canRefund: false
  },
  {
    id: 'PAY-982044',
    orderId: '#FM-2044',
    customer: 'Nadia Kirana',
    paymentMethod: 'E-Wallet',
    amount: 192000,
    date: '24 Oct 2026',
    status: 'Refunded',
    gatewayReference: 'GW-XND-982044-REFUND-APPROVED',
    canVerify: false,
    canRefund: false
  }
];

export const initialCustomers = [
  {
    id: 'cust-1',
    name: 'Amelia Putri',
    email: 'amelia.putri@email.com',
    phone: '+62 812-3456-7890',
    avatar: '/assets/user-amelia.png',
    totalOrders: 12,
    totalSpent: 2486000,
    lastOrder: '26 Oct 2026',
    status: 'Active',
    dateJoined: '15 Jan 2026',
    shippingAddress: {
      label: 'Home',
      recipient: 'Amelia Putri',
      address: 'Jl. Senopati Raya No. 42, Kebayoran Baru',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      deliveryNotes: 'Tolong titip di pos satpam bila rumah kosong'
    }
  },
  {
    id: 'cust-2',
    name: 'Rizky Hartono',
    email: 'rizky.h@email.com',
    phone: '+62 813-4567-8901',
    avatar: '/assets/user-rizky.png',
    totalOrders: 8,
    totalSpent: 1764000,
    lastOrder: '26 Oct 2026',
    status: 'Active',
    dateJoined: '02 Feb 2026',
    shippingAddress: {
      label: 'Office',
      recipient: 'Rizky Hartono',
      address: 'Gedung Menara Mandiri Lt. 18, Jl. Jend. Sudirman Kav. 54-55',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12190',
      deliveryNotes: 'Lantai 18 Ruang IT'
    }
  },
  {
    id: 'cust-3',
    name: 'Siti Rahmawati',
    email: 'siti.r@email.com',
    phone: '+62 811-2345-6789',
    avatar: '/assets/user-siti.png',
    totalOrders: 5,
    totalSpent: 985000,
    lastOrder: '25 Oct 2026',
    status: 'Active',
    dateJoined: '18 Mar 2026',
    shippingAddress: {
      label: 'Home',
      recipient: 'Siti Rahmawati',
      address: 'Komplek Pondok Indah Hijau Blok D2 No. 8',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12310',
      deliveryNotes: 'Pagar warna coklat'
    }
  },
  {
    id: 'cust-4',
    name: 'Dimas Pratama',
    email: 'dimas.p@email.com',
    phone: '+62 815-6789-0123',
    avatar: '/assets/user-dimas.png',
    totalOrders: 1,
    totalSpent: 124000,
    lastOrder: '25 Oct 2026',
    status: 'New',
    dateJoined: '25 Oct 2026',
    shippingAddress: {
      label: 'Home',
      recipient: 'Dimas Pratama',
      address: 'Jl. Tebet Barat Dalam Raya No. 15',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12810',
      deliveryNotes: ''
    }
  },
  {
    id: 'cust-5',
    name: 'Nadia Kirana',
    email: 'nadia.k@email.com',
    phone: '+62 817-8901-2345',
    avatar: '/assets/user-nadia.png',
    totalOrders: 3,
    totalSpent: 642000,
    lastOrder: '11 Oct 2026',
    status: 'Active',
    dateJoined: '05 Apr 2026',
    shippingAddress: {
      label: 'Bakery Studio',
      recipient: 'Nadia Kirana',
      address: 'Ruko Kemang Arcade No. 7, Jl. Kemang Raya',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      postalCode: '12730',
      deliveryNotes: 'Buka jam 08:00 - 17:00'
    }
  }
];

export const initialStaff = [
  {
    id: 'staff-1',
    name: 'Vincent Guizot',
    email: 'vincent@freshmeadow.com',
    phone: '+62 811-9876-5432',
    jobTitle: 'Store Director & Admin',
    role: 'Admin',
    lastActive: 'Today, 9:42 AM',
    status: 'Active',
    avatar: '/assets/user-vincent.png',
    createdAt: '01 Jan 2026'
  },
  {
    id: 'staff-2',
    name: 'Amelia Putri',
    email: 'amelia@freshmeadow.com',
    phone: '+62 812-4567-8901',
    jobTitle: 'Dairy Category Specialist',
    role: 'Product Manager',
    lastActive: 'Today, 8:15 AM',
    status: 'Active',
    avatar: '/assets/user-amelia.png',
    createdAt: '15 Jan 2026'
  },
  {
    id: 'staff-3',
    name: 'Rizky Hartono',
    email: 'rizky@freshmeadow.com',
    phone: '+62 813-7890-1234',
    jobTitle: 'Cold-Chain & Warehouse Lead',
    role: 'Inventory Staff',
    lastActive: 'Today, 8:02 AM',
    status: 'Active',
    avatar: '/assets/user-rizky.png',
    createdAt: '01 Feb 2026'
  },
  {
    id: 'staff-4',
    name: 'Siti Rahmawati',
    email: 'siti@freshmeadow.com',
    phone: '+62 815-2345-6789',
    jobTitle: 'Fulfillment Coordinator',
    role: 'Order Manager',
    lastActive: 'Yesterday',
    status: 'Active',
    avatar: '/assets/user-siti.png',
    createdAt: '10 Feb 2026'
  },
  {
    id: 'staff-5',
    name: 'Dimas Pratama',
    email: 'dimas@freshmeadow.com',
    phone: '+62 817-6789-0123',
    jobTitle: 'Media & Catalog Assistant',
    role: 'Content Staff',
    lastActive: 'Invitation sent',
    status: 'Invited',
    avatar: '/assets/user-dimas.png',
    createdAt: '25 Oct 2026'
  }
];

export const initialInventory = [
  {
    id: 'inv-1',
    productId: 'prod-1',
    productName: 'Fresh Whole Milk 1L',
    productSize: '1L',
    sku: 'FM-MILK-001',
    batchNumber: 'FM-261028',
    image: '/assets/prod-milk.png',
    available: 48,
    lowStockAt: 10,
    expiryDate: '28 Oct 2026',
    daysLeft: 3,
    storageType: 'Chilled',
    tempRange: '2–6 °C',
    lastUpdated: '25 Oct 2026, 10:24 AM',
    status: 'Healthy'
  },
  {
    id: 'inv-2',
    productId: 'prod-2',
    productName: 'Greek Yogurt Original 500g',
    productSize: '500g',
    sku: 'FM-YOG-014',
    batchNumber: 'GY-261030',
    image: '/assets/prod-yogurt.png',
    available: 12,
    lowStockAt: 15,
    expiryDate: '30 Oct 2026',
    daysLeft: 5,
    storageType: 'Chilled',
    tempRange: '2–6 °C',
    lastUpdated: '25 Oct 2026, 09:18 AM',
    status: 'Low stock'
  },
  {
    id: 'inv-3',
    productId: 'prod-3',
    productName: 'Unsalted Butter 250g',
    productSize: '250g',
    sku: 'FM-BTR-008',
    batchNumber: 'UB-261102',
    image: '/assets/prod-butter.png',
    available: 8,
    lowStockAt: 10,
    expiryDate: '02 Nov 2026',
    daysLeft: 8,
    storageType: 'Chilled',
    tempRange: '2–6 °C',
    lastUpdated: '24 Oct 2026, 04:36 PM',
    status: 'Low stock'
  },
  {
    id: 'inv-4',
    productId: 'prod-4',
    productName: 'Cheddar Cheese Block 200g',
    productSize: '200g',
    sku: 'FM-CHS-023',
    batchNumber: 'CC-261115',
    image: '/assets/prod-cheese.png',
    available: 0,
    lowStockAt: 8,
    expiryDate: '15 Nov 2026',
    daysLeft: -1,
    storageType: 'Chilled',
    tempRange: '2–6 °C',
    lastUpdated: '24 Oct 2026, 11:02 AM',
    status: 'Out of stock'
  },
  {
    id: 'inv-5',
    productId: 'prod-5',
    productName: 'Fresh Cream 200ml',
    productSize: '200ml',
    sku: 'FM-CRM-011',
    batchNumber: 'FC-261105',
    image: '/assets/prod-cream.png',
    available: 34,
    lowStockAt: 12,
    expiryDate: '05 Nov 2026',
    daysLeft: 11,
    storageType: 'Chilled',
    tempRange: '2–6 °C',
    lastUpdated: '23 Oct 2026, 02:19 PM',
    status: 'Healthy'
  }
];

export const initialStockMovements = [
  {
    id: 'mov-1',
    productId: 'prod-1',
    productName: 'Fresh Whole Milk 1L',
    type: 'Stock Received',
    quantity: 48,
    batchNumber: 'FM-261028',
    supplier: 'Meadow Valley Dairy Co.',
    receivedDate: '26 Oct 2026',
    storageType: 'Chilled / Refrigerated',
    tempRange: '2–6 °C',
    expiryDate: '28 Oct 2026',
    notes: 'Morning fresh delivery in refrigerated tanker #7',
    recordedBy: 'Vincent Guizot',
    timestamp: '26 Oct 2026, 07:15 AM'
  },
  {
    id: 'mov-2',
    productId: 'prod-2',
    productName: 'Greek Yogurt Original 500g',
    type: 'Stock Received',
    quantity: 24,
    batchNumber: 'GY-261030',
    supplier: 'Highland Dairy Cooperative',
    receivedDate: '24 Oct 2026',
    storageType: 'Chilled / Refrigerated',
    tempRange: '2–6 °C',
    expiryDate: '30 Oct 2026',
    notes: 'Direct farm transfer',
    recordedBy: 'Rizky Hartono',
    timestamp: '24 Oct 2026, 09:30 AM'
  }
];

export const initialSettings = {
  storeName: 'Fresh Meadow Dairy',
  supportEmail: 'hello@freshmeadow.com',
  phone: '+62 21 555 0123',
  currency: 'Indonesian Rupiah (IDR)',
  timeZone: 'Asia/Jakarta (GMT+7)',
  dateFormat: 'DD MMM YYYY',
  lowStockAlerts: true,
  expiringProductsAlerts: true,
  newOrderNotifications: true
};

export const rolePermissions = {
  Admin: {
    label: 'Admin',
    description: 'Full store access including staff creation, payment configuration, and settings.',
    permissions: [
      { name: 'View products', allowed: true },
      { name: 'Manage products & categories', allowed: true },
      { name: 'View inventory & record stock movements', allowed: true },
      { name: 'Manage orders & process shipments', allowed: true },
      { name: 'Manage staff accounts', allowed: true },
      { name: 'Configure payments & issue refunds', allowed: true },
      { name: 'Change store settings', allowed: true }
    ]
  },
  'Product Manager': {
    label: 'Product Manager',
    description: 'Can manage catalog products, collections, pricing, and variants.',
    permissions: [
      { name: 'View products', allowed: true },
      { name: 'Manage products & categories', allowed: true },
      { name: 'View inventory', allowed: true },
      { name: 'Record stock movements', allowed: false },
      { name: 'Manage staff', allowed: false },
      { name: 'Configure payments', allowed: false },
      { name: 'Change store settings', allowed: false }
    ]
  },
  'Inventory Staff': {
    label: 'Inventory Staff',
    description: 'Can manage inventory and record stock movements.',
    permissions: [
      { name: 'View products', allowed: true },
      { name: 'View inventory', allowed: true },
      { name: 'Record stock movements', allowed: true },
      { name: 'Manage staff', allowed: false },
      { name: 'Configure payments', allowed: false },
      { name: 'Change store settings', allowed: false }
    ]
  },
  'Order Manager': {
    label: 'Order Manager',
    description: 'Can review customer orders, update delivery status, and view customer shipping details.',
    permissions: [
      { name: 'View products', allowed: true },
      { name: 'View inventory', allowed: true },
      { name: 'Manage orders & process shipments', allowed: true },
      { name: 'View transactions & payments', allowed: true },
      { name: 'Manage staff', allowed: false },
      { name: 'Configure payments', allowed: false },
      { name: 'Change store settings', allowed: false }
    ]
  },
  'Content Staff': {
    label: 'Content Staff',
    description: 'Can view products, update descriptions, and manage SEO metadata.',
    permissions: [
      { name: 'View products', allowed: true },
      { name: 'Manage products & categories', allowed: true },
      { name: 'Record stock movements', allowed: false },
      { name: 'Manage staff', allowed: false },
      { name: 'Configure payments', allowed: false },
      { name: 'Change store settings', allowed: false }
    ]
  }
};
