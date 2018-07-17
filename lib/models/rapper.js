const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Rappers = mongo.then(db => db.collection('rappers'));

module.exports = {
    find() {
        return Rappers.then(rappers => rappers
            .find()
            .toArray());
    },
    findById(id) {
        return Rappers.then(rappers => rappers
            .findOne({ _id: ObjectId(id) })
        );
    },
    create(rapper) {
        return Rappers.then(rappers => rappers
            .insertOne(rapper)
            .then(result => result.ops[0]));
    }
};