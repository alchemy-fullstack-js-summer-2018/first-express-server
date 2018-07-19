const express = require('express');
const app = express();

app.use(express.json());

const hiker = require('./routes/hikers');
app.use('/api/hikers', hiker);

module.exports = app;

