'use strict';

const { Product, StockMovement, Category, sequelize } = require('../models');

class InventoryController {
  static async list(req, res, next) {
    try {
      const products = await Product.findAll({
        include: [{ model: Category, as: 'categoryDetail' }],
        order: [['id', 'ASC']]
      });

      const inventoryList = products.map((prod) => {
        let status = 'Optimal';
        if (prod.stock === 0) status = 'Habis';
        else if (prod.stock <= 10) status = 'Menipis';

        return {
          id: `inv-${prod.id}`,
          productId: prod.id,
          name: prod.name,
          sku: `FM-${prod.category?.slice(0, 3).toUpperCase() || 'DAI'}-00${prod.id}`,
          category: prod.category,
          stock: prod.stock,
          unit: prod.volume || '1 Liter',
          storageTemp: prod.storageTemp || '2°C - 4°C',
          shelfLife: prod.expiredDate || '7 Hari',
          status,
          image: prod.image
        };
      });

      return res.status(200).json(inventoryList);
    } catch (err) {
      next(err);
    }
  }

  static async movements(req, res, next) {
    try {
      const movements = await StockMovement.findAll({
        include: [{ model: Product, as: 'product', attributes: ['id', 'name', 'category', 'image'] }],
        order: [['createdAt', 'DESC']],
        limit: 50
      });
      return res.status(200).json(movements);
    } catch (err) {
      next(err);
    }
  }

  static async record(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { productId, type = 'IN', quantity, reason, batchNumber, recordedBy } = req.body;
      const prod = await Product.findByPk(productId, { transaction: t });
      if (!prod) {
        await t.rollback();
        return res.status(404).json({ msg: 'Product not found' });
      }

      const qty = Number(quantity);
      const prev = prod.stock;
      let nextStock = prev;

      if (type === 'IN') {
        nextStock = prev + qty;
      } else if (type === 'OUT') {
        nextStock = Math.max(0, prev - qty);
      } else if (type === 'ADJUSTMENT') {
        nextStock = qty;
      }

      await prod.update({ stock: nextStock }, { transaction: t });

      const movement = await StockMovement.create(
        {
          ProductId: prod.id,
          type,
          quantity: qty,
          previousStock: prev,
          newStock: nextStock,
          reason: reason || 'Pencatatan Stok Manual',
          batchNumber: batchNumber || `FMD-${Date.now().toString().slice(-6)}`,
          recordedBy: recordedBy || 'Admin'
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(201).json({
        success: true,
        movement,
        product: prod
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }
}

module.exports = InventoryController;
