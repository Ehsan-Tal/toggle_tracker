const ToggleInstance = require("../models/togglesInstanceModel");
const User = require("../models/userModel");
const defaultVirtues = require('../public/toggle_tracker.json'); 
const { body, validationResult } = require('express-validator');
const ObjectId = require('mongodb').ObjectId;


exports.index = (req, res) => {
	return res.status(200).render("home");
};

exports.collectUserToggles = (req, res) => { 
		const userToggles = defaultVirtues;
		const {userName} = req.cookies;

		if (userName) {
			
 			// validation, including the escaping and cleansing of the string.
			
			const query = User.find({ user_name: userName }); // starting the query building process.

			query.select("toggles");
					
			query.exec( ( err, user ) => {
				if (err) return handleError(err);
				//console.table(userToggles)

				for (let index = 0; index < Object.keys(user.toggles).length; index++) {
					userToggles.categories[index + 1] = user.toggles.categories[index]; 
					// remember that the first one is default, and so must take 0th place.
					//... document.	
				}
            })
    	}
		//console.table(userToggles);
		res
		.status(200)
		.send( userToggles );
	}


exports.submitUserToggles = async function(req, res){

	const {date, toggles} = req.body;
	const {userName} = req.cookies;
	
	const user = User.findOne({ user_name: userName });
	const query = await ToggleInstance.create({'user': ObjectId(user._id), 'date': date, 'toggles': toggles });
	
	query.save( (err) => { 
		if (err) return handleError(err); 
	}); 
	
	res
	.status(200)
	.json({message: "Success ! Saved the toggles."});
 
};