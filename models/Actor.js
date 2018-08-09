const bookshelf = require('../db');
const Movie = require('./Movie');

const Actor = bookshelf.Model.extend({
  tableName: 'actors',
  movie: function() {
    return this.belongsToMany(Movie);
  }
});

module.exports = Actor;
