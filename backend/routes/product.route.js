const router = require('express').Router();
const { productController } = require('../controllers');
const { productAuth, userAuth } = require('../middlewares/auth');
const { productMulter } = require('../middlewares/multers');
const { productValidator } = require('../middlewares/validators');
const { adminValidator } = require('../middlewares/validators/user.validator');

// get all products
router.get('/', productController.getAllProducts);

// get product by name
router.get('/search', productController.getProductByName);

// sort by product name
router.get('/p1', productController.sortByProductName);

// sort by price
router.get('/p2', productController.sortByPrice);

// get product by id
router.get(
  '/:id',
  productValidator.getProductById,
  productController.getProductById
);

// post new product
router.post(
  '/',
  productMulter.productImageUploader().single('productImage'),
  adminValidator,
  productValidator.createProduct,
  productController.createProduct
);

// edit product by id
router.patch(
  '/:id',
  productMulter.productImageUploader().single('productImage'),
  adminValidator,
  productValidator.editProduct,
  productController.editProductById
);

//delete product by id
router.delete(
  '/:id',
  productValidator.deleteProductById,
  adminValidator,
  productController.deleteProductById
);

module.exports = router;
