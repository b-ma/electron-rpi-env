const bodyParser = require('body-parser');
const express = require('express');
const networks = require('./db/networks');
const execSync = require('child_process').execSync;

const configureWiFi = require('../../system/configure-wifi');

function api() {
  const app = express();

  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  const error = (err) => console.error(err.stack);
  const log = (val) => { console.log(val); return val; }

  app.get('/db/network', (req, res) => {
    networks.all()
      .then(data => res.json(data), error)
      .catch(err => console.error(err.stack));
  });

  app.get('/db/network/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    networks.get(id)
      .then(item => res.json(item))
      .catch(err => console.error(err.stack));
  });

  // insert a new network into the database
  app.post('/db/network', (req, res) => {
    networks.create(req.body)
      .then((rowid) => res.json({ rowid }))
      .catch(err => console.error(err.stack));
  });

  // update a network in the database
  app.put('/db/network/:id', (req, res) => {
    networks.update(req.body)
      .then(() => res.sendStatus(204))
      .catch(err => console.error(err.stack));
  });

  // delete a new network from the database
  app.delete('/db/network/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    networks.delete(id)
      .then(() => res.sendStatus(204))
      .catch(err => console.error(err.stack));
  });


  // --------------------------------------------------
  // HOT ZONE
  // --------------------------------------------------

  // update config file according to a given network information
  app.post('/config/network/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    console.log(id);
    // res.send('@todo - configure network');
    networks.get(id)
      .then(log)
      .then(item => configureWiFi(item))
      .then(() => res.sendStatus(204))
      .catch(err => console.error(err.stack));

    console.log('shutdown wifi, connection will break');
    execSync('ifdown wlan0');
    execSync('ifup wlan0');
  });
  // app.get('/run/:app', () => {});
  // app.get('/config/passwd', () => {});
  // app.get('/reboot', () => {});

  return app;
}

module.exports = api;
