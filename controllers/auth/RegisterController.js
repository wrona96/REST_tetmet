const Register = require('../../models/Users');

module.exports = {
  get: () => {
    return new Promise((resolve, reject) => {
      err = new Error('USE POST to register.');
      reject(err);
    })
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      delete params.reg_time;
      delete params._id;
      Register.create(params).then(data => {
        resolve('Succesfull registed.');
      }).catch(err => {
        reject(err);
      })
    })
  }
}
