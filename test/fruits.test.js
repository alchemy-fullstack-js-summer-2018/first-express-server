const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Fruits API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('fruits').remove();
        });
    });

    function save(fruit) {
        return request
            .post('/api/fruits')
            .send(fruit)
            .then(( {body }) => body);
    }

    let apple;
    let orange;
    let banana;

    beforeEach(() => {
        return save({
            type: 'Apple',
            color: 'Red',
            price: '$0.39'
        })
            .then(data => {
                apple = data;
            });
    })

    beforeEach(() => {
        return save({
            type: 'Orange',
            color: 'Orange',
            price: '$0.97'
        })
            .then(data => {
                orange = data;
            });
    })

    beforeEach(() => {
        return save({
            type: 'Banana',
            color: 'Yellow',
            price: '$0.19'
        })
            .then(data => {
                banana = data;
            });
    })

    it('Wired up and working', () => {
        assert.isOk(true)
    });

    it('Saves a fruit', () => {
        assert.isOk(apple._id);
    });

    it('Gets a fruit by ID', () => {
        return request
            .get(`/api/fruits/${apple._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, apple)
            });
    });

    it('Gets a list of all fruits', () => {
        return request
        .get('/api/fruits')
        .then(({ body }) => {
            assert.deepEqual(body, [apple, orange, banana]);
        });
    });

    it('Gets a 404 if no resource by ID is found', () => {
        return request
        .get('/api/fruits/5b4e19d81cb530811cda0999')
        .then(res => {
            assert.deepEqual(res.status, 404);
        });
    });

    it('Deletes a resource by ID', () => {
        return request
            .del(`/api/fruits/${apple._id}`)
            .then(() => {
                return request.get('/api/fruits');
            })
            .then(({ body }) => {
                assert.deepEqual(body, [orange, banana]);
            });
    })

    it('Updates a resource by ID', () => {
        apple.type = 'Green Apple';
        return request
            .put(`/api/fruits/${apple._id}`)
            .send(apple)
            .then(({ body }) => {
                assert.deepEqual(body, apple)
            });
    });

});