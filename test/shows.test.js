const mongo = require('../lib/mongodb');
const { assert } = require('chai');
const request = require('./request');

describe('Shows API', () => {

    beforeEach(() => {
        return mongo.then(db => {
            db.collection('shows').remove();
        });
    });

    function save(show) {
        return request
            .post('/shows')
            .send(show)
            .then(({ body }) => body);
    }

    let breakingBad;
    let legion;
    let westWorld;
    let dvr = [];

    beforeEach(() => {
        return save({
            network: 'AMC',
            seasons: 5,
        })
            .then(data => {
                breakingBad = data;
                dvr[0] = breakingBad;
            });
    });
    beforeEach(() => {
        return save({
            network: 'FX',
            seasons: 2,
        })
            .then(data => {
                legion = data;
                dvr[1] = legion;
            });
    });
    beforeEach(() => {
        return save({
            network: 'HBO',
            seasons: 2,
        })
            .then(data => {
                westWorld = data;
                dvr[2] = westWorld;
            });
    });

    it('saves a show', () => {
        assert.ok(breakingBad._id);
    });

    it('returns 404 on bad url, courtesy of express.js', () => {
        return request
            .get('/breakingBread')
            .then(res => {
                assert.equal(res.status, 404);
            });
    });

    it('get a show by id', () => {
        return request
            .get(`/shows/${breakingBad._id}`)
            .then(res => {
                assert.deepEqual(res.body, breakingBad);
            });
    });

    it('updates a show', () => {
        breakingBad.network = 'Netflix';
        return request
            .put(`/shows/${breakingBad._id}`)
            .send(breakingBad)
            .then(({ body }) => {
                assert.equal(body.network, 'Netflix');
            });
    });

    it('removes a show', () => {
        return request
            .delete(`/shows/${breakingBad._id}`)
            .then(() => {
                return request.get(`/shows/${breakingBad._id}`);
            })
            .then(({ body }) => {
                assert.equal(body, null);
            });
    });

    it('gets all the shows', () => {
        return request
            .get('/shows')
            .then(({ body }) => {
                assert.deepEqual(body, dvr);
            });
    });
});