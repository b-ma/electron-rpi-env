# Full env

- `.local` contains the local scripts for remote developpement
- `apps` user defined applications
- `boot` scripts to execute when the system boots
- `hardware` gpio interfaces
- `web-services` REST API and client interface for high-level configuration and controls.


# install

- on local machine (development machine) run:
`npm install --only=dev`

- on remote machines (raspberry pi) run:
`npm install --only=prod`

# harware

must be executed as sudo



## NEXT STEP

- when pressed 3 seconds
  + configure as wifi access point, 
  + run web services (rest API)
- when pressed 3 times
  + run web services

/config/network
- WiFi SSID / password (store all configs)
- user password
- static / dynamic ip

2 components:
- hardware monitor (buttons, volume wheel) component
- configuration rest server

PIN numbers
- https://github.com/nebrius/raspi-io/wiki/Pin-Information#model-abraspberry-pi-2raspberry-pi-3raspberry-pi-zero

## API


GET     /db/network
GET     /db/network/:id
POST    /db/network
PUT     /db/network/:id
DELETE  /db/network/:id


POST    /config/network
=> execute selected

## TABLES

network
SSID, passwd, type (static, dhcp), ip, netwask, gateway
