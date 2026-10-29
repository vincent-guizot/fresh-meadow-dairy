'use strict';

const { sequelize, User, Category, Product, Order, OrderItem, StockMovement } = require('../models');
const { encryptPwd } = require('../helpers/bcrypt');

async function seedData() {
  try {
    console.log('Seeding comprehensive Fresh Meadow Dairy data...');

    // 1. Seed Categories
    const categoriesData = [
      {
        name: 'Milk',
        slug: 'milk',
        description: 'Fresh pasteurized whole milk, A2 protein, and dairy drinks',
        icon: 'Milk',
        image: '/assets/cat-milk.png',
        status: 'active'
      },
      {
        name: 'Yogurt',
        slug: 'yogurt',
        description: 'Greek yogurt, drinking yogurt, and live probiotic cultures',
        icon: 'Droplets',
        image: '/assets/cat-yogurt.png',
        status: 'active'
      },
      {
        name: 'Cheese',
        slug: 'cheese',
        description: 'Naturally aged farmhouse cheddar, mozzarella, and artisan cheese',
        icon: 'Shield',
        image: '/assets/cat-cheese.png',
        status: 'active'
      },
      {
        name: 'Butter',
        slug: 'butter',
        description: 'Slow-churned European-style salted and unsalted grass-fed butter',
        icon: 'Sparkles',
        image: '/assets/cat-butter.png',
        status: 'active'
      },
      {
        name: 'Cream',
        slug: 'cream',
        description: 'Fresh heavy whipping cream and culinary cooking cream',
        icon: 'Coffee',
        image: '/assets/cat-cream.png',
        status: 'active'
      },
      {
        name: 'Plant-Based',
        slug: 'plant-based',
        description: 'Barista oat milk, almond, and organic plant alternatives',
        icon: 'Leaf',
        image: '/assets/cat-milk.png',
        status: 'active'
      }
    ];

    const categoryMap = {};
    for (const cat of categoriesData) {
      const [record] = await Category.findOrCreate({
        where: { slug: cat.slug },
        defaults: cat
      });
      categoryMap[cat.name] = record.id;
      categoryMap[cat.slug] = record.id;
    }
    console.log('Categories seeded:', Object.keys(categoryMap));

    // 2. Seed Users (Admin, Staff, Customers)
    const usersData = [
      // Admin & Staff
      {
        username: 'vincent',
        name: 'Vincent Guizot',
        email: 'vincent@freshmeadow.com',
        password: encryptPwd('admin123'),
        role: 'admin',
        phoneNumber: '+62 811-2345-6789',
        address: 'Highland Meadow Estate #1, Lembang',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'ratna_sari',
        name: 'Ratna Sari',
        email: 'ratna@freshmeadow.com',
        password: encryptPwd('staff123'),
        role: 'staff',
        phoneNumber: '+62 812-3456-7890',
        address: 'Jl. Surya Sumantri No. 42, Bandung',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'bambang_w',
        name: 'Bambang Wijaya',
        email: 'bambang@freshmeadow.com',
        password: encryptPwd('staff123'),
        role: 'staff',
        phoneNumber: '+62 813-4567-8901',
        address: 'Jl. Raya Lembang No. 108',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'eko_driver',
        name: 'Eko Prasetyo',
        email: 'eko@freshmeadow.com',
        password: encryptPwd('staff123'),
        role: 'staff',
        phoneNumber: '+62 814-5678-9012',
        address: 'Jl. Setiabudi No. 15, Bandung',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },

      // Customers
      {
        username: 'siti_rahma',
        name: 'Siti Rahmawati',
        email: 'siti.r@email.com',
        password: encryptPwd('customer123'),
        role: 'customer',
        phoneNumber: '+62 811-2345-6789',
        address: 'Komplek Pondok Indah Hijau Blok D2 No. 8, Jakarta Selatan',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'dimas_pratama',
        name: 'Dimas Pratama',
        email: 'dimas.p@email.com',
        password: encryptPwd('customer123'),
        role: 'customer',
        phoneNumber: '+62 815-6789-0123',
        address: 'Jl. Tebet Barat Dalam Raya No. 15, Jakarta Selatan',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'nadia_kirana',
        name: 'Nadia Kirana',
        email: 'nadia.k@email.com',
        password: encryptPwd('customer123'),
        role: 'customer',
        phoneNumber: '+62 817-8901-2345',
        address: 'Ruko Kemang Arcade No. 7, Jl. Kemang Raya, Jakarta Selatan',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'budi_santoso',
        name: 'Budi Santoso',
        email: 'budi.s@email.com',
        password: encryptPwd('customer123'),
        role: 'customer',
        phoneNumber: '+62 818-9012-3456',
        address: 'Apartemen Green Valley Tower A #14B, Bandung',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      },
      {
        username: 'dewi_lestari',
        name: 'Dewi Lestari',
        email: 'dewi.l@email.com',
        password: encryptPwd('customer123'),
        role: 'customer',
        phoneNumber: '+62 819-0123-4567',
        address: 'Jl. Ciumbuleuit No. 88, Lembang',
        avatar: '/assets/user-vincent.png',
        status: 'active'
      }
    ];

    const userMap = {};
    for (const u of usersData) {
      let record = await User.findOne({ where: { email: u.email } });
      if (!record) {
        record = await User.create(u);
      } else {
        await record.update({
          role: u.role,
          name: u.name,
          phoneNumber: u.phoneNumber,
          address: u.address,
          status: u.status
        });
      }
      userMap[u.username] = record.id;
    }
    console.log('Users seeded with roles (admin, staff, customer).');

    // 3. Update existing Products with CategoryId and create fresh ones
    const productsData = [
      {
        name: 'Fresh Pasteurized Whole Milk',
        info: 'Susu segar pasteurisasi murni 100% dari sapi Jersey padang rumput alami. Dingin stabil.',
        category: 'Milk',
        price: 28000,
        stock: 35,
        image: '/assets/prod-milk.png',
        volume: '1000 ml',
        expiredDate: '2026-11-08',
        storageTemp: '2°C - 4°C'
      },
      {
        name: 'Artisan Greek Yogurt Plain',
        info: 'Yogurt Yunani kental tinggi protein alami tanpa gula tambahan atau pengental buatan.',
        category: 'Yogurt',
        price: 45000,
        stock: 20,
        image: '/assets/prod-yogurt.png',
        volume: '500 g',
        expiredDate: '2026-11-15',
        storageTemp: '2°C - 4°C'
      },
      {
        name: 'Pure Salted Farmhouse Butter',
        info: 'Mentega tradisional slow-churned dengan 82% butterfat dan taburan garam kristal laut.',
        category: 'Butter',
        price: 39000,
        stock: 40,
        image: '/assets/prod-butter.png',
        volume: '250 g',
        expiredDate: '2026-12-01',
        storageTemp: '2°C - 6°C'
      },
      {
        name: 'Aged Farmhouse Cheddar Cheese',
        info: 'Keju cheddar matang selama 12 bulan dengan cita rasa gurih khas dan tekstur renyah alami.',
        category: 'Cheese',
        price: 62000,
        stock: 14,
        image: '/assets/prod-cheese.png',
        volume: '200 g',
        expiredDate: '2026-12-15',
        storageTemp: '2°C - 6°C'
      },
      {
        name: 'Fresh Mozzarella Ball in Brine',
        info: 'Keju mozzarella segar lembut yang dibuat tangan setiap subuh, disimpan dalam air dadih murni.',
        category: 'Cheese',
        price: 52000,
        stock: 8,
        image: '/assets/prod-cheese.png',
        volume: '180 g',
        expiredDate: '2026-11-05',
        storageTemp: '2°C - 4°C'
      },
      {
        name: 'Heavy Whipping Cream 35%',
        info: 'Krim kental murni 35% butterfat yang mudah mengembang sempurna untuk kue dan kopi artisan.',
        category: 'Cream',
        price: 68000,
        stock: 18,
        image: '/assets/prod-cream.png',
        volume: '500 ml',
        expiredDate: '2026-11-10',
        storageTemp: '2°C - 4°C'
      },
      {
        name: 'Belgian Chocolate Milk Drink',
        info: 'Paduan susu segar murni dengan cokelat Belgia pekat 70% yang kaya dan lembut.',
        category: 'Milk',
        price: 18000,
        stock: 50,
        image: '/assets/prod-milk.png',
        volume: '300 ml',
        expiredDate: '2026-11-06',
        storageTemp: '2°C - 4°C'
      },
      {
        name: 'Barista Oat Milk Alternative',
        info: 'Susu nabati gandum organik untuk seduhan latte dengan busa mikro yang lembut dan stabil.',
        category: 'Plant-Based',
        price: 42000,
        stock: 25,
        image: '/assets/prod-milk.png',
        volume: '1000 ml',
        expiredDate: '2026-12-30',
        storageTemp: 'Room Temp / Chilled'
      }
    ];

    const adminUserId = userMap['vincent'] || 1;
    for (const p of productsData) {
      const catId = categoryMap[p.category] || categoryMap['Milk'];
      let record = await Product.findOne({ where: { name: p.name } });
      if (!record) {
        await Product.create({
          ...p,
          CategoryId: catId,
          UserId: adminUserId
        });
      } else {
        await record.update({
          CategoryId: catId,
          UserId: adminUserId,
          info: p.info,
          price: p.price,
          stock: p.stock,
          image: p.image,
          volume: p.volume,
          expiredDate: p.expiredDate,
          storageTemp: p.storageTemp
        });
      }
    }
    console.log('Products linked to Categories.');

    // 4. Seed Orders & OrderItems (with multiple statuses)
    const existingOrdersCount = await Order.count();
    if (existingOrdersCount === 0) {
      const ordersToSeed = [
        {
          orderNumber: 'FMD-849201',
          UserId: userMap['budi_santoso'],
          customerName: 'Budi Santoso',
          customerEmail: 'budi.s@email.com',
          customerPhone: '+62 818-9012-3456',
          shippingAddress: 'Apartemen Green Valley Tower A #14B, Bandung',
          deliverySlot: 'morning',
          isColdPacking: true,
          notes: 'Tolong gantungkan di pintu depan.',
          status: 'Pending',
          paymentStatus: 'Paid',
          paymentMethod: 'QRIS',
          subtotal: 98000,
          shippingFee: 15000,
          total: 113000,
          timeline: JSON.stringify([
            { title: 'Pesanan Masuk', time: '29 Okt 2026, 07:15 WIB', note: 'Menunggu konfirmasi admin' },
            { title: 'Pembayaran Lunas', time: '29 Okt 2026, 07:16 WIB', note: 'QRIS instant confirmation' }
          ]),
          items: [
            { name: 'Fresh Pasteurized Whole Milk', price: 28000, quantity: 2, total: 56000, image: '/assets/prod-milk.png' },
            { name: 'Pure Salted Farmhouse Butter', price: 39000, quantity: 1, total: 39000, image: '/assets/prod-butter.png' }
          ]
        },
        {
          orderNumber: 'FMD-849202',
          UserId: userMap['siti_rahma'],
          customerName: 'Siti Rahmawati',
          customerEmail: 'siti.r@email.com',
          customerPhone: '+62 811-2345-6789',
          shippingAddress: 'Komplek Pondok Indah Hijau Blok D2 No. 8, Jakarta Selatan',
          deliverySlot: 'morning',
          isColdPacking: true,
          notes: 'Pagar warna coklat, taruh di cooler box depan.',
          status: 'Confirmed',
          paymentStatus: 'Paid',
          paymentMethod: 'Bank Transfer',
          subtotal: 210000,
          shippingFee: 0,
          total: 210000,
          timeline: JSON.stringify([
            { title: 'Pesanan Masuk', time: '28 Okt 2026, 14:20 WIB', note: 'Checkout selesai' },
            { title: 'Disetujui Admin', time: '28 Okt 2026, 14:35 WIB', note: 'Pesanan diverifikasi oleh Vincent Guizot' }
          ]),
          items: [
            { name: 'Pure Salted Farmhouse Butter', price: 39000, quantity: 3, total: 117000, image: '/assets/prod-butter.png' },
            { name: 'Artisan Greek Yogurt Plain', price: 45000, quantity: 2, total: 90000, image: '/assets/prod-yogurt.png' }
          ]
        },
        {
          orderNumber: 'FMD-849203',
          UserId: userMap['dimas_pratama'],
          customerName: 'Dimas Pratama',
          customerEmail: 'dimas.p@email.com',
          customerPhone: '+62 815-6789-0123',
          shippingAddress: 'Jl. Tebet Barat Dalam Raya No. 15, Jakarta Selatan',
          deliverySlot: 'morning',
          isColdPacking: true,
          notes: '',
          status: 'Preparing',
          paymentStatus: 'Paid',
          paymentMethod: 'QRIS',
          subtotal: 124000,
          shippingFee: 15000,
          total: 139000,
          timeline: JSON.stringify([
            { title: 'Pesanan Dikonfirmasi', time: '28 Okt 2026, 16:00 WIB', note: 'Admin menyetujui pesanan' },
            { title: 'Sedang Disiapkan', time: '28 Okt 2026, 17:30 WIB', note: 'Dikemas dalam wadah insulasi foil dingin' }
          ]),
          items: [
            { name: 'Fresh Pasteurized Whole Milk', price: 28000, quantity: 2, total: 56000, image: '/assets/prod-milk.png' },
            { name: 'Heavy Whipping Cream 35%', price: 68000, quantity: 1, total: 68000, image: '/assets/prod-cream.png' }
          ]
        },
        {
          orderNumber: 'FMD-849204',
          UserId: userMap['nadia_kirana'],
          customerName: 'Nadia Kirana',
          customerEmail: 'nadia.k@email.com',
          customerPhone: '+62 817-8901-2345',
          shippingAddress: 'Ruko Kemang Arcade No. 7, Jl. Kemang Raya, Jakarta Selatan',
          deliverySlot: 'morning',
          isColdPacking: true,
          notes: 'Studio Bakery lantai 2',
          status: 'Shipped',
          paymentStatus: 'Paid',
          paymentMethod: 'Bank Transfer',
          subtotal: 192000,
          shippingFee: 0,
          total: 192000,
          timeline: JSON.stringify([
            { title: 'Pesanan Disiapkan', time: '27 Okt 2026, 18:00 WIB', note: 'Kemas pendingin selesai' },
            { title: 'Dalam Pengantaran', time: '28 Okt 2026, 05:45 WIB', note: 'Armada Dingin Eko Prasetyo (B 4291 FM)' }
          ]),
          items: [
            { name: 'Heavy Whipping Cream 35%', price: 68000, quantity: 2, total: 136000, image: '/assets/prod-cream.png' },
            { name: 'Fresh Pasteurized Whole Milk', price: 28000, quantity: 2, total: 56000, image: '/assets/prod-milk.png' }
          ]
        },
        {
          orderNumber: 'FMD-849205',
          UserId: userMap['dewi_lestari'],
          customerName: 'Dewi Lestari',
          customerEmail: 'dewi.l@email.com',
          customerPhone: '+62 819-0123-4567',
          shippingAddress: 'Jl. Ciumbuleuit No. 88, Lembang',
          deliverySlot: 'morning',
          isColdPacking: true,
          notes: '',
          status: 'Delivered',
          paymentStatus: 'Paid',
          paymentMethod: 'COD',
          subtotal: 145000,
          shippingFee: 0,
          total: 145000,
          timeline: JSON.stringify([
            { title: 'Diantar', time: '27 Okt 2026, 06:30 WIB', note: 'Kurir berangkat' },
            { title: 'Pesanan Selesai / Diterima', time: '27 Okt 2026, 07:15 WIB', note: 'Diterima langsung oleh Bu Dewi' }
          ]),
          items: [
            { name: 'Aged Farmhouse Cheddar Cheese', price: 62000, quantity: 1, total: 62000, image: '/assets/prod-cheese.png' },
            { name: 'Artisan Greek Yogurt Plain', price: 45000, quantity: 1, total: 45000, image: '/assets/prod-yogurt.png' },
            { name: 'Fresh Pasteurized Whole Milk', price: 28000, quantity: 1, total: 28000, image: '/assets/prod-milk.png' }
          ]
        }
      ];

      for (const ord of ordersToSeed) {
        const { items, ...orderHeader } = ord;
        const createdOrder = await Order.create(orderHeader);
        for (const it of items) {
          await OrderItem.create({
            OrderId: createdOrder.id,
            name: it.name,
            price: it.price,
            quantity: it.quantity,
            total: it.total,
            image: it.image
          });
        }
      }
      console.log('Orders and OrderItems seeded.');
    }

    // 5. Seed Stock Movements
    const existingMovements = await StockMovement.count();
    if (existingMovements === 0) {
      const allProducts = await Product.findAll();
      for (const prod of allProducts) {
        await StockMovement.create({
          ProductId: prod.id,
          type: 'IN',
          quantity: prod.stock,
          previousStock: 0,
          newStock: prod.stock,
          reason: 'Panen Pagi & Pasteurisasi Awal',
          batchNumber: `FMD-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}`,
          recordedBy: 'Vincent Guizot'
        });
      }
      console.log('Stock Movements seeded.');
    }

    console.log('✅ Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Seeding error:', err);
  }
}

seedData().then(() => {
  process.exit(0);
});
