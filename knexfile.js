module.exports = {
  client: "pg",
  connection: {
    host: "db",
    user: "admin",
    password: "admin",
    database: "bridge-applications-local"
  },
  migrations: {
    directory: `${__dirname}/db/migrations`
  },
  seeds: {
    directory: `${__dirname}/db/seeds`
  }
};
