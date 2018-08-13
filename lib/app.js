const fastify = require('fastify');
const app = fastify();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
// const express = require('express');
// const app = express();

// const path = require('path');

// const publicDir = path.resolve(__dirname, '../public');

app.use(fastify.static(publicDir));

app.use(fastify.json());

const bird = require('./routes/birds');
app.use('/api/birds', bird);

module.exports = app;


