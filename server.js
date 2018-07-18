/* eslint no-console: off */
require('dotenv').config();
const { createServer } = require('http');
require('./lib/mongodb');
const app = require('./lib/app');

const PORT = process.env.PORT || 3004;
const server = createServer(app);

server.listen(PORT, () => {
    console.log('server runnin baby', server.address().port);
});