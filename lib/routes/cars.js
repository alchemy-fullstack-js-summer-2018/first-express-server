const router = require('express').Router();
const Cars = require('../models/car');

module.exports = router
    .get('/', (req, res) => {
        Cars.find()
            .then(cars => res.json(cars));

    })

    .get('/:id', (req, res) => {
        Cars.findById(req.params.id)
            .then(car => res.json(car));
    })
    .post('/', (req, res) => {
        Cars.create(req.body)
            .then(car => res.json(car));
    })
    
    .delete('/:id', (req, res) => {
        Cars.findByIdAndRemove(req.params.id)
            .then(() => res.end());
    });