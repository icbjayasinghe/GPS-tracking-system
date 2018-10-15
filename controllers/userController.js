var User  = require('../models/user.js');

var user = {
  addUser: function(req, res) {
    console.log('hi');
    var newUser = new User({
      fullName: req.body.fullName,
      address: req.body.address,
      contactNumber: req.body.contactNumber,
      emailAddress: req.body.emailAddress,
      userName: req.body.userName,
      password: req.body.userName,
      role: req.body.role,
      location: [],
      status:"Active"
    });
    console.log(newUser);
    User.createUser(newUser, function(err,userRes){
      if (err){
        res.json({success: false, msg: err});
      }
      res.json({success: true,user: userRes});
    })
  },
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
  findByName: function(req, res){
    var userName = req.params.userName; 
    User.findUserByName(userName, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  resetUserPassword: function(req, res){
    var userName = req.params.userName;
    User.resetPassword(userName,{}, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  deleteFlag: function(req, res){
    var userName = req.params.userName;
    User.resetStatus(userName,{}, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  changeUserPassword: function(req, res){
    var userName = req.params.userName;
    var pw = req.body.password;
    User.changePassword(userName, pw, function(err, userRes){
      if(err){
        res.json({success: false, msg: err});
      }
      res.json(userRes);
    })
  },
  addLocation: function(req,res){
    var userName = req.params.userName;
    let location = {
      name:req.body.name,
      type:req.body.type,
      latitude:req.body.latitude,
      longitude:req.body.longitude
    };
    console.log(location);
    User.updateMany({'userName': userName}, {'$push': { location : location }}, function (err) {
      if (err) {
          throw err;
      } else {
          res.json({ success: true, message: "successfully added location" });
      }
    });
  },
  viewLocation: function(req, res){
    var userName = req.params.userName;
    var location=[];
    User.viewAllLocation(userName, function(err,locationRes){
      if (err){
        throw err;
      } else {
        res.json(locationRes);
      }
    })
  }
}

module.exports = user;