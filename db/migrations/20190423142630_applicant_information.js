exports.up = knex =>
  knex.schema

    // create applicants table
    .createTable("applicants", table => {
      table.increments();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table
        .string("email")
        .unique()
        .notNullable();
      table.string("pronouns").notNullable();
      table
        .enu("employment_status", [
          "full_time",
          "part_time",
          "in_school",
          "looking",
          "not_looking"
        ])
        .notNullable();
      table.string("employer");
      table.timestamps();
    })

    // create identifying information table
    .createTable("identifying_info", table => {
      table.increments();
      table
        .string("name")
        .unique()
        .notNullable();
      table.boolean("is_gender").notNullable();
    })

    // create join table for applicants and identifying info (one applicant can have many piecent of identifying info)
    .createTable("applicant_identifying_info", table => {
      table.increments();
      table
        .integer("applicant_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("applicants");
      table
        .integer("identifying_info_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("identifying_info");
    });

exports.down = knex =>
  knex.schema
    // rollback in reverse order
    .dropTable("applicant_identifying_info")
    .dropTable("identifying_info")
    .dropTable("applicants");
