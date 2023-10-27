const { Router } = require("express");
const ProductsIngredientsController = require("../controllers/ProductsIngredientsController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsIngredientsController = new ProductsIngredientsController();

const productsIngredientsRouter = Router();

productsIngredientsRouter.use(ensureAuthenticated);

productsIngredientsRouter.get("/", productsIngredientsController.index);
productsIngredientsRouter.get("/:id", productsIngredientsController.show);
productsIngredientsRouter.delete("/:id", productsIngredientsController.delete);

module.exports = productsIngredientsRouter;