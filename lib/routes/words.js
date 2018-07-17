const router = require('express').Router();
const Word = require('../models/word');

module.exports = router
    .post('/', (req, res) => {
        Word.create(req.body)
            .then(word => res.json(word));
    })
    .get('/', (req, res) => {
        Word.find()
            .then(words => res.json(words));
    })
    .get('/:id', (req, res) => {
        Word.findById(req.params.id)
            .then(word => res.json(word));
    })
    .put('/:id', (req, res) => {
        Word.findByIdAndUpdate(req.params.id, req.body)
            .then(word => res.json(word));
    })
    .delete('/:id', (req, res) => {
        Word.findByIdAndRemove(req.params.id)
            .then(() => res.end());
    })
        ;