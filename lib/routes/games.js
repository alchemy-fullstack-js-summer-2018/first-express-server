const router = require('express').Router();
const Games = require('../models/game');

module.exports = router
    .post('/', (req, res) => {
        Games.create(req.body)
            .then(game => res.json(game));
    })
    .get('/', (req, res) => {
       
    });