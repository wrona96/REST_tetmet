const Router = require('router');
const router = Router();
const controllers = require('../controllers')

// GET - dump db data:
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

router.get('/:resource/:name', (req, res) => {
  const resource = req.params.resource
  const name = req.params.name
  const controller = controllers[resource]

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
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
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  console.error(req.body);
  controller.post(req.body).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

// PUT - update entities:
router.put('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  console.error("PUT in : /", resource, "\nBODY: \n", req.body);
  controller.put(req.body).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

// DELETE - delete entities:
router.delete('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  console.error("DELETE in : /", resource, "\nBODY: \n", req.body);
  controller.delete(req.body).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

module.exports = router
