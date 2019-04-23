const Router = require('router');
const router = Router();
const controllers = require('../controllers')

// GET, POST, PUT, DELETE
router.get('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  const filters = req.query

  if (controller == null) {
    //res.json({confirmation: 'fail', message: 'Invalid Resource'})
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  controller.get(filters).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

router.get('/:resource/:name', (req, res) => {
  const resource = req.params.resource
  const name = req.params.name
  const controller = controllers[resource]
  if (controller == null) {
    res.json({confirmation: 'fail', message: 'Invalid Resource'})
    return
  }
  if (name === null || name === "null" || name.length <= 2) {
    res.json({confirmation: 'fail', message: 'Need more info'})
    return
  }

  controller.getByName(name).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

// POST - create new entities:
router.post('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null) {
    res.json({confirmation: 'fail', message: 'Invalid Resource'})

    return
  }
  console.error(req.body);
  controller.post(req.body).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

module.exports = router
