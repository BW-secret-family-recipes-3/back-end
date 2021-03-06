// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {          
      filename: './data/database.db3', // where to change the name of the database 
    },
    pool: {
      afterCreate: (conn, done) => {
          conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
  },
  production: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {          
      filename: './data/database.db3', // where to change the name of the database 
    },
    pool: {
      afterCreate: (conn, done) => {
          conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
}
}
