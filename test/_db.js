require('dotenv').config({ path: './test/.env'});
const mongo = require('../lib/mongodb');

after(() => {
    return mongo.clients.close();
});