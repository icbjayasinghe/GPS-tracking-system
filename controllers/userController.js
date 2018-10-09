var User  = require('../models/user.js');

var user = {
  getAll: function(req, res) {
    User.getUsers(function(err,userRes){
      if (err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  getOne: function(req, res) {
    var id = req.params.id;
    User.getUser(id, function(err,userRes){
      if (err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  addUser: function(req, res) {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password,
      userType: req.body.userType,
      status: req.body.status
    });
    User.createUser(newUser, function(err,userRes){
      if (err){
        res.json({success: false, msg: err});
      }
      res.json({success: true,user: userRes});
      res.status(200).json(SUCCESS_RESPONCE.success("123"))
    })
  },
  findByName: function(req, res){
    var name = req.params.name; 
    User.findUserByName(name, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  deleteFlag: function(req,res){
    var id = req.params.id;
    //var status = req.body;
    User.deleteUser(id, function(err){
      if (err){
        res.json({success: false, msg: err});
      }
    })
  },
  resetUserPassword: function(req, res){
    var name = req.params.name;
    User.resetPassword(name,{}, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  changeUserPassword: function(req, res){
    var name = req.params.name;
    var pass = req.body.password;
    User.changePassword(name, pass, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  }
}

module.exports = user;