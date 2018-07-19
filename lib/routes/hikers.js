const router = require('express').Router();
const Hikers = require('../models/hiker');

module.exports = router
    

    .get('/', (req, res) => {
        Hikers.find()
            .then(hikers => res.json(hikers));
    })

    .get('/:id', (req, res) => {
        Hikers.findById(req.params.id)
            .then(hiker => res.json(hiker));
    })

    .post('/', (req, res) => {
        Hikers.create(req.body)
            .then(hiker => res.json(hiker));
    });