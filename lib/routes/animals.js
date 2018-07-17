const router = require('express').Router();
const Animals = require('../models/animal');

module.exports = router
    .get('/', (req, res) => {
        Animals.find()
            .then(animals => res.json(animals));
    })

    .get('/:id', (req, res) => {
        Animals.findById(req.params.id)
            .then(animal => res.json(animal));
    })

    .post('/', (req, res) => {
        Animals.create(req.body)
            .then(animal => res.json(animal));
    });