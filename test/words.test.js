const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Words API', () => {

    let savedWord = null;

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('words').remove();
        });
    });


    beforeEach(() => {
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
                savedWord = body;
            });
    });

    it('gets all words', () => {
        return request
            .get('/api/words')
            .then(({ body }) => {
                assert.deepEqual(body, [savedWord]);
            });
    });

    it('gets a word by id', () => {
        return request
            .get(`/api/words/${savedWord._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, savedWord);
            });
    });

    it('updates a word', () => {
        savedWord.definition = 'repurpose';
        return request
            .put(`/api/words/${savedWord._id}`)
            .send(savedWord)
            .then(({ body }) => {
                assert.deepEqual(body, savedWord);
            });
    });

});