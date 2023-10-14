const { categoryController } = require("../controllers");

const router = require("express").Router();

router.get("/", categoryController.getAllCategories);
router.get("/q", categoryController.getPageCategories);

router.get("/name", categoryController.getCategoryByName);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.createCategory);
router.patch(
  "/:id",
  categoryController.editCategoryById,
  categoryController.getCategoryById
);
router.delete("/:id", categoryController.deleteCategoryById);

module.exports = router;
