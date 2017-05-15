const raspi = require('raspi-io');
const five = require('johnny-five');

// inputs
const Button = require('./sources/button');
// outputs
const Led = require('./sinks/led');

const hardware = {
  init() {
    return new Promise((resolve, reject) => {
      const board = new five.Board({
        io: new raspi(),
      });

      this.sources = {};
      this.sinks = {};

      board.on('ready', () => {
        this._initSources();
        this._initSinks();

        resolve();
      });
    });
  },

  _initSources() {
    this.sources.button = new Button('P1-7');
  },

  _initSinks() {

  },
};

module.exports = hardware;
