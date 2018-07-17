const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');

app.use(express.static(publicDir));
app.use(express.json());

const car = require('./routes/cars');
app.use('/api/cars', car);
module.exports = app;