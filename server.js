const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Parse URL-encoded bodies (for form submissions)
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// GET route: returns a random number
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route for the mad lib form submission
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { noun, verb, adjective, adverb, place } = req.body;

  // Validation: All fields are required
  if (!noun || !verb || !adjective || !adverb || !place) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  // Creating the mad lib using template literals
  const madLib = `
    It was a ${adjective} day in ${place}. 
    I decided to ${verb} ${adverb}, but all I found was a lonely ${noun}.
  `;

  // Send the resulting mad lib back as an HTML response
  res.send(`
    <h1>Submission Successful</h1>
    <p>${madLib}</p>
    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
  `);
});

// Serve static files from the 'public' folder
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Determine port based on execution mode (80 for deployment, 8080 for local development)
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log(`Ready on localhost:${port}!`));
