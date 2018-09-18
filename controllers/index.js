var express = require('express');
var router = express.Router();
var user  = require('./userController.js');
var auth = require('./auth.js');

router.post('/login', auth.login);
router.post('/signup', user.register);
router.get('/api/v1/users', user.getAll);
router.get('/api/v1/user/:id', user.getOne);

module.exports = router;