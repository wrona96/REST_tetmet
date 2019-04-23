const Register = require('../models/Users')

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
        err=new Error('USE POST to log in. Send json with {"nickname": wrona , "password": md5(test) }')
        reject(err)
    })
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      Register.findOne({'nickname': params['nickname']}).select('-_id -reg_time +password -type -reg_time').then(data => {
        if(data.nickname == params.nickname && data.password == params.password)
        {
          resolve('Succesfull login.')
        }
        else{
          err=new Error('Wrong password.')
          reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}
