const router = require('express').Router();
const Rudethings = require('../models/rudething');

module.exports = router
    .get('/', (req, res) => {
        Rudethings.find()
            .then(rudethings => res.json(rudethings));
    })

    .get('/:id', (req, res) => {
        Rudethings.findById(req.params.id)
            .then(rudething => res.json(rudething));
    })

    .post('/', (req, res) => {
        Rudethings.create(req.body)
            .then(rudething => res.json(rudething));
    })

    .put('/:id', (req, res) => {
        Rudethings.update(req.body)
            .then(rudethings => res.json(rudethings));
    })
    .delete('/:id', (req, res) => {
        Rudethings.findAndRemove(req.params.id)
            .then(rudething => res.json(rudething));
    
    });
