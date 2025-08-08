// app.js
const express = require('express');
const app = express();
const port = 5000;

// Simple GET route
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

// Additional route
app.get('/about', (req, res) => {
  res.send('About page');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
