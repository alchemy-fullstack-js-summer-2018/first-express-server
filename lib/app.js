const express = require('express');
const app = express();
const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());

const game = require('./routes/games');
app.use('/api/games/', game);

module.exports = app;