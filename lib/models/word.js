const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Words = mongo.then(db => db.collection('words'));

module.exports = {
    create(word) {
        return Words.then(words => words
            .insertOne(word)
            .then(result => result.ops[0]));
    },
    find() {
        return Words.then(words => words
            .find()
            .toArray());
    },
    findById(id) {
        return Words.then(words => words
            .findOne({ _id: ObjectId(id) }));
    }
};