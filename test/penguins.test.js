const { assert } = require('chai');
const mongo = require('../lib/mongodb');
const request = require('./request');

describe('Penguin API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('penguins').remove();
        });
    });

    function save(penguin) {
        return request
            .post('/api/penguins')
            .send(penguin)
            .then(({ body }) => body);
    }

    let billy;
    
    beforeEach(() => {
        billy = {
            name: 'billy',
            location: 'Antarctic',
            age: 5
        };
        return save(billy)
            .then(data => {
                billy = data;
            });
    });

    it('saves a penguin', () => {
        assert.isOk(billy._id);
    });

    it('gets a penguin by id', () => {
        return request  
            .get(`/api/penguins/${billy._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, billy);
            });
    });

    it('gets all penguins', () => {
        let sally;
        return save(sally)
            .then(_sally => {
                sally = _sally;
                return request.get('/api/penguins');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [billy, sally]);
            });
        
    });

    it('updates billy the penguin', () => {
        billy.location = 'Salt Lake City';
        return request
            .put(`/api/penguins/${billy._id}`)
            .send(billy)
            .then(({ body }) => {
                assert.deepEqual(body, billy);
            });
    });
});