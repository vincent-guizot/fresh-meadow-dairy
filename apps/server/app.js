const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const errorHandling = require('./middlewares/errorHandling');
const router = require('./routes');
const cors = require('cors');

// Middlewares
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use(router);
app.use(errorHandling);

module.exports = app;
