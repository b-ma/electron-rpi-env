const express = require('express');
const front = require('./front');
const api = require('./api');

// ftp
// [server] - https://github.com/nodeftpd/nodeftpd
// [client] - https://github.com/sergi/jsftp

const app = express();

// mount sub applications
app.use('/', front());
app.use('/api', api());

app.listen(80, () => console.log('App is running on port 80'))


// should export `start` and `stop` methods
