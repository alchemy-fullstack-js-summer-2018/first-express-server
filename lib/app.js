const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());

const show = require('../lib/routes/shows');
app.use('/shows', show);

module.exports = app;