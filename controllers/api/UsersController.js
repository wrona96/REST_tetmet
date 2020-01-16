const Users = require('../../models/Users')
const options = {
  runValidators: true,
  setDefaultsOnInsert: true,
  context: 'query'
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

  getByName: (name, exact=0) => {
    return new Promise((resolve, reject) => {
      if(exact == 1){
        selector = {'_id' : name}
      }
      else{
        selector = {'nickname' : new RegExp(name, 'i')}
      }
      Users.find(selector).then(data => {
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
      }).then(data => {
        if (data == 0) {
          throw err
        }
        resolve(data)
      }).catch(err => {
        reject(new Error('User not found'))
      })
    })
  },

  put: (body, userId) => {
    return new Promise((resolve, reject) => {
      delete body.hash_password
      delete body.type
      delete body.nickname
      Users.findByIdAndUpdate(userId, body, options).then(data => {
        if (data == null) {
          throw new Error("Wrong ID.")
        }
        resolve("User data updated.")
      }).catch(err => {
        reject(err)
      })
    })
  },

  changePassword: (body, userId) => {
    return new Promise((resolve, reject) => {
      if (body.oldPass == null || body.newPass == null || body.oldPass == body.newPass ){
        throw new Error("No Params or password the same")
      }
      else {
        Users.findById(userId).select('+salt +hash_password').then(data => {
          if (data == null) {
            throw new Error("Wrong ID.")
          }
          if (data.auth(body.oldPass)) {
            data.password = body.newPass
          }
          else {
            throw new Error("Wrong Password")
          }
          data.save().then(data => {
              resolve('Password has been changed')
          }).catch(err => {
            reject(err)
          })

        }).catch(err => {
          reject(err)
        })
      }
    })
  },

  delete: (id, uID) => {
    return new Promise((resolve, reject) => {
      Users.findByIdAndRemove(uID).then(data => {
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
