const bookshelf = require('../db');
const Movie = require('./Movie');

const Genre = bookshelf.Model.extend({
  tableName: 'genres',
  movies: function() {
    return this.belongsToMany(Movie);
  }
});

module.exports = Genre;
