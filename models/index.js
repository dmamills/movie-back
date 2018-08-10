const bookshelf = require('../db');

const Movie = bookshelf.Model.extend({
  tableName: 'movies',
  genre: function() {
    return this.belongsTo(Genre);
  },
  actors: function() {
    return this.belongsToMany(Actor);
  }
});

const Actor = bookshelf.Model.extend({
  tableName: 'actors',
  movies: function() {
    return this.belongsToMany(Movie);
  }
});

const Genre = bookshelf.Model.extend({
  tableName: 'genres',
  movies: function() {
    return this.belongsTo(Movie);
  }
});


module.exports = {
  Actor,
  Movie,
  Genre
};
