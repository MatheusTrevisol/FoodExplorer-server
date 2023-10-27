exports.up = knex => knex.schema.createTable("products", table => {
  table.increments("id").primary();
  table.text("name").notNullable();
  table.text("description");
  table.integer("price");
  table.integer("product_category_id").references("id").inTable("products_categories").notNullable().onDelete("CASCADE");
  table.boolean("favorite").default(0);
  table.string('image', 255);

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("products");
