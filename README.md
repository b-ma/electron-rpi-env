# System

## File system

```
/system
  bootstrap.js
  /boot (?)
  /data
  /hardware
  /web
    server.js
    /api
    /frontend
```

## Install

- on local machine (development machine) run: `npm install --only=dev`
- on remote machines (raspberry pi) run: `npm install --only=prod`


## Web

_commands and configs from REST API and Front-end_

- reboot
- CRUD on WiFi configurations
- choose WiFI (cf [https://raspberrypi.stackexchange.com/questions/37920/how-do-i-set-up-networking-wifi-static-ip-address/37921#37921](https://raspberrypi.stackexchange.com/questions/37920/how-do-i-set-up-networking-wifi-static-ip-address/37921#37921))
  + list of known WiFi (wiht priorities)
  + current WiFi
  + compare known WiFi with known ones and connect
- start / stop an applications
- launch application in development mode
- connect to another WiFi (require reboot ?)

