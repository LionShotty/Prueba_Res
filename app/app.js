const express = require('express');
const app = express();
const routerPalapa = require('./routes/palapaRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routerPalapa);

module.exports = app