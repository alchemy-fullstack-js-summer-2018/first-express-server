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
    });