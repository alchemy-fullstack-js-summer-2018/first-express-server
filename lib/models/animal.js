/* eslint no-console: off */
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
        console.log('into the id function');
        return Animals.then(animals => animals
            .findOne({ _id: ObjectId(id) })   
        );
    },

    findByIdAndUpdate(id, animal) {
        delete animal._id;
        return Animals.then(animals => animals
            .findOneAndUpdate({
                _id: ObjectId(id)
            }, 
            { 
                $set: animal
            },
            {
                returnOriginal: false
            })
            .then(result => result.value));
    },

    findByIdAndRemove(id) {
        return Animals.then(animals => animals
            .removeOne({
                _id: ObjectId(id)
            }));
    }

};