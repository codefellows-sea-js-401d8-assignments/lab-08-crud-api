'use strict';

const express = require('express');
const app = express();

app.all('/', (req,res) => {
  res.send('Welcome to the home page');
});
