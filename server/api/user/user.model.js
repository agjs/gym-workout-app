const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const userSchema = schema({

  username: {
    type: String,
  },
  password: {
    type: String,
  },

});

userSchema.methods.validPassword = function (password, callback) {
 bcrypt.compare(password, this.password, function(err, res) {
    if(err) {
      callback(new Error("Username and password do not match."), null);
    } else {
      callback(null, res);
    }
  });
};

module.exports = mongoose.model('User', userSchema);
