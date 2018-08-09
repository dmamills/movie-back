const bookshelf = require('../db');
const Genre = require('./Genre');
const Actor = require('./Actor');


const Movie = bookshelf.Model.extend({
  tableName: 'movies',
  genre: function() {
    return this.belongsTo(Genre);
  },
  actors: function() {
    return this.belongsToMany(Actor);
  }
});

module.exports = Movie;
