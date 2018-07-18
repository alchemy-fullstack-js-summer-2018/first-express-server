require('dotenv').config({ path: './.env' });
const mongo = require('../lib/mongodb');

after(() => {
    return mongo.client.close();
});