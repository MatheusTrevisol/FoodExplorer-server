const { hash } = require('bcryptjs');

exports.up = async (knex) => {
  await knex.schema.createTable("users", async (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
    table.varchar("email");
    table.text("password");
    table.integer("permission_id").references("id").inTable("permissions").default(2);
    table.text("avatar");
  
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

  // CREATE PERMISSIONS TABLE
  await knex.schema.createTable("permissions", async (table) => {
    table.increments("id").primary();
    table.text("name").notNullable();
  });

  // INSERT PERMISSIONS
  await knex("permissions").insert([
    { id: 1, name: "ADMIN" },
    { id: 2, name: "USER" }
  ]);

  /* CREATE ADMIN*/
  const hashedPassword = await hash("admin123", 8);

  await knex("users").insert({
    name: "admin",
    email: "admin@admin.com",
    password: hashedPassword,
    permission_id: 1
  });
};

exports.down = knex => knex.schema.dropTable("users");