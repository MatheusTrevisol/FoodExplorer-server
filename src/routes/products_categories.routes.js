const { Router } = require("express");
const ProductsCategoriesController = require("../controllers/ProductsCategoriesController");

const productsCategoriesController = new ProductsCategoriesController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsCategoriesRouter = Router();

productsCategoriesRouter.use(ensureAuthenticated);

productsCategoriesRouter.get("/", productsCategoriesController.index);
productsCategoriesRouter.get("/:id", productsCategoriesController.show);
productsCategoriesRouter.post("/", productsCategoriesController.create);
productsCategoriesRouter.put("/:id", productsCategoriesController.update);
productsCategoriesRouter.delete("/:id", productsCategoriesController.delete);

module.exports = productsCategoriesRouter;