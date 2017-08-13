const hardware = require('../hardware');

let DEV_MODE = false;

hardware
  .init()
  .then(() => {
    hardware.sources.button.on('long-press', () => {
      console.log('reboot in WiFi AP mode');
    });

    hardware.sources.button.on('short-presses', () => {
      DEV_MODE = !DEV_MODE;
      console.log('DEV_MODE', DEV_MODE);

      if (DEV_MODE)
        console.log('launch dev services (REST API, ftp server)');
      else
        console.log('stop dev services (REST API, ftp server)');
    });
  });
