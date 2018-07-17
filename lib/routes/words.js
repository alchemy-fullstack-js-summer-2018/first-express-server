const router = require('express').Router();
const Word = require('../models/word');

module.exports = router
    .post('/', (req, res, next) => {
        Word.create(req.body)
            .then(word => res.json(word))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Word.find()
            .then(words => res.json(words))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Word.findById(req.params.id)
            .then(word => res.json(word))
            .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Word.findByIdAndUpdate(req.params.id, req.body)
            .then(word => res.json(word))
            .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Word.findByIdAndRemove(req.params.id)
            .then(() => res.end())
            .catch(next);
    })
    // eslint-disable-next-line
    .use((err, req, res, next) => {
        console.log('**** SERVER ERROR ****\n', err);
        res.status(500).send('An unexpected error occurred.');
    });