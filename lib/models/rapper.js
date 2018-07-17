const mongo = require('../mongodb');

const Rappers = mongo.then(db => db.collection('rappers'));