const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json());

const words = require('./routes/words');
app.use('/api/words', words);

module.exports = app;