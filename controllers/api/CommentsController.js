const Comments = require('../../models/Comments')


module.exports = {

  get: () => {
    return new Promise((resolve, reject) => {
      throw new Error("Wrong endpoint")
    })
  },
  getByName: (name, offset=null) => {
    return new Promise((resolve, reject) => {
      Comments.findOne({
        _id: name
      }).select('-_id').then(data => {
        if (data == null) {
        throw new Error("ChatID not Found")
      } else {
        offset != null ?
        resolve(data.comments.reverse().splice(0 + (10*offset), 10*(offset+1)))
        : resolve({'length': data.comments.length});
      }
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
