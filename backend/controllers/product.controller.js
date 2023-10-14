const { Op } = require("sequelize");
const { Sequelize, sequelize, Product, Category } = require("../models");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const result = await Product.findAll({
        logging: false,
        include: [{ model: Category }],
      });
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getProductById: async (req, res) => {
    try {
      const result = await Product.findByPk(req.params.id);
      if (!result) throw new Error("Product not found");

      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  getProductByName: async (req, res) => {
    try {
      const { productName, categoryId, orderBy, sortBy } = req.query;
      const sort = {};

      const search = {
        productName: {
          [Sequelize.Op.like]: `%${productName}%`,
        },
      };

      if (categoryId) {
        search.categoryId = categoryId;
      }

      if (orderBy && sortBy) sort.order = [[orderBy, sortBy]];
      console.log(req.query);

      const result = await Product.findAll({
        where: search,
        ...sort,
        include: [{ model: Category }],
      });

      res.status(200).json({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  sortByProductName(req, res) {
    const { order } = req.query;
    let sortingOrder = "ASC";
    if (order === "desc") {
      sortingOrder = "DESC";
    }
    Product.findAll({
      order: [["productName", sortingOrder]],
    })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },

  sortByPrice(req, res) {
    const { order } = req.query;
    let sortingOrder = "ASC";
    if (order === "desc") {
      sortingOrder = "DESC";
    }
    Product.findAll({
      order: [["price", sortingOrder]],
    })
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send(err?.message);
      });
  },

  createProduct: async (req, res) => {
    try {
      req.body.imageName = req.file.filename;
      const result = await Product.create({ ...req.body });

      res.status(200).json({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        message: "Product already exists",
      });
    }
  },

  editProductById: async (req, res) => {
    try {
      if (req.file) req.body.imageName = req.file.filename;

      const { id } = req.params;

      const productData = req.body;

      const existingProduct = await Product.findByPk(id);

      if (!existingProduct) {
        return res.status(404).json({ message: `Product not found!` });
      }

      await existingProduct.update({ ...productData });
      res.status(200).json({
        message: "Success",
        updatedProduct: existingProduct,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err?.message);
    }
  },

  deleteProductById: async (req, res) => {
    try {
      const result = await Product.destroy({ where: { id: req.params.id } });
      if (!result) throw new Error("Product not found");

      res.status(200).json({ status: "Success" });
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  updateAfterTransaction: async (req, res) => {
    try {
      const { multiValue, transaction } = req.body;
      const products = await Product.bulkCreate(
        multiValue.map((product) => {
          return {
            id: product.productId,
            stock: sequelize.literal(
              `(SELECT stock FROM (SELECT * FROM Products WHERE id = ${product.productId})AS anung) + ${product.updateStock}`
            ),
            productName: "gapenting",
            imageName: "gapenting",
            desc: "gapenting",
            price: 1,
            previousStock: sequelize.literal(
              `(SELECT stock FROM (SELECT * FROM Products WHERE id = ${product.productId})AS anung)`
            ),
            updatedAt: sequelize.fn("NOW"),
          };
        }),
        {
          updateOnDuplicate: ["stock", "updatedAt"],
          transaction: transaction,
          // validate: true,
        }
      );
      await Product.findAll({
        attributes: ["productName", "stock"],
        where: {
          id: { [Op.in]: multiValue.map((product) => product.productId) },
        },
        transaction: transaction,
      }).then((result) => {
        result.forEach((product) => {
          if (product.dataValues.stock < 0)
            throw new Error(
              `${product.dataValues.productName} has less stock than quantity requested`
            );
        });
      });

      return 1;
    } catch (err) {
      console.log(err);
      return err?.message;
    }
  },
};

module.exports = productController;
