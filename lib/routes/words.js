const router = require('express').Router();

module.exports = router
    .get('/', (req, res) => {
        res.end('hello word');
    });