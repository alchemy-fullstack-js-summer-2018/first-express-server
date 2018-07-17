const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Rudethings = mongo.then(db => db.collection('rudethings'));
module.exports = {
    create(rudething) {
        return Rudethings.then(rudethings => rudethings
            .insertOne(rudething)
            .then(result => result.ops[0]));
    },
    find() {
        return Rudethings.then(rudethings => rudethings
            .find()
            .toArray());
    },
    findById(id) {
        return Rudethings.then(rudethings => rudethings
            .findOne({ _id: ObjectId(id) })
        );
    }
};