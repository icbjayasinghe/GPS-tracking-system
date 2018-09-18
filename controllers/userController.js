var User  = require('../models/user.js');

var user = {
 
    getAll: function(req, res) {
      User.getUsers(function(err,userRes){
        if (err){
          throw err ;
        }
        res.json(userRes);
      })
    },
   
    getOne: function(req, res) {
      var id = req.params.id;
      User.getUser(id, function(err,userRes){
        if (err){
          throw err ;
        }
        res.json(userRes);
      })
    },
   
    register: function(req, res) {
      var newUser = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      });
      User.createUser(newUser, function(err,userRes){
        if (err){
          throw err ;
        }
        res.json({success: true,user: userRes});
      })
    }
}

module.exports = user;