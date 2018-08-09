const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const Movie = require('./models/Movie');

const LISTEN_PORT = 8080;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser({ json: '50mb' }));


app.get('/', (req, res) => {
  Movie.fetchAll({
    withRelated: ['actors', 'genre'],
  })
  .then(movies => {
    res.json({
      movies 
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err.message
    });
  });

});


app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found.'
  });
});


app.listen(LISTEN_PORT, () => {
 console.log(`Alive on port: ${LISTEN_PORT}`);
});
