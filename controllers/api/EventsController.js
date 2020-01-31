const Events = require('../../models/Events')
const Users = require('../../models/Users')
const Comments = require('../../models/Comments')

const options = {
  runValidators: true,
  setDefaultsOnInsert: true,
  context: 'query'
}

module.exports = {

  get: (offset=null) => {
    return new Promise((resolve, reject) => {
      Events.find().sort({'_id' : 'desc'}).skip(10 * offset).limit(offset == null ? null : 10).then(data => {
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  post: (params, userid) => {
    return new Promise((resolve, reject) => {
      params.owner = userid
      params.members = [userid]
      delete params._id
      Comments.create({comments: []}).then(data => {
        console.log(data)
        params.chatID = data._id;
        Events.create(params).then(data => {
          console.log(data)
          resolve('Succesfull registed.')
        }).catch(err => {
          reject(err)
        })
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

  delete: (eID, uID) => {
    return new Promise((resolve, reject) => {

      Events.findById(eID).then(data => {
        if (data == null) {
          throw new Error("Wrong ID.")
        }
        if (data.isOwner(uID)) {
          data.remove()
          resolve("Event removed.")
        }
        throw new Error("You are not owner.")
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

  leave: (eID, uID, uLogin) => {
    return new Promise((resolve, reject) => {
      Events.findOne({_id: eID},{}).select('-_id -start_time -describe -tags -location').then(data => {
        if (data == null){
          throw new Error('Wrong event id.')
        }
        if (data.members.indexOf(uID) > -1 && !data.isOwner(uID)){
          data.members.splice(data.members.indexOf(uID), 1)
          if (data.nickholder != [] && data.nickholder.find(ele => ele._id == uID) == undefined){
            data.nickholder.push({_id: uID, nickname: uLogin})
          }
          Events.findOneAndUpdate({_id: eID},{members: data.members, nickholder: data.nickholder}).then()
          resolve('Remove from event.')
        } else {
          throw new Error('You are not member at this event or you are owner.')
        }
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
          Users.find({_id: data.members}).select('nickname').then(users => {
            data = JSON.parse(JSON.stringify(data));
            data.members = []
            users.forEach(user => {
                data.members.push(user)
            })
            resolve(data)
          })
        }).catch(err => {
          reject(err)
        })
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
