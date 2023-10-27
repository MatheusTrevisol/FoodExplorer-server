exports.up = async (knex) => {
  await knex.schema.createTable("products_categories", async (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
  
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

  await knex("products_categories").insert({
    name: "Refeições"
  });

  await knex("products_categories").insert({
    name: "Sobremesas"
  });

  await knex("products_categories").insert({
    name: "Bebidas"
  });
};

exports.down = knex => knex.schema.dropTable("products_categories");
