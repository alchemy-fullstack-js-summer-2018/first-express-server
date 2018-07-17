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
        return request
            .get('/')
            .then(rappers => {
                // console.log(rappers);
                assert.equal(rappers.body, [hov]);
            });
    });

    it.skip('can add a rapper to the db', () => {
        return request
            .post('/');
    });
    
    it('returns a 404 error on a bad path', () => {
        return request
            .get('/does/not/exist')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});