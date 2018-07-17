const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Cars = mongo.then(db => db.collection('cars'));

module.exports = {
    create(car) {
        return Cars.then(cars => cars
            .insertOne(car)
            .then(result => result.ops[0]));
    },

    findById(id) {
        return Cars.then(cars => cars 
            .findOne({ _id: ObjectId(id) }));
    }
};