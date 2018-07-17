const router = require('express').Router();
const Rappers = require('../models/rapper');

module.exports = router
    .get('/', (req, res) => {
        Rappers.find()
            .then(rappers => res.json(rappers));
    })
    .post('/', (req, res) => {
        Rappers.create(req.body)
            .then(rapper => res.json(rapper));
    });
