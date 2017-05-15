const bootstrap = require('./bootstrap');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, 'data');
const db = new sqlite3.Database(dbPath);

// create tables if not already existing
bootstrap(db);

module.exports = db;
