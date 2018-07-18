const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Fruits = mongo.then(db => db.collection('fruits'));

module.exports = {
    create(fruit) {
        return Fruits.then(fruits => fruits
            .insertOne(fruit)
            .then(result => result.ops[0]));
    },
    find() {
        return Fruits.then(fruits => fruits
            .find()
            .toArray());
    },
    findById(id) {
        return Fruits.then(fruits => fruits
            .findOne({ _id: ObjectId(id) })
        );
    },
    findByIdAndRemove(id) {
        return Fruits.then(fruits => fruits
            .removeOne({
                _id: ObjectId(id)
            }));
    },
    findByIdAndUpdate(id, fruit) {
        delete fruit._id;
        return Fruits.then(fruits => fruits
            .findOneAndUpdate({
                _id: ObjectId(id)
            },
            {
                $set: fruit
            },
            {
                returnOriginal: false
            })
            .then(result => result.value));
    }
};