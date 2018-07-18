const router = require('express').Router();
const Penguins = require('../models/penguin');

module.exports = router
    .post('/', (req, res) => {
        Penguins.create(req.body)
            .then(penguin => res.json(penguin));
    })

    .get('/:id', (req, res) => {
        Penguins.findById(req.params.id)
            .then(penguin => res.json(penguin));
    })

    .get('/', (req, res) => {
        Penguins.find()
            .then(penguins => res.json(penguins));
    })

    .put('/:id', (req, res) => {
        Penguins.update(req.body)
            .then(penguins => res.json(penguins));
    })

    .delete('/:id', (req, res) => {
        Penguins.remove(req.params.id)
            .then(() => res.json(({ removed: true }))
            );
    });