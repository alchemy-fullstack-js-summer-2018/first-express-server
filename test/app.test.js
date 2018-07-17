// const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Cars API', () => {
    
    it('returns a 404 error on a bad path', () => {
        return request
            .get('/does/not/exist')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
});