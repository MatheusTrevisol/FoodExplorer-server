exports.up = knex => knex.schema.createTable("products_cart", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users");
  table.integer("order_id").references("id").inTable("orders").onDelete("CASCADE");;
  table.text("name");
  table.integer("price");
  table.integer("quantity");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("products_cart");