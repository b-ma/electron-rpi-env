const fs = require('fs');

const interfacesDHCP = `
auto wlan0

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet dhcp
wireless-power off
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

iface default inet dhcp
`;

const interfacesStatic = `
auto wlan0

auto lo
iface lo inet loopback

auto eth0
iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet static
wireless-power off
address [ADDRESS]
netmask [NETMASK]
gateway [GATEWAY]
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

iface default inet dhcp
`;

const openWifi = `
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="[SSID]"
    scan_ssid=1
    key_mgmt=NONE
}
`;

const wepWifi = `
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="[SSID]"
    scan_ssid=1
    key_mgmt=NONE
    wep_key0="[PASSWD]"
}
`;

const wpaWifi = `
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="[SSID]"
    scan_ssid=1
    key_mgmt=WPA-PSK
    psk="[PASSWD]"
}
`;

function configure(item) {
  // /etc/network/interfaces
  let iface = '';

  if (item.type === 'static') {
    iface = interfacesStatic
      .replace('[ADDRESS]', item.address)
      .replace('[NETMASK]', item.netmask)
      .replace('[GATEWAY]', item.gateway);
  } else {
    iface = interfacesDHCP;
  }

  // /etc/wpa_supplicant/wpa_supplicant.conf
  let wpaSupplicant = '';

  if (item.key_mgmt === 'NONE')
    wpaSupplicant = openWifi;
  else if (item.key_mgmt === 'WEP')
    wpaSupplicant = wepWifi;
  else if (item.key_mgmt === 'WPA/WPA2')
    wpaSupplicant = wpaWifi;

  wpaSupplicant = wpaSupplicant
    .replace('[SSID]', item.SSID)
    .replace('[PASSWD]', item.passwd);

  fs.writeFileSync('/etc/network/interfaces', iface);
  fs.writeFileSync('/etc/wpa_supplicant/wpa_supplicant.conf', wpaSupplicant);

  return Promise.resolve();
}

module.exports = configure;
