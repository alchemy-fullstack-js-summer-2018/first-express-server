const router = require('express').Router();

module.exports = router
    .get('/', (req, res) => {
        res.statusCode = 404;
        res.send('Sorry, this is not the page you were looking for.');
    });