let JSONFILE = require('../public/toggle_tracker.json'); // JSONFILE: object.

exports.index = function(req, res){
        
    res.render("index", { JSONobj: JSONFILE });
    // have a variable for account, and have the cookies change the default JSON obj
};

exports.toggle_send = function(req, res){
    res.send("Not implemented, but it should not send you to a different page.")
    // find some guard clause for the account.

};