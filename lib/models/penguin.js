const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Penguins = mongo.then(db => db.collection('penguins'));


module.exports = {
    create(penguin) {
        return Penguins.then(penguins => penguins
            .insertOne(penguin)
            .then(result => result.ops[0]));
    },
    findById(id) {
        return Penguins.then(penguins => penguins
            .findOne({ _id: ObjectId(id) })
        );
    },
    find() {
        return Penguins.then(penguins => penguins
            .find()
            .toArray());
    }
};