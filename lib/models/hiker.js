const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Hikers = mongo.then(db => db.collection('hikers'));

module.exports = {
    create(hiker) {
        return Hikers.then(hikers => hikers
            .insertOne(hiker)
            .then(result => result.ops[0]));
    },
    find() {
        return Hikers.then(hikers => hikers
            .find()
            .toArray());
    },
    findById(id) {
        return Hikers.then(hikers => hikers
            .findOne({ _id: ObjectId(id) })
        );
    }

};