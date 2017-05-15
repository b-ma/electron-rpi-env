const CREATE_NETWORKS_TABLE = `
  CREATE TABLE IF NOT EXISTS networks (
    SSID TEXT,
    key_mgmt TEXT,
    passwd TEXT,
    type TEXT,
    address TEXT,
    netmask TEXT,
    gateway TEXT
  );
`;

function bootstrap(db) {
  db.serialize(() => {
    // db.run('DROP TABLE IF EXISTS networks');
    db.run(CREATE_NETWORKS_TABLE);

    // const stmt = db.prepare("INSERT INTO networks VALUES (?, ?, ?, ?, '', '', '')");
    // for (let i = 0; i < 3; i++) {
    //   const ssid = 'ssid-' + i;
    //   const keyMgmt = 'OPEN';
    //   const pass = 'passwd-' + i;
    //   const type = 'static'
    //   stmt.run(ssid, keyMgmt, pass, type);
    // }
    // stmt.finalize();



  });
}

module.exports = bootstrap;
