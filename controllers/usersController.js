const User = require("../models/userModel");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.index = function (req, res) {
    res.render("users");
}

exports.createNewUser = async (req, res) => {

		const errors = validationResult(req);
	// validation method: password === confirmPassword\

		if (!errors.isEmpty()) {
			return res.status(400).render("error", { errors: errors.array() });
		} else {
			//unpacking			
			let { userName, displayName, password } = req.body;
			
			// password hashing and salting - bcrypt handles the salting for us.
			password = await bcrypt.hash(password, 10); // 10 is the standard according to OWASP guidelines.
			
			// token generating
			const token = jwt.sign(
				{user: userName, time: Math.floor(Date.now() /1000) - 72},
				process.env.SECRET_KEY,
				{
					expiresIn: process.env.KEY_EXPIRATION
				}
			);	
			
			const query = await User.create({ 
				user_name: userName, display_name: displayName, password: password, token: token 
			});
			// perhaps also initialise a settings instance ?

			req.headers = {"Authorisation": `Bearer ${token}`};
			// perhaps unnecessary.

			// execution and success
			query.save( (err) => { 
				if (err) return handleError(err); 
			});

			return res
			.cookie("Authorisation", token, {
				httpOnly: true,
				secre: process.env.NODE_ENV === "production"
			})
			.cookie("userName", userName, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production"
			})			
			.cookie("DisplayName", displayName, {
				secure: process.env.NODE_ENV === "production"
			})
			.status(200)
			.redirect('/'); 
			
		}
	}


exports.loginUser = async (req, res) => {
	const errors = validationResult(req);
	
	if (!errors.isEmpty()) {
		return handleErrors(errors.array);
		
	} else {
		
		const { userName, password } = req.body;
		// check if there is one in truth
		const user = await User.findOne({ user_name: userName });		
		
		// checking if the passwords match + token generating
		if (user && (await bcrypt.compare(password, user.password))) {

			const token = jwt.sign(
				{user: userName, time: Math.floor(Date.now() /1000) - 72},
				process.env.SECRET_KEY,
				{
					expiresIn: process.env.KEY_EXPIRATION
				}
			);
			
			user.token = token;
			let displayName = user.display_name;
			
			user.save( (err) => { 
				if (err) return handleError(err)
			});

			// successful user action - we save a cookie for persistence.		
			res
			.cookie("Authorisation", token, {
				httpOnly: true, // this ensures you cannot document.cookie it.
				secure: process.env.NODE_ENV === "production"
			})	
			.cookie("userName", userName, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production"
			})			
			.cookie("DisplayName", displayName, {
				secure: process.env.NODE_ENV === "production"
			})
			.status(200)
			.redirect('/'); 
		}; 		
		res.status(400).send("Invalid Credentials.");
	};
};

	
exports.logout = function(req, res){
    return res
			.clearCookie("Authorisation")
			.clearCookie("userName") 
			.clearCookie("displayName")
			.status(200)
			.send("A successful logout.")
			// we might need some way to force a refresh.
};

