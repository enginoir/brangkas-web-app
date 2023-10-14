const UserController = require("../controllers/user.controller");
const {
  userBodyValidationRules,
  newCashierAccountValidator,
  adminValidator,
  deleteCashierAccountValidator,
} = require("../middlewares/validators/user.validator");
const route = require("express").Router();

route.get(
  `/cashier_account`,
  adminValidator,
  UserController.getByQuery.bind(UserController)
);

route.post(
  "/update_isactive/:id",
  adminValidator,
  UserController.update.bind(UserController)
);
route.post("/auth", UserController.login.bind(UserController));
route.post("/token", UserController.keepLogin.bind(UserController));
route.post(
  "/new_cashier_account",
  userBodyValidationRules(),
  newCashierAccountValidator,
  adminValidator,
  UserController.create.bind(UserController)
);

route.delete(
  "/:id",
  deleteCashierAccountValidator,
  adminValidator,
  UserController.delete.bind(UserController)
);

module.exports = route;
