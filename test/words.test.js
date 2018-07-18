const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Words API', () => {

    let savedWords = null;
    let testWord = null;

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('words').remove();
        });
    });


    beforeEach(() => {
        const words = [
            {
                word: 'reconnoiter',
                definition: 'make a military survey'
            },
            {
                word: 'abnegation',
                definition: 'the denial and rejection of a doctrine or a belief'
            },
            {
                word: 'exacerbate',
                definition: 'make worse'
            },
            {
                word: 'inane',
                definition: 'devoid of intelligence'
            }
        ];
        return request
            .post('/api/words')
            .send(words)
            .then(({ body }) => {
                assert.equal(body.length, 4);
                savedWords = body;
                testWord = savedWords[0];
            });
    });

    it('saves a word', () => {
        const word = {
            word: 'rue',
            definition: 'regret'
        };
        return request
            .post('/api/words')
            .send(word)
            .then(({ body }) => {
                assert.ok(body._id);
                assert.equal(body.word, word.word);
                assert.equal(body.definition, word.definition);
            });
    });

    it('gets all words', () => {
        return request
            .get('/api/words')
            .then(({ body }) => {
                assert.deepEqual(body, savedWords);
            });
    });

    it('gets a word by id', () => {
        return request
            .get(`/api/words/${testWord._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, testWord);
            });
    });

    it('updates a word', () => {
        testWord.definition = 'repurpose';
        return request
            .put(`/api/words/${testWord._id}`)
            .send(testWord)
            .then(({ body }) => {
                assert.deepEqual(body, testWord);
            })
            .then(() => {
                return request.get('/api/words');
            })
            .then(({ body }) => {
                assert.deepEqual(body, savedWords);
            });
    });

    it('removes a word', () => {
        return request
            .del(`/api/words/${testWord._id}`)
            .then(res => {
                assert.equal(res.status, 200);
            })
            .then(() => {
                return request.get('/api/words');
            })
            .then(({ body }) => {
                assert.deepEqual(body, savedWords.slice(1));
            });
    });

    it('throws a 500 error', () => {
        return request
            .get('/api/words/123')
            .then(err => {
                assert.equal(err.status, 500);
                assert.equal(err.text, 'An unexpected error occurred.');
            });
    });

});