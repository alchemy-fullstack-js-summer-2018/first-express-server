const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json());

const flower = require('./routes/flowers');
app.use('/api/flowers', flower);

module.exports = app;