const router = require('fastify').Router();
const Birds = require('../models/bird');

module.exports = router
    .get('/', (req, res) => {
        Birds.find()
            .then(birds => res.json(birds));
    })

    .get('/:id', (req, res) => {
        Birds.findById(req.params.id)
            .then(bird => res.json(bird));
    })

    .post('/', (req, res) => {
        Birds.create(req.body)
            .then(bird => res.json(bird));
    })
    
    .put('/:id', (req, res) => {
        Birds.findByIdAndUpdate(req.params.id, req.body)
            .then(bird => res.json(bird));
    })

    .delete('/:id', (req, res) => {
        Birds.findByIdAndRemove(req.params.id)
            .then(bird => res.json(bird));    
    });
    