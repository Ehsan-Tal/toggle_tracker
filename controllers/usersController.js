// we need a model for users.

exports.index = function (req, res) {
    res.render("users");
}

exports.user_create_get = function(req, res){
    console.log(req.body);
    console.log("Not implemented");
};

exports.user_create_post = function(req, res){
    console.log(req.body);
    console.log("Not implemented");
};

exports.user_log_in_post = function(req, res){
    console.log("hah, I do not have a db for that even !")
};

exports.user_log_out = function(req, res){
    console.log("They cannot log out if they cannot log in, tink 'bout id.")
    res.send("not implemented.")
}

// we also need a user log in thing