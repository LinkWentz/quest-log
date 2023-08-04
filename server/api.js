require('dotenv').config();

const express = require('express');

const api = express.Router();

api.get('/:user', (req, res) => {
    res.send('User ID: ' + req.params.user);
});

module.exports = api