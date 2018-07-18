const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));

app.use(express.json());

const bird = require('./routes/birds');
app.use('/api/birds', bird);

module.exports = app;

