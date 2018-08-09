
exports.up = function(knex, Promise) {

  return knex.schema.createTable('movies', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.integer('genre_id').references('genres.id');
  }).createTable('genres', (table) => {
    table.increments('id').primary();
    table.string('name');
  }).createTable('actors', (table) => {
    table.increments('id').primary();
    table.string('name');
  }).createTable('actors_movies', (table) => {
    table.increments('id').primary();
    table.integer('movie_id').references('movies.id');
    table.integer('actor_id').references('actors.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('movies')
    .dropTable('genres')
    .dropTable('actors')
    .dropTable('actors_movies');
};
