const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');
// const index = fs.readFileSync(path.join(__))

function front() {
  const app = express();
  const public = path.join(__dirname, 'public');
  const indexHtml = path.join(public, 'index.html');

  app.use(express.static(public));

  app.get('/', (req, res, next) => {
    res.sendFile(indexHtml);
    next();
  });

  return app;
}

module.exports = front;
