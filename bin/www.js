const app = require('../app')
//const https = require('https');
const http = require('http');
//const fs = require('fs-extra');

/*
const cert = {
  key: fs.readFileSync('bin/privatekey.pem'),
  cert: fs.readFileSync('bin/certificate.pem'),
  requestCert: false,
  rejectUnauthorized: true
};
*/


var server = http.createServer(app).listen(process.env.PORT||80);
//var sserver = https.createServer(cert, app).listen(4444);
