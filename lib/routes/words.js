const router = require('express').Router();
const Word = require('../models/word');

module.exports = router
    .post('/', (req, res) => {
        Word.create(req.body)
            .then(word => res.json(word));
    });