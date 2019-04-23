const Events = require('../models/Events')

module.exports = {

  get: () => {
    return new Promise((resolve, reject) => {
      Events.find({},{ _id: 0 }).then(data => {
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
  }
}
