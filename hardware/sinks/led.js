const five = require('johnny-five');

// raspi-io
// [pins] - https://github.com/nebrius/raspi-io/wiki/Pin-Information#model-abraspberry-pi-2raspberry-pi-3raspberry-pi-zero

module.exports.strobe = function(pin, interval) {
  const led = new five.Led(pin);
  led.strobe(interval);
}
