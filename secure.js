const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
const favicon = require('serve-favicon');
const morganbody = require('morgan-body');

//Init
const secure = express();
secure.use(helmet());
secure.disable('x-powered-by');
secure.use(timeout('15s'));
secure.set('view engine', 'pug');
secure.use(express.static(__dirname + '/public'));
secure.use(favicon(__dirname + '/public/images/favicon.ico'));
secure.use(bodyParser.json({ type: 'application/json' }));
secure.use(cookieParser());

options = {
  noColors: true,
  maxBodyLength: 500,
  prettify: false,
  logReqDateTime: true,
  dateTimeFormat: 'clf',
  logReqUserAgent: false,
  logRequestBody: true,
  logResponseBody: false,
  stream: { write: (msg) => console.log(msg) }
}
morganbody(secure, options)
//redirect all to https
/*secure.use ((req, res, next) => {
	if (req.secure) {
		next();
	} else {
		res.redirect('https://' + req.headers.host + req.url);
	}
});
*/
module.exports = secure
