const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Rude Things API', () => {
    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('rudethings').remove();
        });
    });
    function save(rudething) {
        return request
            .post('/api/rudethings')
            .send(rudething)
            .then(({ body }) => body);
    }

    let trump;

    beforeEach(() => {
        return save({ name: 'Donald Trump' })
            .then(data => {
                trump = data;
            });
    });

    it('saves a rude thing', () => {
        assert.isOk(trump._id);
    });
});