const express = require('express');
const gitCardController = require('../controllers/githubcards.js');

let router = express.Router();

// Entry point for the github cards
router.route('/:user').get(gitCardController.entry);

module.exports = router;