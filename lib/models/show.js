const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Shows = mongo.then(db => db.collection('shows'));

module.exports = {
    create(show) {
        return Shows.then(shows => shows
            .insertOne(show)
            .then(result => result.ops[0]));
    },
    find() {
        return Shows.then(shows => shows
            .find()
            .toArray());
    },
    findById(id) {
        return Shows.then(shows => shows
            .findOne({ _id: ObjectId(id) }));
    }
};