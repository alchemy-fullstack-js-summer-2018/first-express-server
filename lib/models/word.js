const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Words = mongo.then(db => db.collection('words'));

module.exports = {
    create(word) {
        if(word.length) {
            return Words.then(words => words
                .insertMany(word)
                .then(result => result.ops));
        }
        else {
            return Words.then(words => words
                .insertOne(word)
                .then(result => result.ops[0]));
        }
    },
    find() {
        return Words.then(words => words
            .find()
            .toArray());
    },
    findById(id) {
        return Words.then(words => words
            .findOne({ _id: ObjectId(id) }));
    },
    findByIdAndUpdate(id, word) {
        delete word._id;
        return Words.then(words => words
            .findOneAndUpdate({
                _id: ObjectId(id)
            },
            {
                $set: word
            },
            {
                returnOriginal: false
            }
            ).then(result => result.value));
    },
    findByIdAndRemove(id) {
        return Words.then(words => words
            .removeOne({ _id: ObjectId(id) }));
    }
};