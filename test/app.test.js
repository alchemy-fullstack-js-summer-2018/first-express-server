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

    let rappers;

    beforeEach(() => {
        return save({ name: 'Jay-Z' })
            .then(data => {
                rappers = data;
            });
    });

    it('saves a rapper', () => {
        assert.isOk(rappers[0]._id);
    });

    it('can get all rappers out of the database', () => {
        return request
            .get('/api/rappers')
            .then(_rappers => {
                // console.log(rappers);
                assert.equal(_rappers.body, rappers);
            });
    });
    
    it('returns a 404 error on a bad path', () => {
        return request
            .get('/does/not/exist')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});