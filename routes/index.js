const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// Entry point for the github cards
router.use('/user/', require('./githubcards.js'));

module.exports = router;
