const knex = require('knex');
const bookshelf = require('bookshelf');
const dbConfig = require('./knexfile');

const db = knex(dbConfig);

module.exports = bookshelf(db);
