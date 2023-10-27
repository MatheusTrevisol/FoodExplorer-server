exports.up = knex => knex.schema.createTable("products_ingredients", table => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

exports.down = knex => knex.schema.dropTable("products_ingredients");