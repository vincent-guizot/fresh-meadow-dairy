'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Add extra fields to Users table for roles (admin, staff, customer)
    const userTableInfo = await queryInterface.describeTable('Users');

    if (!userTableInfo.role) {
      await queryInterface.addColumn('Users', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'customer'
      });
    }

    if (!userTableInfo.name) {
      await queryInterface.addColumn('Users', 'name', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!userTableInfo.phoneNumber) {
      await queryInterface.addColumn('Users', 'phoneNumber', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!userTableInfo.address) {
      await queryInterface.addColumn('Users', 'address', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }

    if (!userTableInfo.avatar) {
      await queryInterface.addColumn('Users', 'avatar', {
        type: Sequelize.STRING,
        allowNull: true
      });
    }

    if (!userTableInfo.status) {
      await queryInterface.addColumn('Users', 'status', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      });
    }

    // 2. Create Categories table
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING,
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 3. Add CategoryId to Products table
    const productTableInfo = await queryInterface.describeTable('Products');
    if (!productTableInfo.CategoryId) {
      await queryInterface.addColumn('Products', 'CategoryId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      });
    }

    // 4. Create Orders table
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      customerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      customerEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      customerPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shippingAddress: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      deliverySlot: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'morning'
      },
      isColdPacking: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Pending'
      },
      paymentStatus: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Paid'
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'QRIS'
      },
      subtotal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      shippingFee: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      timeline: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 5. Create OrderItems table
    await queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      OrderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // 6. Create StockMovements table
    await queryInterface.createTable('StockMovements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      previousStock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      newStock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: true
      },
      batchNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      recordedBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StockMovements');
    await queryInterface.dropTable('OrderItems');
    await queryInterface.dropTable('Orders');
    await queryInterface.removeColumn('Products', 'CategoryId');
    await queryInterface.dropTable('Categories');
    await queryInterface.removeColumn('Users', 'status');
    await queryInterface.removeColumn('Users', 'avatar');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'phoneNumber');
    await queryInterface.removeColumn('Users', 'name');
    await queryInterface.removeColumn('Users', 'role');
  }
};
