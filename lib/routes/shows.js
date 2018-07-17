const router = require('express').Router();
const Shows = require('../models/show');

module.exports = router
    .get('/', (req, res) => {
        Shows.find()
            .then(shows => res.json(shows));
    })
    .get('/:id', (req, res) => {
        Shows.findById(req.params.id)
            .then(show => res.json(show));
    })
    .post('/', (req, res) => {
        Shows.create(req.body)
            .then(show => res.json(show));
    })
    .put('/:id', (req, res) => {
        console.log('req.body:', req.body);
        Shows.findByIdAndUpdate(req.params.id, req.body)
            .then(show => res.json(show));
    })
    .delete('/:id', (req, res) => {
        Shows.deleteOneById(req.params.id)
            .then(show => res.json(show));
    });