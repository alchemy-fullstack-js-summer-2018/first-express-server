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

    it('returns game by id on GET', () => {
        return request
            .get(`/api/games/${botw._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, botw);
            });
    });

    it('returns games on GET', () => {
        let mkart;
        return save({ name: 'Mario Kart' })
            .then(_mkart => {
                mkart = _mkart;
                return request.get('/api/games');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [botw, mkart]);
            });
    });

    
});