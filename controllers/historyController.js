var History  = require('../models/history');
var CommonFacade = require('./commonFacade');

var history = {

    create : function(req,res, next) {
        CommonFacade.addToHistory(req, res, next);
    }
}

module.exports = history ;