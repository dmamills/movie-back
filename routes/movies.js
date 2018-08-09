const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');


function fetchMovies() {
  return Movie.fetchAll({
    withRelated: ['actors', 'genre'],
  });
}

router.get('/', (req, res) => {

  fetchMovies()
  .then(movies => {
    res.json({ movies });
  })
  .catch(err => {
    res.status(500).json({
      error: err.message
    });
  });
});


router.post('/', (req, res) => {

  //fetch or create Actors
  const actors = req.body.actors.map(actor => {
    if(typeof actor === 'number') {
      return new Actor({ id: actor}).fetch();
    }

    return new Actor({ name: actor }).save();
  });

  let genre;
  if(typeof req.body.genre !== 'number') {
    genre = new Genre({ name: req.body.genre }).save();
  } else {
    genre = { id: req.body.genre };
  }

  Promise.all([...actors, genre ])
  .then(result => {
    genre = result.splice(-1)[0];

    const movie = new Movie({
      title: req.body.title,
      genre_id: genre.id
    }).save()
    .then(movie => {
      movie.actors().attach(result);;
      movie.load(['genre', 'actors'])
      .then(movie => {
        res.json({
          movie
        });
      });
    });
  });
});

module.exports = router;
