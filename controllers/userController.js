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
        password: req.body.password,
        userType: req.body.userType,
        status:"Active"
      });
      User.createUser(newUser, function(err,userRes){
        if (err){
          throw err ;
        }
        res.json({success: true,user: userRes});
      })
    },

    findByName: function(req, res){
      var name = req.params.name; 
      User.findUserByName(name, function(err, userRes){
        if(err){
          throw err;
        }
        res.json(userRes);
      })
    },

    
    deleteFlag: function(req,res){
      var id = req.params.id;
      //var status = req.body;
      User.deleteUser(id, function(err,userRes){
        if (err){
          throw err ;
        }
        console.log("User has been deleted");

    resetUserPassword: function(req, res){
      var name = req.params.name;
      User.resetPassword(name,{}, function(err, userRes){
        if(err){
          throw err;
        }
        res.json(userRes);
      })
    }
}

module.exports = user;