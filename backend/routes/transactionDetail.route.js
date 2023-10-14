const TransactionDetailController = require("../controllers/transactionDetail.controller");
const {
  validateEditTransactionDetailRule,
  generalValidate,
  validateNewTransactionDetailRule,
  validateMultiValueTransactionDetailRule,
} = require("../middlewares/validators/transaction.validator");
const {
  cashierValidator,
} = require("../middlewares/validators/user.validator");

const route = require("express").Router();

route.patch(
  "/",
  validateEditTransactionDetailRule(),
  generalValidate,
  cashierValidator,
  TransactionDetailController.update.bind(TransactionDetailController)
);

route.post(
  "/",
  validateNewTransactionDetailRule(),
  generalValidate,
  cashierValidator,
  TransactionDetailController.create.bind(TransactionDetailController)
);

route.post(
  `/insert_multi_value`,
  validateMultiValueTransactionDetailRule(),
  generalValidate,
  cashierValidator,
  TransactionDetailController.createMultiValues.bind(
    TransactionDetailController
  )
);

module.exports = route;
