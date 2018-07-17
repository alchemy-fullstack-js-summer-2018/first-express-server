const mongo = require('../mongodb');

const Rappers = mongo.then(db => db.collection('rappers'));

module.exports = {
    find() {
        return Rappers.then(rappers => rappers
            .find()
            .toArray());
    },
    create(rapper) {
        return Rappers.then(rappers => rappers
            .insertOne(rapper)
            .then(result => result.ops));
    }
};