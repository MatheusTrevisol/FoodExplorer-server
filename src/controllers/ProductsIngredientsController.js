const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ProductsIngredientsController {
  async index(request, response) {
    const ingredients = await knex("products_ingredients");

    return response.status(201).json(ingredients);
  };

  async show(request, response) {
    const { id } = request.params;

    const product_ingredients = await knex("products_ingredients").where({id}).first();

    return response.status(201).json(product_ingredients);
  };

  async delete(request, response) {
    const { id } = request.params;

    await knex("products_ingredients").where({ id }).delete();

    return response.status(201).json();
  };
};

module.exports = ProductsIngredientsController;