const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const STRIPE_SECRET_KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(`${STRIPE_SECRET_KEY}`);

class CheckoutController {
  async create(request, response) {
    const { products, user, totalCostCart, codeOfOrder } = request.body;

    let lineProducts = [];

    products.forEach((item) => {
      lineProducts.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name
          },
          unit_amount: item.price
        },
        quantity: item.quantity
      })
    });

    const [order] = await knex("orders").insert({
      user_id: user.id,
      price: totalCostCart,
      code: codeOfOrder,
    });  

    let session;

    try {
      session = await stripe.checkout.sessions.create({
        line_items: lineProducts,
        payment_method_types: ['card'],
        mode: "payment",
        success_url: `${process.env.SITE_URL}/checkout/success/${order}`,
        cancel_url: `${process.env.SITE_URL}/checkout/cancel/${order}`,
      });
    } catch (error) {
      console.log(error.message)
      // throw new AppError("Não foi possível completar a transação. Tente novamente.")
    }

    const productsToInsert = products.map(item => {
      return {
        user_id: user.id,
        order_id: order,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }
    })

    await knex("products_cart").insert(productsToInsert);
    
    response.send(JSON.stringify({
      url: session.url
    }));
  };
};

module.exports = CheckoutController;