const knex = require("../database/knex")

class OrdersController {
  async index(request, response) {
    const orders = await knex("orders");

    return response.status(201).json(orders);
  };

  async show(request, response) {
    const { user_id } = request.params

    const orders = await knex("orders").where({user_id});

    for (const order of orders) {
      const products = await knex("products_cart")
        .where({ order_id: order.id }) // Supondo que a tabela de produtos (products) tenha um campo "order_id" que faz referência ao pedido
    
      order.products = products; // Adicione a lista de produtos ao pedido
    }

    return response.status(201).json(orders);
  };

  async delete(request, response) {
    const { id } = request.params;

    try {
      await knex("orders").where({ id }).delete();
    } catch (error) {
      console.log(error.message)
    }

    return response.status(201).json();
  };
}

module.exports = OrdersController;