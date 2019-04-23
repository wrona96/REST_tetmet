const Users = require('../models/Users')

module.exports = {

  get: () => {
    return new Promise((resolve, reject) => {
      Users.find({}, {_id: 0}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getByName: (name) => {
    return new Promise((resolve, reject) => {
      Users.find({
        'nickname': new RegExp(name, 'i')
      }, {_id: 0}).then(data => {
        if (data == 0) {
          throw err
        } else {
          resolve(data)
        }
      }).catch(err => {
        reject(new Error('User ' + name + ' not found'))
      })
    })
  }/*,

  post: (params) => {
    return new Promise((resolve, reject) => {
      Users.create(params).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }*/

}
