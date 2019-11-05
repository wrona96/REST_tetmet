const Events = require('../../models/Events')
const Users = require('../../models/Users')

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
  },

  join: (eID, uID) => {
    return new Promise((resolve, reject) => {
      Events.findOne({_id: eID},{}).select('-_id -start_time -describe -tags -location').then(data => {
        if (data == null){
          throw new Error('Wrong event id.')
        }
        if (data.members.indexOf(uID) == -1){
          data.members.push(uID)
          Events.findOneAndUpdate({_id: eID},{members: data.members}).then()
          resolve('Added to event.')
        }
        throw new Error('Only one ticket per person.')
      }).catch(err => {
        reject(err)
      })
    })
  },

  leave: (eID, uID) => {
    return new Promise((resolve, reject) => {
      Events.findOne({_id: eID},{}).select('-_id -start_time -describe -tags -location').then(data => {
        if (data == null){
          throw new Error('Wrong event id.')
        }
        let index = data.members.indexOf(uID)
        if (index > -1){
          data.members.splice(index, 1)
          Events.findOneAndUpdate({_id: eID},{members: data.members}).then()
          resolve('Remove from event.')
        }
        throw new Error('You are not member at this event.')
      }).catch(err => {
        reject(err)
      })
    })
  },

  getByName: (eID) => {
      return new Promise((resolve, reject) => {
        Events.findOne({_id: eID}, {}).then(data => {
          if (data == null){
            throw new Error('Wrong event id.')
          }
          Users.find({_id: data.members}).then(users => {
            data = JSON.parse(JSON.stringify(data));
            data.nicknames = []
            users.forEach(user => {
              data.nicknames.push(user.nickname)
            })
            delete data.members
            resolve(data)
          })
        })
      }).catch(err => {
        reject(err)
      })
  },

  myevents: (uID) => {
    return new Promise((resolve, reject) => {
      Events.find({members: uID},{}).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
