const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Flowers API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('flowers').remove();
        });
    });

    function save(flower) {
        return request
            .post('/api/flowers')
            .send(flower)
            .then(({ body }) => body);
    }

    let daffodil;

    beforeEach(() => {
        return save({ name: 'Daffodil' })
            .then(data => {
                daffodil = data;
            });
    });

    it('saves a flower', () => {
        assert.isOk(daffodil._id);
    });
});