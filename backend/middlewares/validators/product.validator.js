const Joi = require('joi');

const productValidator = {
  getProductById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error)
        throw new Error(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  createProduct: (req, res, next) => {
    try {
      const schemaBody = Joi.object({
        productName: Joi.string().required(),
        categoryId: Joi.number().min(1).required(),
        desc: Joi.string().required(),
        price: Joi.number().min(1).required(),
        stock: Joi.number().integer().min(1).required(),
      }).required();

      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new Error(resultBody.error?.message || resultBody.error, 400);

      const schemaFile = Joi.required().label('productImage');
      const resultFile = schemaFile.validate(req.file);
      if (resultFile.error)
        throw new Error(resultFile.error?.message || resultFile.error, 400);

      next();
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  deleteProductById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error)
        throw new Error(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },

  editProduct: (req, res, next) => {
    try {
      const schemaParams = Joi.object({
        id: Joi.number().integer().min(1).required(),
      }).required();

      const resultParams = schemaParams.validate(req.params);
      if (resultParams.error)
        throw new Error(resultParams.error?.message || resultParams.error, 400);

      const schemaBody = Joi.object({
        productName: Joi.string().optional(),
        categoryId: Joi.number().min(1).required(),
        desc: Joi.string().optional(),
        price: Joi.number().min(1).optional(),
        stock: Joi.number().integer().min(1).optional(),
      }).required();

      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new Error(resultBody.error?.message || resultBody.error, 400);

      next();
    } catch (error) {
      res.status(500).send(error?.message);
    }
  },
};

module.exports = productValidator;
