const router = require('express').Router();
const Games = require('../models/game');

module.exports = router
    .get('/', (req, res) => {
        Games.find()
            .then(games => res.json(games));
    })
    .get('/:id', (req, res) => {
        Games.findById(req.params.id)
            .then(game => res.json(game));
    })
    .post('/', (req, res) => {
        Games.create(req.body)
            .then(game => res.json(game));
    })
    .put('/:id', (req, res) => {
        
    });