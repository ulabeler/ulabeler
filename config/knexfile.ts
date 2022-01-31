// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// Update with your config settings.

module.exports = {

  development: {
    client: "mysql2",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  staging: {
    client: "mysql2",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: "mysql2",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};