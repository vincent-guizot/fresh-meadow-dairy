'use strict';

const { Order, Product, User, sequelize } = require('../models');

class OverviewController {
  static async getStats(req, res, next) {
    try {
      const totalRevenueResult = await Order.sum('total');
      const totalRevenue = totalRevenueResult || 0;

      const totalOrders = await Order.count();
      const pendingOrders = await Order.count({ where: { status: 'Pending' } });
      const processingOrders = await Order.count({
        where: {
          status: ['Confirmed', 'Preparing', 'Processing']
        }
      });
      const inDeliveryOrders = await Order.count({ where: { status: 'Shipped' } });
      const completedOrders = await Order.count({ where: { status: 'Delivered' } });

      const totalProducts = await Product.count();
      const lowStockProducts = await Product.count({
        where: {
          stock: {
            [sequelize.Sequelize.Op.lte]: 10
          }
        }
      });

      const totalCustomers = await User.count({ where: { role: 'customer' } });
      const totalStaff = await User.count({
        where: {
          role: ['admin', 'staff']
        }
      });

      const recentOrders = await Order.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
      });

      return res.status(200).json({
        totalRevenue,
        totalOrders,
        pendingOrders,
        processingOrders,
        inDeliveryOrders,
        completedOrders,
        totalProducts,
        lowStockCount: lowStockProducts,
        totalCustomers,
        totalStaff,
        coldStorageTemp: '3.2°C',
        recentOrders
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OverviewController;
