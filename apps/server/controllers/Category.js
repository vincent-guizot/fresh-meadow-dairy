'use strict';

const { Category, Product, sequelize } = require('../models');

class CategoryController {
  static async list(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          include: [
            [
              sequelize.literal(`(
                SELECT COUNT(*)::int
                FROM "Products" AS "p"
                WHERE "p"."CategoryId" = "Category"."id"
              )`),
              'productsCount'
            ]
          ]
        },
        order: [['id', 'ASC']]
      });
      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id, {
        include: [{ model: Product, as: 'products' }]
      });
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
      return res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, slug, description, icon, image, status } = req.body;
      const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const category = await Category.create({
        name,
        slug: generatedSlug,
        description,
        icon,
        image,
        status: status || 'active'
      });
      return res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
      const { name, slug, description, icon, image, status } = req.body;
      await category.update({
        name: name !== undefined ? name : category.name,
        slug: slug !== undefined ? slug : category.slug,
        description: description !== undefined ? description : category.description,
        icon: icon !== undefined ? icon : category.icon,
        image: image !== undefined ? image : category.image,
        status: status !== undefined ? status : category.status
      });
      return res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
      }
      await category.destroy();
      return res.status(200).json({ msg: 'Category successfully deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
