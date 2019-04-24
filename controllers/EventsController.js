const Events = require('../models/Events')
const options = {
  runValidators: true
}

module.exports = {

  get: () => {
    return new Promise((resolve, reject) => {
      Events.find().then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  post: (params) => {
    return new Promise((resolve, reject) => {
      Events.create(params).then(data => {
        resolve('Succesfull registed.')
      }).catch(err => {
        reject(err)
      })
    })
  },

  put: (body) => {
    return new Promise((resolve, reject) => {
      id = body._id
      delete body._id
      Events.findByIdAndUpdate(id, body, options).then(data => {
        if (data == null) {
          throw new Error("Wrong ID.")
        }
        resolve("Event data updated.")
      }).catch(err => {
        reject(err)
      })
    })
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      Events.findByIdAndRemove(id).then(data => {
        if (data == null) {
          throw new Error("Wrong ID.")
        }
        resolve("Event removed.")
      }).catch(err => {
        reject(err)
      })
    })
  }
}
