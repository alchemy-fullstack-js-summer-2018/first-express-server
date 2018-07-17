const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Hip-Hop API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('rappers').remove();
        });
    });

    function save(rapper) {
        return request
            .post('/api/rappers')
            .send(rapper)
            .then(({ body }) => body);
    }

    let hov;

    beforeEach(() => {
        return save({ name: 'Jay-Z' })
            .then(data => {
                hov = data;
            });
    });

    it('saves a rapper', () => {
        assert.isOk(hov._id);
    });

    it('can get all rappers out of the database', () => {
        let kanye;
        return save({ name: 'Kanye West' })
            .then(_kanye => {
                kanye = _kanye;
                return request.get('/api/rappers');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [hov, kanye]);
            });
    });

    it('can get one rapper when given the id', () => {
        return request
            .get(`/api/rappers/${hov._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, hov);
            });
    });
    
    it('returns a 404 error on a bad path', () => {
        return request
            .get('/does/not/exist')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('updates a rapper', () => {
        hov.name = 'J-Hova';
        return request
            .put(`/api/rappers/${hov._id}`)
            .send(hov)
            .then(({ body }) => {
                assert.deepEqual(body, hov);
            });
    });
});