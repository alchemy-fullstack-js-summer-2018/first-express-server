/* eslint no-console: off */

require('dotenv').config();
const { createServer } = require('http');
require('./lib/mongodb');
const app = require('app');

const PORT = process.envPORT || 3000;
const server = createServer(app);

server.listen(PORT, () => {
    console.log('server running on port:', server.address().port());
});