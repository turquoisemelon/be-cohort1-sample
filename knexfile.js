module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL || {
    user: "admin",
    password: "admin",
    database: "bridge-applications-local"
  }
};
