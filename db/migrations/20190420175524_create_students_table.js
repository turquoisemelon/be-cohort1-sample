exports.up = knex =>
  knex.schema.createTable("students", table => {
    table.increments();
    table.string("name").notNullable();
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("gender_identity").notNullable();
    table.string("pronouns").notNullable();
    table.string("additional_identity_info");
    table
      .enu("employment_status", [
        "full_time",
        "part_time",
        "school",
        "looking",
        "not_looking"
      ])
      .notNullable();
    table.string("employer");
    table.timestamps();
  });

exports.down = knex => knex.schema.dropTable("students");
