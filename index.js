const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const movieRoutes = require('./routes/movies');
const actorRoutes = require('./routes/actors');
const genreRoutes = require('./routes/genre');

const LISTEN_PORT = 8080;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser({ json: '50mb' }));
app.use(cors());

app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/genres', genreRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found.'
  });
});

app.listen(LISTEN_PORT, () => {
 console.log(`Alive on port: ${LISTEN_PORT}`);
});
