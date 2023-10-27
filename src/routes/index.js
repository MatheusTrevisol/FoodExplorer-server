const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoutes = require("./sessions.routes");
const productsCategoriesRoutes = require("./products_categories.routes");
const productsRoutes = require("./products.routes");
const productsIngredientsRoutes = require("./products_ingredients.routes");
const checkoutRoutes = require("./checkout.routes");
const ordersRoutes = require("./orders.routes");

const routes = Router();
routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/products_categories", productsCategoriesRoutes);
routes.use("/products", productsRoutes);
routes.use("/products_ingredients", productsIngredientsRoutes);
routes.use("/checkout", checkoutRoutes);
routes.use("/orders", ordersRoutes);

module.exports = routes;
