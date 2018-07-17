const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Games API', () => {

    let hollow = {
        name: 'Hollow Knight',
        genre: 'Action'
    };

    let darkest = {
        name: 'Darkest Dungeon',
        genre: 'Turn-based RPG'
    };

    let gwent = {
        name: 'Gwent',
        genre: 'CCG'
    };

    let hollowKnight;
    let darkestDungeon;
    let gwentGame;

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
        return save(hollow)
            .then(data => {
                hollowKnight = data;
            });
    });
    beforeEach(() => {
        return save(darkest)
            .then(data => {
                darkestDungeon = data;
            });
    });
    beforeEach(() => {
        return save(gwent)
            .then(data => {
                gwentGame = data;
            });
    });

    it('saves a game', () => {
        assert.isOk(gwentGame._id);
    });

    it('gets a game by ID', () => {
        return request
            .get(`/api/games/${hollowKnight._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, hollowKnight);
            });
    });

    it('gets a list of games', () => {
        return request
            .get('/api/games')
            .then(({ body }) => {
                assert.deepEqual(body, [hollowKnight, darkestDungeon, gwentGame]);
            });
    });

    it('updates a game by ID', () => {
        hollowKnight.genre = 'Soulslike';
        return request
            .put(`/api/games/${hollowKnight._id}`)
            .send(hollowKnight)
            .then(({ body }) => {
                assert.deepEqual(body, hollowKnight);
            });
    });
});