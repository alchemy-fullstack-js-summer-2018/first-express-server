const router = require('express').Router();
const Fruits = require('../models/fruit');

module.exports = router
    .get('/', (req, res) => {
        Fruits.find()
            .then(fruits => res.json(fruits));
    })

    .get('/:id', (req, res) => {
        Fruits.findById(req.params.id)
            .then(fruit => {
                if(fruit === null) {
                    return res.sendStatus(404)
                }
                return res.json(fruit)
            } 
        );

    })

    .post('/', (req, res) => {
        Fruits.create(req.body)
            .then(fruit => res.json(fruit));
    })

    .delete('/:id', (req, res) => {
        Fruits.findByIdAndRemove(req.params.id)
            .then(fruit => res.json(fruit));
    })