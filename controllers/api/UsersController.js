const Users = require('../../models/Users')
const options = {
  runValidators: true
}

module.exports = {

  get: (offset=null) => {
    return new Promise((resolve, reject) => {
      Users.find().sort({'_id' : 'desc'}).skip(10 * offset).limit(offset == null ? null : 10).then(data => {
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
        }
        resolve(data)
      }).catch(err => {
        reject(new Error('User ' + name + ' not found'))
      })
    })
  },

  getById: (id) => {
    return new Promise((resolve, reject) => {
      Users.find({
        '_id': id
      }, {_id: 0}).then(data => {
        if (data == 0) {
          throw err
        }
        resolve(data)
      }).catch(err => {
        reject(new Error('User not found'))
      })
    })
  },

  put: (body) => {
    return new Promise((resolve, reject) => {
      id = body._id
      delete body._id
      Users.findByIdAndUpdate(id, body, options).then(data => {
        if (data == null) {
          throw new Error("Wrong ID.")
        }
        resolve("User data updated.")
      }).catch(err => {
        reject(err)
      })
    })
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      Users.findByIdAndRemove(id).then(data => {
        if (data == null) {
          throw new Error("Wrong ID.")
        }
        resolve("User removed.")
      }).catch(err => {
        reject(err)
      })
    })
  }

}
