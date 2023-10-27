const { Router } = require("express");

const CheckoutController = require("../controllers/CheckoutController");

const checkoutController = new CheckoutController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const checkoutRoutes = Router();

checkoutRoutes.use(ensureAuthenticated);

checkoutRoutes.post("/", checkoutController.create);

module.exports = checkoutRoutes;