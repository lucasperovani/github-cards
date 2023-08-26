const express = require('express');
const routes = require('./routes/index.js');

const APP = express();
const PORT = 3000;

// Entry point for the github cards
APP.use('/', routes);

// Start listening to requests
APP.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
