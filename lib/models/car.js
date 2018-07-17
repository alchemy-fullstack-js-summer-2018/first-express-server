const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Cars = mongo.then(db => db.collection('cars'));

module.exports = {
    create(car) {
        return Cars.then(cars => cars
            .insertOne(car)
            .then(result => result.ops[0]));
    },

    find() {
        return Cars.then(cars => cars
            .find()
            .toArray());
            
    },

    findById(id) {
        return Cars.then(cars => cars 
            .findOne({ _id: ObjectId(id) }));
    },

    findByIdAndRemove(id) {
        return Cars.then(cars => cars
            .removeOne({
                _id: ObjectId(id)
            }));
    },

   
};