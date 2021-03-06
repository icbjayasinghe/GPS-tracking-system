var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var jwtDecode = require('jwt-decode');
const timestamp = require('unix-timestamp');
var auth = {
  login: function(req, res) {   
    var userName = req.body.userName || '';
    var password = req.body.password || '';
    if (userName === '' || password === '') {
      res.send({
          success: false,
        status: 401,
        msg: "Invalid credentials"
      });
    return;
  }
  // Fire a query to your DB and check if the credentials are valid
  var dbUserObj = auth.validate(userName, password, function(user, tokenDetail){
    if(!user) {
      res.send({success: false, msg: 'Authentication failed. user is not found.'});
    }
    else if(tokenDetail) {
      res.json({
        success: true, 
        token: 'JWT ' + tokenDetail.token,
          _id: user._id,
        userName:user.userName,
        fullName:user.fullName,
        address:user.address,
        contactNumber:user.contactNumber,
        emailAddress:user.emailAddress,
        status:user.status,
          role: user.roles
      });
    }
    else {
      res.send({success: false, msg: 'Authentication failed. Wrong password.'});
    }
  });
},
   
validate: function(userName, password, cb) {
  User.findOne({userName: userName, status: 'Active'},function(err, user) {
    if (err) throw err;
    if (!user) {
      cb(null, null);
    }
    else {
      // check if password matches
      user.comparePassword(password, function (err, isMatch) {  
        if (isMatch && !err) {
          cb(user, genToken(user));
        } 
        else {
          cb(user, null);
        }
      });
    }
  });
},

validateUser: function(userName) {
  User.findOne({userName: req.body.name}, function(err, user) {
    if(err) throw err;
      if(!user) {
        return null;
        }
      return user;
    });
  }
}
   
// private method
function genToken(user) {
  const token = jwt.sign(user.toJSON(),config.secret,{expiresIn: 3600});
   let userId = jwtDecode(token)._id;
    let loggingTime = timestamp.toDate(jwtDecode(token).iat);
    let activity = {
        loggingTime: loggingTime
    };
    User.updateMany({'_id': userId}, {'$push': { logDetails : activity }}, function (err) {
        if (err) {
            console.log(err);
        }
    });
  return {
    token: token
  };
}
   
module.exports = auth;
