exports.up = knex => knex.schema.createTable("orders", table => {
  table.increments("id").primary();
  table.integer("user_id").references("id").inTable("users");
  table.integer("price");
  table.integer("code");
  table.integer("status").defaultTo(1);

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("orders");