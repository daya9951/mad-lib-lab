const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));
server.use(express.static(path.join(__dirname, 'public')));

// Explicitly serve index.html
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ITC505', 'lab-6', 'index.html'));
});

// Random number route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route for form
server.post('/', (req, res) => {
  const { noun, verb, adjective } = req.body;
  const result = `Once upon a time, a ${adjective} ${noun} loved to ${verb} all day long!`;
  res.send(result);
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
