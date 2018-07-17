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

    it('posts/saves a rude thing', () => {
        assert.isOk(trump._id);
    });

    it('gets a rude thing by id', () => {
        return request
            .get(`/api/rudethings/${trump._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, trump);
            });
    });
    it('gets a list of all rude things', () => {
        let pollution;
        return save({ name: 'Pollution' })
            .then(_pollution => {
                pollution = _pollution;
                return request.get('/api/rudethings');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [trump, pollution]);
            });
    });
    it('updates a rude thing', () => {
        trump.name = 'Donald J. Trump';
        return request
            .put(`/api/rudethings/${trump._id}`)
            .send(trump)
            .then(({ body }) => {
                assert.deepEqual(body, trump);
            });

    });
    it('removes a rude thing by id', () => {
        return request
            .delete(`/api.rudethings/${trump._id}`)
            .then(() => {
                return request.get('/api/rudethings');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [trump]);
            });
    });
});