const { Router } = require("express");
const ProductsController = require("../controllers/ProductsController");
const ProductsImageController = require("../controllers/ProductsImageController");

const multer = require("multer");
const uploadConfig = require("../configs/upload");

const upload = multer(uploadConfig.MULTER);

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsController = new ProductsController();
const productsImageController = new ProductsImageController();

const productsRoutes = Router();

productsRoutes.use(ensureAuthenticated);

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.patch("/image/:id", upload.single("image"), productsImageController.update)
productsRoutes.delete("/:id", productsController.delete);

module.exports = productsRoutes;