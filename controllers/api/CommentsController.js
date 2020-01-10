const Comments = require('../../models/Comments')


module.exports = {

  getByName: (name) => {
    return new Promise((resolve, reject) => {
      Comments.findOne({
        _id: name
      }).select('-_id').then(data => {
        resolve(data.comments.reverse().splice(0, 20))
      }).catch(err => {
        reject(err)
      })
    })
  },
  post: (params, userid) => {
    return new Promise((resolve, reject) => {
      params.creator = userid
      Comments.findById(params.chatID).then(data => {
        if (data == null) {
          reject('ChatID not Found')
        } else {
          add = JSON.parse(JSON.stringify(data));
          delete params.chatID;
          add.comments.push(params)
          Comments.findByIdAndUpdate(data, add).then(data => {
            resolve('good')
          }).catch(err => {
            reject(err)
          })
        }
      })
    })
  }
}
