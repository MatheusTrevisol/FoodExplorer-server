const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ProductsCategoriesController {
  async index(request, response) {
    const { title } =  request.query;

    let products_categories_with_products;

    if(title) {
      products_categories_with_products = await knex("products_categories")
      .select([
        "products_categories.id as category_id",
        "products_categories.name as category_name",
        "products.id as id",
        "products.name",
        "products.description",
        "products.image",
        "products.price",
        "products.favorite",
        "products.product_category_id",
        "products_ingredients.id as ingredient_id",
        "products_ingredients.name as ingredient_name"
      ])
      .leftJoin("products", "products.product_category_id", "products_categories.id")
      .leftJoin("products_ingredients", "products_ingredients.product_id", "products.id")
      .where(builder => {
        builder
        .whereLike("products.name", `%${title}%`)
        .orWhereIn("products.id", function() {
          this.select("product_id")
            .from("products_ingredients")
            .whereLike("name", `%${title}%`);
        });
      })
      .orderBy(["products_categories.id", "products.id"])
      .orderBy("products.favorite", "desc")
    } else {
      products_categories_with_products = await knex("products_categories")
        .select([
          "products_categories.id as category_id",
          "products_categories.name as category_name",
          "products.id as id",
          "products.name",
          "products.description",
          "products.image",
          "products.price",
          "products.favorite",
          "products.product_category_id"
        ])
        .leftJoin("products", "products.product_category_id", "products_categories.id")
        .orderBy("products.favorite", "desc")
    }

    const categorizedProducts = {};

    products_categories_with_products.forEach(categoryProduct => {
      const { category_id, category_name, ...productInfo } = categoryProduct;

      if (!categorizedProducts[category_id]) {
        categorizedProducts[category_id] = {
          category_id,
          category_name,
          products: []
        };
      }

      if(productInfo.name !== null) {
        categorizedProducts[category_id].products.push(productInfo);
      }
    });

    return response.status(201).json(categorizedProducts);
  };

  async show(request, response) {
    const { id } = request.params;

    const product_category = await knex("products_categories").where({id}).first();

    return response.status(201).json(product_category);
  };

  async create(request, response) {
    const { name } = request.body;

    if(!name) {
      throw new AppError("Você precisa cadastrar um nome para a categoria");
    }

    await knex("products_categories").insert({name});

    return response.status(201).json();
  };

  async update(request, response) {
    const { name } = request.body;
    const { id } = request.params;

    const product_category = await knex("products_categories").where({ id }).first();

    if(!product_category) {
      throw new AppError("Nenhuma Categoria encontrada.");
    }
    
    product_category.name = name ?? product_category.name;

    await knex("products_categories").update({
      name: product_category.name,
    }).where({ id });

    return response.json(product_category);
  };

  async delete(request, response) {
    const { id } = request.params;

    await knex("products_categories").where({ id }).delete();

    return response.status(201).json();
  };
};

module.exports = ProductsCategoriesController;