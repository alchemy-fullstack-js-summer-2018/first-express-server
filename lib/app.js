const express = require('express');
const app = express();
// const path = require('path');

app.use(express.json());

const rapper = require('./routes/rappers');
app.use('/api/rappers', rapper);

module.exports = app;