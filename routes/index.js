const express = require('express');

let router = express.Router();

// Entry point for the github cards
router.get('/user/:user', require('./githubcards.js'));

module.exports = router;