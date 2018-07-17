const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Cars Express API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            return db.collection('cars').remove();
        });
    });

    function save(car) {
        return request
            .post('/api/cars')
            .send(car)
            .then(({ body }) => body);
    }

    let lancer;

    beforeEach(() => {
        return save({ brand: 'Mistubishi' })
            .then(data => {
                lancer = data;
            });
    });

    it('Saves a car', () => {
        assert.isOk(lancer._id);
    });

});