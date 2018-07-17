const express = require('express');
const app = express();

const path = require('path');
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));
app.use(express.json())
;
const rudething = require('./routes/rudethings');
app.use('/api/rudethings', rudething);

module.exports = app;