const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Games API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('games').remove();
        });
    });

    function save(game) {
        return request
            .post('/api/games')
            .send(game)
            .then(({ body }) => body);
    }

    let botw;

    beforeEach(() => {
        return save({ name: 'Breath of the Wild' })
            .then(data => {
                botw = data;
            });
    });

    it('saves a game', () => {
        assert.isOk(botw._id);
    });
});