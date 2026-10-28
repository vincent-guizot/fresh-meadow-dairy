'use strict';

const getFutureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Prevent duplicate entries when re-seeding
    await queryInterface.bulkDelete('Products', { UserId: 1 }, {});
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Fresh Pasteurized Whole Milk',
        info: 'Susu segar pasteurisasi murni 100% dari peternakan lokal, kaya kalsium dan vitamin D.',
        category: 'Fresh Milk',
        price: 28000,
        stock: 35,
        volume: '1 Liter',
        expiredDate: getFutureDate(7), // Near expiry alert
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Artisan Greek Yogurt Plain',
        info: 'Yogurt kental tradisional Yunani dengan tekstur lembut, tinggi protein tanpa gula tambahan.',
        category: 'Yogurt',
        price: 45000,
        stock: 20,
        volume: '500 gram',
        expiredDate: getFutureDate(25), // Fresh
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Aged Farmhouse Cheddar Cheese',
        info: 'Keju cheddar alami hasil pemeraman 12 bulan dengan cita rasa gurih tajam khas creamery.',
        category: 'Cheese',
        price: 62000,
        stock: 14,
        volume: '200 gram',
        expiredDate: getFutureDate(90), // Very fresh
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fresh Mozzarella Ball in Brine',
        info: 'Keju mozzarella segar lembut dalam air garam, sempurna untuk pizza dan salad caprese.',
        category: 'Cheese',
        price: 52000,
        stock: 8,
        volume: '250 gram',
        expiredDate: getFutureDate(4), // Critical near expiry
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pure Salted Farmhouse Butter',
        info: 'Mentega murni dari krim susu pilihan dengan garam laut alami, cocok untuk baking & olesan.',
        category: 'Butter & Cream',
        price: 39000,
        stock: 40,
        volume: '227 gram',
        expiredDate: getFutureDate(120), // Fresh
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Heavy Whipping Cream 35%',
        info: 'Krim kental murni berkadar lemak 35% untuk pembuatan saus pasta, dessert, dan foam kopi.',
        category: 'Butter & Cream',
        price: 68000,
        stock: 18,
        volume: '1 Liter',
        expiredDate: getFutureDate(18), // Fresh
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Belgian Chocolate Milk Drink',
        info: 'Perpaduan susu segar pasteurisasi dengan cokelat Belgia pekat yang nikmat dan menyegarkan.',
        category: 'Fresh Milk',
        price: 15000,
        stock: 50,
        volume: '250 ml',
        expiredDate: getFutureDate(10), // Near expiry
        storageTemp: 'Chilled (2°C - 4°C)',
        image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barista Oat Milk Dairy-Alternative',
        info: 'Susu oat nabati ramah laktosa yang diformulasikan khusus untuk latte art dan kopi susu.',
        category: 'Plant-Based Alternative',
        price: 42000,
        stock: 25,
        volume: '1 Liter',
        expiredDate: getFutureDate(180), // Long shelf life
        storageTemp: 'Room Temperature (20°C - 25°C)',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
