const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');

//Init
const secure = express();
secure.use(helmet())
secure.disable('x-powered-by');
secure.use(timeout('15s'));
secure.set('view engine', 'pug');
secure.use(express.static(__dirname + '/public'));
secure.use(bodyParser.json({ type: 'application/json' }))

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
