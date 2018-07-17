const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Games API', () => {

    let game;

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

    beforeEach(() => {
        return save({ name: 'Hollow Knight' })
            .then(data => {
                game = data;
            });
    });

    it('saves a game', () => {
        assert.isOk(game._id);
    });

    it('gets a game', () => {
        return request
            .get(`api/games/${game.id}`)
            .then(({ body }) => {
                assert.deepEqual(body, game);
            });
    });
});