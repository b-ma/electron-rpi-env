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


## REST API

- GET     /db/network
- GET     /db/network/:id
- POST    /db/network
- PUT     /db/network/:id
- DELETE  /db/network/:id
- POST    /config/network

## TABLES

networks  
SSID, passwd, type (static, dhcp), ip, netwask, gateway
