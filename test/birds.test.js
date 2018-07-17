const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Birds API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('birds').remove();
        });
    });

    function save(bird) {
        return request
            .post('/api/birds')
            .send(bird)
            .then(({ body }) => body);
    }

    let robin;

    beforeEach(() => {
        return save({ name: 'Robin' })
            .then(data => {
                robin = data;
            });
    });

    it('saves a bird', () => {
        assert.isOk(robin._id);
    });

    it('gets a bird', () => {
        return request
            .get(`/api/birds/${robin._id}`)
            .then(({ body }) => {
                console.log('** a bird body **', body);
                assert.deepEqual(body, robin);
            });
    });

    it('gets a list of birds', () => {
        let dove;
        return save({ name: 'Dove' })
            .then(_dove => {
                dove = _dove;
                return request.get('/api/birds');
            })
            .then(({ body }) => {
                console.log('** bird list **', body);

                assert.deepEqual(body, [robin, dove]);
            });
    });

    it('updates a bird', () => {
        robin.sex = 'male';
        return request
            .put(`/api/birds/${robin._id}`)
            .send(robin)
            .then(({ body }) => {
                assert.deepEqual(body, robin);
                console.log('** bird update **', body);

            });
    });

    it('deletes a bird', () => {
        return request
            .del(`/api/birds/${robin._id}`)
            .then(() => {
                return request.get('/api/birds');
            })
            .then(({ body }) => {
                console.log('** body **', body);
                assert.deepEqual(body, []);
            });
    });


});