var User = require('../models/user');
var config = require('../config/config');
<<<<<<< HEAD
var jwt = require('jsonwebtoken');
var config = require('../config/config');
=======
>>>>>>> f9e393666adacb400e872e97c8f1e7701d513526

var auth = {
  login: function(req, res) {   
    var userName = req.body.userName || '';
    var password = req.body.password || '';
    if (userName == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
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
<<<<<<< HEAD
        token: 'JWT ' + tokenDetail.token,
=======
        token: 'JWT ' + tokenDetail.token, 
        expires:tokenDetail.expires, 
>>>>>>> f9e393666adacb400e872e97c8f1e7701d513526
        userName:user.userName,
        fullName:user.fullName,
        address:user.address,
        contactNumber:user.contactNumber,
        emailAddress:user.emailAddress,
        status:user.status
      });
    }
    else {
      res.send({success: false, msg: 'Authentication failed. Wrong password.'});
    }
  });
},
   
validate: function(userName, password, cb) {
  User.findOne({userName: userName},function(err, user) {
    if (err) throw err;
    if (!user) {
      cb(null, null);
    }
    else {
      // check if password matches
      user.comparePassword(password, function (err, isMatch) {  
        if (isMatch && !err) {
<<<<<<< HEAD
          cb(user, genToken(user));
=======
          cb(user, genToken(user.userName));
>>>>>>> f9e393666adacb400e872e97c8f1e7701d513526
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
<<<<<<< HEAD
function genToken(user) {
  const token = jwt.sign(user.toJSON(),config.secret,{expiresIn: 3600});

  return {
    token: token
  };
}
=======
function genToken(userName) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    userName: userName
  }, config.secret);
  return {
    token: token,
    expires: expires
  };
}
   
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
>>>>>>> f9e393666adacb400e872e97c8f1e7701d513526
   
module.exports = auth;