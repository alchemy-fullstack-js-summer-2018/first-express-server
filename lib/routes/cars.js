const router = require('express').Router();
const Cars = require('../models/car');

module.exports = router
    .get('/', (req, res) => {
        Cars.find()
            .then(cars => res.json(cars));

    });

// .post('/', (req, res) => {

// })
// });