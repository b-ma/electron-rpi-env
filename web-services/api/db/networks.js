const db = require('./db');

const networks = {
  all() {
    return new Promise((resolve, reject) => {
      db.all('SELECT rowid, * FROM networks', function(err, rows) {
        if (err)
          throw err;

        resolve(rows);
      });
    });
  },

  get(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT rowid, * FROM networks WHERE rowid = $id`, {
        $id: id
      }, function(err, row) {
        if (err)
          throw err;

        resolve(row);
      });
    });
  },

  create(data) {
    return new Promise((resolve, reject) => {
      db.run(`
        INSERT INTO networks (
          SSID,
          key_mgmt,
          passwd,
          type,
          address,
          netmask,
          gateway
        )
        VALUES
        (
          $SSID,
          $key_mgmt,
          $passwd,
          $type,
          $address,
          $netmask,
          $gateway
        )
      `, {
        $SSID: data.SSID,
        $key_mgmt: data.key_mgmt,
        $passwd: data.passwd,
        $type: data.type,
        $address: data.address,
        $netmask: data.netmask,
        $gateway: data.gateway,
      }, function(err) {
        if (err)
          throw err;

        resolve(this.lastID);
      });
    });
  },

  update(data) {
    return new Promise((resolve, reject) => {
      db.run(`
        UPDATE networks SET
          SSID = $SSID,
          key_mgmt = $key_mgmt,
          passwd = $passwd,
          type = $type,
          address = $address,
          netmask = $netmask,
          gateway = $gateway
        WHERE rowid = $rowid
      `, {
        $SSID: data.SSID,
        $key_mgmt: data.key_mgmt,
        $passwd: data.passwd,
        $type: data.type,
        $address: data.address,
        $netmask: data.netmask,
        $gateway: data.gateway,
        $rowid: data.rowid,
      }, (err) => {
        if (err)
          throw err;

        resolve();
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM networks WHERE rowid = $id`, {
        $id: id
      }, (err) => {
        if (err)
          throw err;

        resolve();
      });
    });
  },
};

module.exports = networks;
