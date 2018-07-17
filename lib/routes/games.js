const router = require('express').Router();
const Games = require('../models/game');

module.exports = router
    .get('/', (req, res) => {
        Games.find()
            .then(games => res.json(games));
    })

    .post('/', (req, res) => {
        Games.create(req.body)
            .then(game => res.json(game));
    });