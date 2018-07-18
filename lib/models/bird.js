const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

const Birds = mongo.then(db => db.collection('birds'));

module.exports = {
    create(bird) {
        return Birds.then(birds => birds
            .insertOne(bird)
            .then(result => result.ops[0]));
    },

    find() {
        return Birds.then(birds => birds
            .find()
            .toArray());
    },

    findById(id) {
        return Birds.then(birds => birds
            .findOne({ _id: ObjectId(id) })
        );
    },

    findByIdAndUpdate(id, bird) {
        delete bird._id;
        return Birds.then(birds => birds
            .findOneAndUpdate({
                _id: ObjectId(id)
            },
            {
                $set: bird
            },
            {
                returnOriginal: false
            })
            .then(result => {
                return result.value;
            }));
    },

    findByIdAndRemove(id) {
        return Birds.then(birds => {
            return birds.removeOne({
                _id: ObjectId(id)
            });
        });
    }
};