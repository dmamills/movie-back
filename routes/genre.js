const express = require('express');
const router = express.Router();

const Genre = require('../models').Genre;


router.get('/', (req, res) => {
  Genre.fetchAll()
  .then(genres => {
    res.json({ genres });
  });
});

module.exports = router;
