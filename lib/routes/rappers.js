const router = require('express').Router();
const Rappers = require('../models/rapper');

module.exports = router
    .get('/', (req, res) => {
        Rappers.find()
            .then(rappers => res.json(rappers));
    })
    .get('/:id', (req, res) => {
        Rappers.findById(req.params.id)
            .then(rapper => res.json(rapper));
    })
    .post('/', (req, res) => {
        Rappers.create(req.body)
            .then(rapper => res.json(rapper));
    })
    .put('/:id', (req, res) => {
        Rappers.findByIdAndUpdate(req.params.id, req.body)
            .then(rapper => res.json(rapper));
    })
    .delete('/:id', (req, res) => {
        Rappers.findByIdAndRemove(req.params.id)
            .then(rapper => res.json(rapper));
    });
