const mongo = require('../mongodb');
// const { ObjectId } = require('mongodb');

const Fruits = mongo.then(db => db.collection('fruits'));

module.exports = {
    create(fruit) {
        return Fruits.then(fruits => fruits
            .insertOne(fruit)
            .then(result => result.ops[0]));
    }
}