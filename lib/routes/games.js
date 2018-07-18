const router = require('express').Router();
const Games = require('../models/game');
const notFound = require('./notFound');

module.exports = router
    .get('/', (req, res) => {
        Games.find()
            .then(games => res.json(games));
    })
    .get('/:id', (req, res) => {
        if(!req.params.id) return notFound;
        else { 
            Games.findById(req.params.id)
                .then(game => res.json(game));
        }
    })
    .post('/', (req, res) => {
        Games.create(req.body)
            .then(game => res.json(game));
    })
    .put('/:id', (req, res) => {
        Games.findByIdAndUpdate(req.params.id, req.body)
            .then(game => res.json(game));
    })
    .delete('/:id', (req, res) => {
        Games.findByIdAndRemove(req.params.id)
            .then(game => res.json(game));
    });