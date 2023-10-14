const db = require("../models");
const { Sequelize, sequelize, Category, Product } = require("../models");

const categoryController = {
  getAllCategories: async (req, res) => {
    try {
      const result = await Category.findAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },
  getPageCategories: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const count = await Category.count();
      const result = await Category.findAndCountAll({
        limit: Number(limit),
        offset: Number(page),
        include: [
          {
            model: db.Product,
          },
        ],
      });
      const total_page = Math.ceil(count / limit);
      res.status(200).json({ total_page, ...result });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const result = await Category.findByPk(req.params.id);
      if (!result) throw new Error("Category not found");

      res.status(200).json(result);
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getCategoryByName: async (req, res) => {
    try {
      const { category_name } = req.query;
      const result = await Category.findAll({
        where: {
          category_name: {
            [Sequelize.Op.like]: `%${category_name}%`,
          },
        },
      });
      if (!result) throw new Error("Category not found");

      res.status(200).json({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  createCategory: async (req, res) => {
    try {
      const result = await Category.create({ ...req.body });

      res.status(200).json({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  editCategoryById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Category.update({ ...req.body }, { where: { id } });

      next();
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  deleteCategoryById: async (req, res) => {
    try {
      const result = await Category.destroy({ where: { id: req.params.id } });
      if (!result) throw new Error("Category not found");

      res.status(200).json({ status: "Success" });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },
};

module.exports = categoryController;
