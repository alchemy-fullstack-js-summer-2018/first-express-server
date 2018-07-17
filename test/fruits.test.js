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

    it('Wired up and working', () => {
        assert.isOk(true)
    });

    it('Saves a fruit', () => {
        assert.isOk(apple._id);
    });

    it('Gets a fruit', () => {
        return request
            .get(`/api/fruits/${apple._id}`)
            .then(({ body }) => {
                assert.deepEqual(body, apple)
            });
    });

});