const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Words = mongo.then(db => db.collection('words'));

module.exports = {
    create(word) {
        return Words.then(words => words
            .insertOne(word)
            .then(result => result.ops[0]));
    }
};