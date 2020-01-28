const Comments = require('../../models/Comments')
const Events = require('../../models/Events')

module.exports = {

  get: () => {
    return new Promise((resolve, reject) => {
      throw new Error("Wrong endpoint")
    })
  },
  getByName: (name, offset=null) => {
    return new Promise((resolve, reject) => {
      Events.findOne({
        _id: name
      }).select('+chatID').then(data => {
        if(data == null) {
          throw new Error("ChatID not Found")
        } else {
          Comments.findOne({_id: data.chatID}).then(chat => {
            if(chat == null) {
              throw new Error("ChatID not Found")
            } else {
              offset != null ?
              resolve(chat.comments.reverse().splice(0 + (20*offset), 20*(offset+1)))
              : resolve({'length': chat.comments.length});
            }
          }).catch(err => {
            reject(err)
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  post: (params, userid) => {
    return new Promise((resolve, reject) => {
      Events.findOne({
        _id: params.eventID
      }).then(data => {
        if(data == null || data.members.indexOf(userid) == -1) {
          throw new Error('You no have permission to add comment at this event.')
        } else {
          Comments.findById(data.chatID).then(chat => {
            if(chat == null) {
              throw new Error('ChatID not Found.')
            } else {
              add = JSON.parse(JSON.stringify(chat));
              params.creator = userid
              add.comments.push(params)
              Comments.findByIdAndUpdate(data.chatID, add).then(confirm => {
                resolve('good')
              }).catch(err => {
                reject(err)
              })
            }
          }).catch(err => {
            reject(err)
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
