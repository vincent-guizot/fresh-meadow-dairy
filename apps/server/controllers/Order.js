'use strict';

const { Order, OrderItem, Product, User, sequelize } = require('../models');

class OrderController {
  static async list(req, res, next) {
    try {
      const { status, paymentStatus, search } = req.query;
      const where = {};
      if (status && status !== 'All Orders' && status !== 'All') {
        where.status = status;
      }
      if (paymentStatus && paymentStatus !== 'All') {
        where.paymentStatus = paymentStatus;
      }

      const orders = await Order.findAll({
        where,
        include: [
          {
            model: OrderItem,
            as: 'items'
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'name', 'phoneNumber', 'role']
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      // Format orders for CMS & web-user consumption
      const formatted = orders.map((order) => {
        const plain = order.get({ plain: true });
        let parsedTimeline = [];
        try {
          parsedTimeline = plain.timeline ? JSON.parse(plain.timeline) : [];
        } catch (e) {
          parsedTimeline = [];
        }

        const itemsSummary = plain.items && plain.items.length > 0
          ? plain.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')
          : 'Custom Dairy Pack';

        return {
          ...plain,
          id: plain.orderNumber || `#FM-${plain.id}`,
          orderId: plain.id,
          customer: plain.customerName,
          orderDate: new Date(plain.createdAt).toLocaleString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          itemsSummary,
          timeline: parsedTimeline
        };
      });

      return res.status(200).json(formatted);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const isNumeric = /^\d+$/.test(id);
      const where = isNumeric ? { id: Number(id) } : { orderNumber: id };

      const order = await Order.findOne({
        where,
        include: [
          {
            model: OrderItem,
            as: 'items'
          },
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'email', 'name', 'phoneNumber', 'role']
          }
        ]
      });

      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      const plain = order.get({ plain: true });
      let parsedTimeline = [];
      try {
        parsedTimeline = plain.timeline ? JSON.parse(plain.timeline) : [];
      } catch (e) {
        parsedTimeline = [];
      }

      return res.status(200).json({
        ...plain,
        id: plain.orderNumber || `#FM-${plain.id}`,
        orderId: plain.id,
        customer: plain.customerName,
        timeline: parsedTimeline
      });
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const {
        items = [],
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        deliverySlot = 'morning',
        isColdPacking = true,
        notes = '',
        paymentMethod = 'QRIS',
        subtotal = 0,
        shippingFee = 0,
        total = 0,
        UserId
      } = req.body;

      const orderNumber = `FMD-${Date.now().toString().slice(-6)}`;
      const nowFormatted = new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const initialTimeline = [
        {
          title: 'Pesanan Masuk',
          time: `${nowFormatted} WIB`,
          note: 'Menunggu konfirmasi admin'
        },
        {
          title: 'Pembayaran Diterima',
          time: `${nowFormatted} WIB`,
          note: `Metode pembayaran: ${paymentMethod}`
        }
      ];

      const order = await Order.create(
        {
          orderNumber,
          UserId: UserId || null,
          customerName: customerName || 'Pelanggan Fresh Meadow',
          customerEmail,
          customerPhone,
          shippingAddress: typeof shippingAddress === 'object' ? JSON.stringify(shippingAddress) : shippingAddress,
          deliverySlot,
          isColdPacking,
          notes,
          status: 'Pending',
          paymentStatus: 'Paid',
          paymentMethod,
          subtotal: Number(subtotal),
          shippingFee: Number(shippingFee),
          total: Number(total),
          timeline: JSON.stringify(initialTimeline)
        },
        { transaction: t }
      );

      // Create OrderItems and adjust Product stock
      if (Array.isArray(items) && items.length > 0) {
        for (const it of items) {
          const itemPrice = Number(it.price) || 0;
          const itemQty = Number(it.quantity) || 1;
          await OrderItem.create(
            {
              OrderId: order.id,
              ProductId: it.id || it.ProductId || null,
              name: it.name || 'Produk Susu',
              price: itemPrice,
              quantity: itemQty,
              total: itemPrice * itemQty,
              image: it.image || '/assets/prod-milk.png'
            },
            { transaction: t }
          );

          // Deduct stock if ProductId exists
          if (it.id || it.ProductId) {
            const prod = await Product.findByPk(it.id || it.ProductId, { transaction: t });
            if (prod && prod.stock >= itemQty) {
              await prod.update({ stock: prod.stock - itemQty }, { transaction: t });
            }
          }
        }
      }

      await t.commit();

      const createdWithItems = await Order.findByPk(order.id, {
        include: [{ model: OrderItem, as: 'items' }]
      });

      return res.status(201).json({
        success: true,
        orderId: order.orderNumber,
        ...createdWithItems.get({ plain: true })
      });
    } catch (err) {
      await t.rollback();
      next(err);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, note } = req.body;

      const isNumeric = /^\d+$/.test(id);
      const where = isNumeric ? { id: Number(id) } : { orderNumber: id };
      const order = await Order.findOne({ where });

      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      let timeline = [];
      try {
        timeline = order.timeline ? JSON.parse(order.timeline) : [];
      } catch (e) {
        timeline = [];
      }

      const nowFormatted = new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      // Status labels for timeline
      const statusTitleMap = {
        Pending: 'Menunggu Konfirmasi',
        Confirmed: 'Pesanan Disetujui Admin',
        Processing: 'Pesanan Sedang Diproses',
        Preparing: 'Sedang Dikemas Dingin',
        Shipped: 'Dalam Pengantaran Armada Dingin',
        Delivered: 'Pesanan Selesai / Telah Diterima',
        Cancelled: 'Pesanan Dibatalkan'
      };

      timeline.push({
        title: statusTitleMap[status] || `Status: ${status}`,
        time: `${nowFormatted} WIB`,
        note: note || `Status diperbarui menjadi ${status}`
      });

      await order.update({
        status,
        timeline: JSON.stringify(timeline)
      });

      return res.status(200).json({
        success: true,
        msg: `Status order berhasil diubah menjadi ${status}`,
        order
      });
    } catch (err) {
      next(err);
    }
  }

  static async approve(req, res, next) {
    try {
      const { id } = req.params;
      const isNumeric = /^\d+$/.test(id);
      const where = isNumeric ? { id: Number(id) } : { orderNumber: id };
      const order = await Order.findOne({ where });

      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      let timeline = [];
      try {
        timeline = order.timeline ? JSON.parse(order.timeline) : [];
      } catch (e) {
        timeline = [];
      }

      const nowFormatted = new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      timeline.push({
        title: 'Pesanan Disetujui Admin',
        time: `${nowFormatted} WIB`,
        note: 'Pembelian telah diverifikasi, pesanan diteruskan ke ruang pengemasan dingin.'
      });

      await order.update({
        status: 'Confirmed',
        timeline: JSON.stringify(timeline)
      });

      return res.status(200).json({
        success: true,
        msg: 'Pesanan berhasil disetujui oleh admin.',
        order
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const isNumeric = /^\d+$/.test(id);
      const where = isNumeric ? { id: Number(id) } : { orderNumber: id };
      const order = await Order.findOne({ where });

      if (!order) {
        return res.status(404).json({ msg: 'Order not found' });
      }

      await order.destroy();
      return res.status(200).json({ msg: 'Order successfully deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
