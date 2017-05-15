const five = require('johnny-five');
const { EventEmitter } = require('events');

/**
 * Listens for the following events:
 * - press 3 times in row   -> launch web-services
 * - press 3 seconds        -> reboot in AP mode
 */
class Button extends EventEmitter {
  constructor(pin) {
    super();

    const button = new five.Button(pin);

    this._resetCounter = this._resetCounter.bind(this);
    this._onPress = this._onPress.bind(this);
    this._onRelease = this._onRelease.bind(this);

    this._pressTime = null;
    this._counter = 0;
    this._counterTimeout = null;

    button.on('press', this._onPress);
    button.on('release', this._onRelease);
    // button.on('hold', () => console.log('Button held'));
  }

  _resetCounter() {
    this._counter = 0;
  }

  _onPress() {
    this._pressTime = Date.now();
  }

  _onRelease() {
    const releaseTime = Date.now();
    const timePressed = (releaseTime - this._pressTime) / 1000;

    // 3 seconds press
    if (timePressed > 3) {
      this.emit('long-press');
    // 3 short press
    } else {
      clearTimeout(this._counterTimeout);
      // wait for a new click before reseting the counter
      this._counterTimeout = setTimeout(this._resetCounter, 2 * 1000);
      this._counter += 1;

      if (this._counter >= 3) {
        this._resetCounter();
        clearTimeout(this._counterTimeout);

        this.emit('short-presses');
      }
    }
  }
}

module.exports = Button;
