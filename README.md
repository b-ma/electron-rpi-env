# System

## File system

/system
  bootstrap.js
  /data
  /hardware
  /web
    server.js
    /api
    /frontend

## Install

- on local machine (development machine) run:
`npm install --only=dev`

- on remote machines (raspberry pi) run:
`npm install --only=prod`


## Web

- Configuration from REST API and Front-end
  + reboot
  + CRUD on WiFi configurations
  + choose WiFI

    wpa_supplicant
    # database (flat files as a starting point)
    - list of known WiFi (wiht priorities)
    - current WiFi
    - compare known WiFi with known ones and connect

    https://raspberrypi.stackexchange.com/questions/37920/how-do-i-set-up-networking-wifi-static-ip-address/37921#37921

  + start / stop an applications
  + launch application in development mode
  + connect to another WiFi (require reboot ?)

