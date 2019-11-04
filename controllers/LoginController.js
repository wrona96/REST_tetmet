const Login = require('../models/Users');

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      err = new Error('USE POST to login.');
      reject(err);
    })
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      Login.findOne({'nickname': params['nickname']}).then(data => {
        if (data == null) {
          throw new Error('Wrong nickname or password.');
        }
        if (Login(data).auth(params.password)) {
          resolve(data._id.toString());
        } else {
          reject(new Error('Wrong password.'));
        }
      }).catch(err => {
        reject(err);
      })
    })
  }
}
