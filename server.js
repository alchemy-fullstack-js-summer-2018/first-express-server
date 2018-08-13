/* eslint no-console: off */

require('dotenv').config();
// const { createServer } = require('http');
require('./lib/mongodb');
// const app = require('./lib/app');

// const PORT = process.env.PORT || 3000;
// const fastify = createServer(app);

// server.listen(PORT, () => {
//     console.log('server running on', server.address().port);
// });



const fastify = require('fastify')({ logger: true });

fastify.get('/', function(request, reply) {
    reply.send({ hello: 'bird' });
});

fastify.listen(3000, function(err, address) {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
