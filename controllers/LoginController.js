const Login = require('../models/Users')

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
        err=new Error('USE POST to log in. Send json with {"nickname": wrona , "password": md5(test) }')
        reject(err)
    })
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      Login.findOne({'nickname': params['nickname']}).select('+_id -reg_time +password -type -reg_time').then(data => {
        if(data == null){
          throw new Error('Wrong password.')
        }
        if(data.nickname == params.nickname && data.password == params.password)
        {
          resolve(data._id.toString())
        }
        else{
          throw new Error('Wrong password.')
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
