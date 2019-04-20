const faker = require("faker");

const createStudent = () => {
  const firstName = faker.name.firstName(1);
  const lastName = faker.name.lastName();
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName),
    gender_identity: "woman",
    pronouns: "she/they",
    employment_status: "full_time",
    employer: faker.company.companyName()
  };
};

const createNStudents = n =>
  Array.from(Array(n)).map(element => createStudent());

exports.seed = knex => {
  // Deletes ALL existing entries
  return knex("students")
    .del()
    .then(() => {
      // Inserts seed entries
      return knex("students").insert(createNStudents(20));
    });
};
