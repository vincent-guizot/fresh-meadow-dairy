export const dairyCategories = [
  { id: 'all', name: 'All Products', icon: 'Milk' },
  { id: 'Milk', name: 'Fresh Milk', icon: 'Milk' },
  { id: 'Yogurt', name: 'Artisan Yogurt', icon: 'Cup' },
  { id: 'Butter', name: 'Grass-Fed Butter', icon: 'Layers' },
  { id: 'Cheese', name: 'Farm Cheese', icon: 'Shield' },
  { id: 'Desserts', name: 'Cream Desserts', icon: 'Sparkles' }
];

export const products = [
  {
    id: 'prod-1',
    name: 'Fresh Whole Milk 1L',
    sku: 'FMD-MILK-001',
    category: 'Milk',
    price: 25000,
    salePrice: 22000,
    rating: 4.9,
    reviewCount: 142,
    image: '/assets/prod-milk.png',
    badge: 'Best Seller',
    volume: '1 Liter',
    variants: [
      { size: '500ml', price: 15000 },
      { size: '1 Liter', price: 22000 }
    ],
    shelfLife: '7 days',
    storageTemp: '2–6 °C (Refrigerated)',
    description: '100% pure fresh cow milk straight from pasture-raised Friesian cows in our cool highland valley. Gently pasteurized to preserve natural enzymes, rich creaminess, and vitamins.',
    nutrition: { calories: '150 kcal', fat: '8g', protein: '8g', calcium: '28%' }
  },
  {
    id: 'prod-2',
    name: 'Greek Style Natural Yogurt 500g',
    sku: 'FMD-YOG-002',
    category: 'Yogurt',
    price: 32000,
    salePrice: 0,
    rating: 4.8,
    reviewCount: 98,
    image: '/assets/prod-yogurt.png',
    badge: 'High Protein',
    volume: '500 gram',
    variants: [
      { size: '250g', price: 18000 },
      { size: '500g', price: 32000 }
    ],
    shelfLife: '14 days',
    storageTemp: '2–4 °C (Refrigerated)',
    description: 'Thick, creamy, authentic strained yogurt cultured slowly with live active probiotic cultures. Unsweetened with a delicate natural tartness.',
    nutrition: { calories: '130 kcal', fat: '4g', protein: '15g', calcium: '20%' }
  },
  {
    id: 'prod-3',
    name: 'Grass-Fed Salted Meadow Butter 227g',
    sku: 'FMD-BUT-003',
    category: 'Butter',
    price: 45000,
    salePrice: 42000,
    rating: 5.0,
    reviewCount: 187,
    image: '/assets/prod-butter.png',
    badge: 'Award Winner',
    volume: '227 gram',
    variants: [
      { size: '227g Salted', price: 42000 },
      { size: '227g Unsalted', price: 42000 }
    ],
    shelfLife: '60 days',
    storageTemp: 'Chilled / Freezer safe',
    description: 'Slow-churned artisan butter made exclusively with sweet cream from 100% pasture-fed cows. Naturally golden yellow, exceptionally spreadable, seasoned with sea salt crystals.',
    nutrition: { calories: '100 kcal', fat: '11g', protein: '0.1g', calcium: '2%' }
  },
  {
    id: 'prod-4',
    name: 'Artisan Farmhouse Cheddar 200g',
    sku: 'FMD-CHS-004',
    category: 'Cheese',
    price: 58000,
    salePrice: 0,
    rating: 4.7,
    reviewCount: 64,
    image: '/assets/prod-cheese.png',
    badge: 'Aged 6 Months',
    volume: '200 gram',
    variants: [
      { size: '200g Block', price: 58000 },
      { size: '400g Family', price: 110000 }
    ],
    shelfLife: '90 days',
    storageTemp: '4–8 °C',
    description: 'Traditional clothbound cheddar cheese carefully aged for six months in our stone cellars. Sharp, nutty, with subtle savory crystals that melt on the palate.',
    nutrition: { calories: '110 kcal', fat: '9g', protein: '7g', calcium: '25%' }
  },
  {
    id: 'prod-5',
    name: 'Pure Heavy Whipping Cream 250ml',
    sku: 'FMD-CRM-005',
    category: 'Desserts',
    price: 28000,
    salePrice: 0,
    rating: 4.9,
    reviewCount: 53,
    image: '/assets/prod-cream.png',
    badge: '36% Milk Fat',
    volume: '250 ml',
    variants: [
      { size: '250ml', price: 28000 },
      { size: '500ml', price: 52000 }
    ],
    shelfLife: '10 days',
    storageTemp: '2–4 °C (Do not freeze)',
    description: 'Rich, thick dairy cream skimmed from morning milkings. Whips into stiff, velvety peaks in minutes with no stabilizers or carrageenan.',
    nutrition: { calories: '190 kcal', fat: '20g', protein: '2g', calcium: '6%' }
  },
  {
    id: 'prod-6',
    name: 'Strawberry Velvet Drinking Yogurt 330ml',
    sku: 'FMD-YOG-006',
    category: 'Yogurt',
    price: 18000,
    salePrice: 15000,
    rating: 4.8,
    reviewCount: 89,
    image: '/assets/prod-yogurt.png',
    badge: 'Real Fruit',
    volume: '330 ml',
    variants: [
      { size: '330ml Bottle', price: 15000 },
      { size: 'Pack of 3', price: 42000 }
    ],
    shelfLife: '12 days',
    storageTemp: '2–6 °C',
    description: 'Smooth drinkable probiotic yogurt blended with Highland strawberries and a drizzle of raw forest honey.',
    nutrition: { calories: '140 kcal', fat: '3g', protein: '6g', calcium: '18%' }
  }
];
