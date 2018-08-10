const express = require('express');
const router = express.Router();

const { Movie, Actor, Genre } = require('../models');

const MOVIE_RELATIONS = ['actors', 'genre'];

function fetchMovies() {
  return Movie.fetchAll({
    withRelated: MOVIE_RELATIONS
  });
}

function searchMovies(term) {
  return Movie.where('title', 'LIKE', `%${term}%`)
    .fetchAll({
      withRelated: MOVIE_RELATIONS
    });
}

function searchActors(term) {
  return Movie
    .query(qb => {
      qb.innerJoin('actors_movies', 'movies.id', 'actors_movies.movie_id');
      qb.innerJoin('actors', 'actors.id', 'actors_movies.actor_id');
      qb.where('actors.name', 'LIKE', `%${term}%`);
    })
    .fetchAll({
      withRelated: MOVIE_RELATIONS
    });
}

function searchGenre(term) {
  return Movie
    .query('join', 'genres', 'movies.genre_id', 'genres.id')
    .where('genres.name', 'LIKE', `%${term}%`)
    .fetchAll({
      withRelated: MOVIE_RELATIONS
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

router.get('/search', (req, res) => {
  const { term, type } = req.query;
  console.log(req.query);

  const onSearchComplete = (movies) => {
    res.json({ movies });
  }

  const onSearchError = (err) => {
    res.status(500).json({
      error: 'Error completing search',
    });
  }

  let searchPromise;
  switch(type.toLowerCase()) {
    case 'title':
      searchPromise = searchMovies(term)
    break;
    case 'actor':
      searchPromise = searchActors(term)
    case 'genre':
      searchPromise = searchGenre(term)
    break;
    default:
      res.status(400).json({
        error: `Invalid type ${type}`
      });
    break;
  }

  searchPromise
    .then(onSearchComplete)
    .catch(onSearchError);
});

router.get('/:id', (req, res) => {

  const id = req.params.id;

  new Movie({ id })
  .fetch({
    withRelated: MOVIE_RELATIONS
  })
  .then(movie => {
    if(!movie) {
      res.status(404).json({
        err: `Movie ${id} not found`
      });
      return;
    }

    res.json({
      movie
    });
  })
});


router.post('/', (req, res) => {

  const actors = req.body.actors.map(actor => {
    return new Actor({ id: actor }).fetch();
  });

  let genre = { id: req.body.genre };

  Promise.all([...actors, genre ])
  .then(result => {
    genre = result.splice(-1)[0];

    const movie = new Movie({
      title: req.body.title,
      genre_id: genre.id
    }).save()
    .then(movie => {
      movie.actors().attach(result);;
      movie.load(MOVIE_RELATIONS)
      .then(movie => {
        res.json({
          movie
        });
      });
    });
  });
});

module.exports = router;
