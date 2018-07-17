const mongo = require('../mongodb');

const Games = mongo.then(db => db.collection('games'));

module.exports = {
    create(game) {
        return Games.then(games => games
            .insertOne(game)
            .then(result => result.ops[0]));
    },
    find() {
        return Games.then(games => games
            .find()
            .toArray());
    }
};