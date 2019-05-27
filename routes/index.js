const Router = require('router');

const router = Router();

router.get('/', (req, res) => {
	res.status(200).render('index', {title: 'Front Page'});
})

router.get('/cookie/:id',(req, res) => {
		const uid = req.params.id
		res.cookie('uID', uid, {maxAge: 1000 * 60 * 60, path: '/api', httpOnly: true})
		res.status(200).json({
			confirmation: 'success',
			data: 'Cookie was set to new value :)'
		})
})

/*  This route render json data */
router.get('/json', (req, res) => {
	res.json({
		confirmation: 'success',
		data: 'this is a sample json route.'
	})
})


module.exports = router
