exports.up = async knex =>
  await knex.schema.table("users", table => {
    table
      .enu("role", ["user", "admin"])
      .defaultTo("user")
      .notNullable();
  });

exports.down = async knex =>
  await knex.schema.table("users", table => {
    table.dropColumn("role");
  });
