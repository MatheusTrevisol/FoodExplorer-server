const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ProductsController {
  async index(request, response) {
    const { favorite } = request.query;
    let products;

    if(favorite) {
      products = await knex("products").where({favorite});
    } else {
      products = await knex("products_categories")
      .select([
        "products.id",
        "products.name",
        "products.description",
        "products.image",
        "products.price",
        "products.favorite",
        "products.product_category_id",
        "products_categories.id as category_id",
        "products_categories.name as category_name"
      ])
      .innerJoin("products", "products.product_category_id", "products_categories.id")
      .groupBy("products_categories.id")
      .orderBy("products.favorite");
    }
    
    return response.status(201).json(products);
  };

  async show(request, response) {
    const { id } = request.params;

    const product = await knex("products")
    .select([
      "products.id",
      "products.name",
      "products.description",
      "products.image",
      "products.price",
      "products.favorite",
      "products.product_category_id",
      "products_categories.id as category_id",
      "products_categories.name as category_name"
    ])
    .innerJoin("products_categories", "products_categories.id", "products.product_category_id")
    .where({ "products.id": id })
    .first();

    const ingredients = await knex("products_ingredients").where({ product_id: id });

    return response.json({ 
      ...product,
      ingredients,
    });
  };

  async create(request, response) {
    const { name, description, price, selectedCategory, ingredients } = request.body;

    if(!name) {
      throw new AppError("Você precisa cadastrar um nome para o produto.");
    };

    if(!description) {
      throw new AppError("Por favor, preencha a descrição do prato.");
    };
    
    if(!price) {
      throw new AppError("Você precisa colocar um preço no seu prato.");
    };
    
    const category = await knex("products_categories").where({ name: selectedCategory }).first();
    const product_category_id = category.id;
    
    const [product] = await knex("products").insert({
      name,
      description,
      price,
      product_category_id
    });

    if(ingredients.length > 0) {
      const ingredientsInsert = ingredients.map(name => { 
        return {
          name,
          product_id: product,
        }
      })

      await knex("products_ingredients").insert(ingredientsInsert);
    }

    return response.status(201).json(product);
  };

  async update(request, response) {
    const { name, description, price, selectedCategory, ingredients, favorite } = request.body;
    const { id } = request.params;

    const product = await knex("products").where({ id }).first();

    if(!product) {
      throw new AppError("Nenhum produto encontrado.");
    };

    let category;
    let category_id;

    if(selectedCategory) {
      category = await knex("products_categories").where({ name: selectedCategory }).first();
      category_id = category.id
    }

    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.product_category_id = category_id ?? product.product_category_id;
    product.favorite = favorite ?? product.favorite;

    await knex("products").update({
      name: product.name,
      description: product.description,
      price: product.price,
      product_category_id: product.product_category_id,
      favorite: product.favorite
    }).where({ id });

    if(ingredients && ingredients.length > 0) { //verify if exists ingredients to add into db.
      await knex("products_ingredients").delete().where({product_id: id})

      const ingredientsToInsert = ingredients.map(ingredient => {
        return {
          product_id: id,
          name: ingredient
        };
      });

      await knex("products_ingredients").insert(ingredientsToInsert);    
    };

    return response.json(product);
  };

  async delete(request, response) {
    const { id } = request.params;

    await knex("products").where({ id }).delete();

    return response.status(201).json();
  };
};

module.exports = ProductsController;