var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/config');
var auth = {
 
    login: function(req, res) {
   
      var username = req.body.username || '';
      var password = req.body.password || '';
   
      if (username == '' || password == '') {
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid credentials"
        });
        return;
      }
   
      // Fire a query to your DB and check if the credentials are valid
      var dbUserObj = auth.validate(username, password, function(user, tokenDetail){
        if(!user) {
          res.send({success: false, msg: 'Authentication failed. user is not found.'});
        }
        else if(tokenDetail) {
          res.json({success: true, token: 'JWT ' + tokenDetail.token, expires:tokenDetail.expires});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
   
    },
   
    validate: function(username, password, cb) {
        User.findOne({name: username}, function(err, user) {
            if (err) throw err;
            if (!user) {
              cb(null, null);
            } 
            else {
              // check if password matches
              user.comparePassword(password, function (err, isMatch) {
                if (isMatch && !err) {
                  cb(user, genToken(user.name));
                } 
                else {
                  cb(user, null);
                }
              });
            }
            });
    },
    validateUser: function(username) {
      User.findOne({name: req.body.name}, function(err, user) {
        if(err) throw err;
        if(!user) {
          return null;
        }
        return user;
      });
    }
  }
   
  // private method
  function genToken(username) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
      exp: expires,
      username: username
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
   
module.exports = auth;