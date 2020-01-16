const Router = require('router');
const jwt = require('jsonwebtoken')
const router = Router();

router.get('/', (req, res) => {
	res.status(200).render('index', {title: 'Front Page'});
})

router.get('/robots.txt', function (req, res) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
});

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		data: 'this is a sample json route.'
	})
})


module.exports = router
