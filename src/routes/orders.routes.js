const { Router } = require("express");
const OrdersController = require("../controllers/OrdersController");

const ordersController = new OrdersController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ordersRoutes = Router()
ordersRoutes.use(ensureAuthenticated);

ordersRoutes.get("/", ordersController.index);
ordersRoutes.get("/:user_id", ordersController.show);
ordersRoutes.delete("/:id", ordersController.delete);

module.exports = ordersRoutes;