const express = require('express');
//const routes = require('./routes/githubcards.js');
const routes = require('./routes/index.js');
const app = express();
const port = 3000;

// Entry point for the github cards
app.use('/', routes);

// Start listening to requests
app.listen(port, () => {console.log(`Listening at http://localhost:${port}`)});