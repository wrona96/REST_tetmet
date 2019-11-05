const Login = require('../../models/Users');
const jwt = require('jsonwebtoken');
module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      err = new Error('USE POST to login.');
      reject(err);
    })
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      Login.findOne({'nickname': params['nickname']},{salt: 1, hash_password: 1}).then(data => {
        if (data == null) {
          throw new Error('Wrong nickname or password.');
        }
        if (Login(data).auth(params.password)) {
          var token = jwt.sign({ _id: data._id, nickname: data.nickname }, process.env.JWT || 'TESTOWANIE', {
            expiresIn: 1000 * 60 * 60 * 24 // expires in 24 hours
          }, function (err, token) {
              if(err){
                throw err;
              } else {
                resolve(token);
              }
          });
        } else {
          reject(new Error('Wrong password.'));
        }
      }).catch(err => {
        reject(err);
      })
    })
  }
}
