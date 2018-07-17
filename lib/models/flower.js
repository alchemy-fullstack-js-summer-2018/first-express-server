const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Flowers = mongo.then(db => db.collection('flowers'));

module.exports = {
    create(flower) {
        return Flowers.then(flowers => flowers
            .insertOne(flower)
            .then(result => result.ops[0]));   
    },
    find() {
        return Flowers.then(flowers => flowers
            .find()
            .toArray());
    },
    findById(id) {
        return Flowers.then(flowers => flowers
            .findOne({ _id: ObjectId(id) })
        );
    },
};