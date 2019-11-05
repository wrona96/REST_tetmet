const Router = require('router');
const router = Router();
const controllers = require('../controllers/auth')

router.get('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  const filters = req.query

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  controller.get(filters).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

router.post('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  controller.post(req.body).then(data => {
    if (resource == 'login'){
      res.cookie('uID', data, {maxAge: 1000 * 60 * 60 * 24, path: '/api', httpOnly: true})
    }
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

module.exports = router
