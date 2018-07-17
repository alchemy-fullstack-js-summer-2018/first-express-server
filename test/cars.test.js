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
        console.log(lancer._id);
        assert.isOk(lancer._id);
    });

    it('Gets a car', () => {
        return request
            .get(`/api/cars/${lancer._id}`)
            .then(({ body }) => {
                console.log(body);
                assert.deepEqual(body, lancer);
            });
    });

});