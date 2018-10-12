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
      password: req.body.password,
      role: req.body.role,
      location: [],
    });
    console.log(newUser);
    User.createUser(newUser, function(err,userRes){
      if (err){
        res.json({success: false, msg: err});
      }
      res.json({success: true,user: userRes});
      res.status(200).json(SUCCESS_RESPONCE.success("123"))
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
    var id = req.params.id;
    User.resetStatus(id,{}, function(err, userRes){
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
    var name = req.body.name;
    var type = req.body.type;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    location = {name:name,type:type,latitude:latitude,longitude:longitude};
    console.log(location);
    User.updateMany({'userName': userName}, {'$push': { location : location.JSON }}, function (err) {
      if (err) {
          throw err;
      } else {
          res.json({ success: true, message: "successfully added location" });
      }
    });
  }
}

module.exports = user;