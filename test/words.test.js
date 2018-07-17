const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Words API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('words').remove();
        });
    });

    it('saves a word', () => {
        const word = {
            word: 'reconnoiter',
            definition: 'make a military survey'
        };
        return request
            .post('/api/words')
            .send(word)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.word, word.word);
            });
    });

});