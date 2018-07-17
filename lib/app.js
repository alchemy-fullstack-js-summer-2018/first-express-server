const express = require('express');
const app = express();

app.use(express.json());

const penguin = require('./routes/penguins');

app.use('/api/penguins', penguin);

module.exports = app;