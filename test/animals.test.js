const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Animals API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('animals').remove();
        });
    });

    function save(animal) {
        return request
            .post('/api/animals')
            .send(animal)
            .then(({ body }) => body);
    }

    let wally;

    beforeEach(() => {
        return save({ name: 'Wally the Walrus' })
            .then(data => {
                wally = data;
            });
    });

    it('returns 404 on bad url', () => {
        return request
            .get('/bad')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });
    
    
    it('saves an animal', () => {
        assert.isOk(wally._id);
    });

    it('gets a list of animals', () => {
        let wilford;
        return save({ name: 'Wilford the Wombat' })
            .then(_wilford => {
                wilford = _wilford;
                return request.get('/api/animals');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [wally, wilford]);
            });
    });

    it('gets an animal by id', () => {
        return request
            .get(`/api/animals/${wally._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, wally);
            });
    });

    it('removes an animal', () => {
        return request
            .del(`/api/animals/${wally._id}`)
            .then(() => {
                return request.get('/api/animals');
            })
            .then(({ body }) => {
                assert.deepEqual(body, []);
            });
    });

    it('updates an animal', () => {
        wally.name = 'Wallace the Walrus';
        return request
            .put(`/api/animals/${wally._id}`)
            .send(wally)
            .then(({ body }) => {
                assert.deepEqual(body, wally);
            });
    });

});
