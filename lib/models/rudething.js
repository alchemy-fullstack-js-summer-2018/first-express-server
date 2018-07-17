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
    },
    update(rudething) {
        const id = rudething._id;
        delete rudething._id;

        return Rudethings.then(rudethings => rudethings
            .findOneAndUpdate({
                _id: ObjectId(id)
            },
            {
                $set: rudething
            },
            {
                returnOriginal: false
            })
            .then(result => result.value));
    }//,
    // remove(id) {
    //     return Rudethings.then(rudethings => rudethings
    //         .removeOne({ _id: ObjectId(id) }));
    // }
};