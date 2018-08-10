const express = require('express');
const router = express.Router();

const Actor = require('../models').Actor;

router.get('/', (req, res) => {
  Actor.fetchAll()
  .then(actors => {
    res.json({ actors });
  });
});

router.post('/', (req, res) => {

  if(!req.body.name) {
    res.status(400).json({
      error: 'Name is required.'
    });
  }
  
  new Actor({ name: req.body.name })
    .save()
    .then(actor => {
      res.json({ actor });
    });
});

module.exports = router;
