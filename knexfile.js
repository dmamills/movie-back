// Update with your config settings.

module.exports = {

  client: 'sqlite3',
  debug: true,
  connection: {
    filename: './movies.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    tableName: 'knex_migrations'
  }
};
