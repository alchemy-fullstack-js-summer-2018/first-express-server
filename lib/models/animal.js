const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Animals = mongo.then(db => db.collection('animals'));

module.exports = {
    create(animal) {
        return Animals.then(animals => animals
            .insertOne(animal)
            .then(result => result.ops[0]));
    },

    find() {
        return Animals.then(animals => animals
            .find()
            .toArray());
    },

    findById(id) {
        return Animals.then(animals => animals
            .findOne({ _id: ObjectId(id) })
        );
    }
};