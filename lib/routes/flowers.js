const router = require('express').Router();
const Flowers = require('../models/flower');

module.exports = router
    .get('/', (req, res) => {
        Flowers.find()
            .then(flowers => res.json(flowers));
    })

    .get('/:id', (req, res) => {
        Flowers.findById(req.params.id)
            .then(flower => res.json(flower));
    })

    .post('/', (req, res) => {
        Flowers.create(req.body)
            .then(flower => res.json(flower));
    })

    .put('/:id', (req, res) => {
        Flowers.update(req.params.id, req.body)
            .then(flower => res.json(flower));
    // })

    // .del('/:id', (req, res) => {
    //     Flowers.remove(req.params.id)
    //         .then(flower => res.json(flower));
    });