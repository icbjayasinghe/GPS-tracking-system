var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var UserSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    contactNumber:{
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true
    },
	userName:{
        type: String,
        unique: true,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user']
    },
    location:[{
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        }
    }],
    status:{
        type: String,
		require: true
    }
});

var User = module.exports = mongoose.model('User',UserSchema);

//Add User
module.exports.createUser = function(user, callback){
	user.save(callback);
}
//Get User
module.exports.getUsers = function(callback, limit){
	User.find(callback).limit(limit);
}
//Get User 
module.exports.getUser = function(_id, callback){
	User.findById(_id, callback);
}
//find user by name
module.exports.findUserByName = function(userName, callback){
    User.find({userName:userName}, callback); 
}
//delete user by flag
module.exports.resetStatus = function(userName,options,callback){
    quary = {userName:userName};
    var update = { status: 'Deleted'}
    User.findOneAndUpdate(quary, update, options, callback);  
}
//reset password
module.exports.resetPassword = function(userName,options,callback){
    quary = {userName:userName};
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            throw err;
        }
        bcrypt.hash(userName, salt, function (err, hash) {
            if (err) {
                throw err;
            }
            pw = hash;
            var update = { password: pw}
            User.findOneAndUpdate(quary, update, options, callback);
        });
    });    
}
//change password
module.exports.changePassword = function(userName, pw, callback){
    quary = { userName:userName };
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            throw err;
        }
        bcrypt.hash(pw, salt, function (err, hash) {
            if (err) {
                throw err;
            }
            hpw = hash;
            var update = { password: hpw}
            User.findOneAndUpdate(quary, update, callback);
        });
    }); 
}
//view location
module.exports.viewAllLocation = function(userName, callback){
    quary = { userName:userName};
    User.findOne(quary,{ location: 1 }, callback);
}

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                console.log('all hash done');
                next();
            });
        });
    } 
    else {
        return next();
    }
});
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        //give it to callback function of cb(in server.js)
        cb(null, isMatch);
    });
};




