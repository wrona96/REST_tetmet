const Router = require('router');
const router = Router();
const controllers = require('../controllers/api')

// GET - dump db data:
router.get('/join/:eventid', (req, res) => {
  const eventid = req.params.eventid
  const userid = req.headers.userId

  controllers['event'].join(eventid, userid).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

router.get('/leave/:eventid', (req, res) => {
  const eventid = req.params.eventid
  const userid = req.headers.userId

  controllers['event'].leave(eventid, userid).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

router.get('/myevents', (req, res) => {
  const userid = req.headers.userId

  controllers['event'].myevents(userid).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

router.get('/me', (req, res) => {
  const userid = req.headers.userId

  controllers['user'].getById(userid).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

router.get('/:resource', (req, res) => {
  const resource = req.params.resource
  const controller = controllers[resource]
  const offset = req.query.offset

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  controller.get(offset).then(data => {
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
router.delete('/:resource/:id', (req, res) => {
  const resource = req.params.resource
  const id = req.params.id
  const controller = controllers[resource]

  if (controller == null) {
    res.status(404).render('404', {title: '404: Page Not Found'});
    return
  }

  console.error("delete in : /", resource, "/", id);
  controller.delete(id).then(data => {
    res.json({confirmation: 'success', data: data})
  }).catch(err => {
    res.json({confirmation: 'fail', message: err.message})
  })
})

module.exports = router
