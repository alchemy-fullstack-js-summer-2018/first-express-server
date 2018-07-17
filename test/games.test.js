const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Games API', () => {

    let hollowKnight;

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
                hollowKnight = data;
            });
    });

    it('saves a game', () => {
        assert.isOk(hollowKnight._id);
    });

    it('gets a list of games', () => {
        let darkestDungeon;
        return save({ name: 'Darkest Dungeon' })
            .then(darkest => {
                darkestDungeon = darkest;
                return request.get('/api/games');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [hollowKnight, darkestDungeon]);
            });
    });
});