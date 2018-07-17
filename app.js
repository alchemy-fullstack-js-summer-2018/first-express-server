const express = require('express');
const app = express();

// Common "Middleware":
const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json());

//add routers

const animal = require('./routes/animals');
app.use('/api/animals', animal);

module.exports = app;