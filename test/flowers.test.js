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

    it('gets a flower by id', () => {
        return request
            .get(`/api/flowers/${daffodil._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, daffodil);
            });
    });

    it('updates a flower', () => {
        daffodil.color = 'white';
        return request
            .put(`/api/flowers/${daffodil._id}`)
            .send(daffodil)
            .then(({ body }) => {
                assert.deepEqual(body, daffodil);
            });
    });

    it('gets a list of flowers', () => {
        let poppy;
        return save({ name: 'California Poppy' })
            .then(_poppy => {
                poppy = _poppy;
                return request.get('/api/flowers');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [daffodil, poppy]);
            });
    });

    it('returns 404 on bad id', () => {
        return request
            .get('/bad id')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('removes a flower', () => {
        return request
            .del(`/api/flowers/${daffodil._id}`)
            .then(() => {
                return request.get('/api/flowers');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

});