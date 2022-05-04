const defaultSettings = require("../public/settings_tracker.json");
const userModel = require("../models/userModel.js");
const settingsModel = require("../models/settingsModel.js");


exports.index = function(req, res){
    return res.status(200).render("settings");
};

exports.collectUserSettings = async function(req, res){
	const userSettings = defaultSettings;

		if (req.userName) { 
			const {userName, displayName} = req;
 			// validation, including the escaping and cleansing of the string.
			
			const query = User.find({ user_name: userName }); // starting the query building process.

			query.select("toggles");
					
			query.exec( ( err, user ) => {
				if (err) return handleError(err);
				
				// we add the username and display name to the toggles for now.
				userToggles.userName = userName; // to add such a thing
				userToggles.displayName = displayName;
				//console.log(userToggles)

				for (let index = 0; index < Object.keys(user.toggles).length; index++) {
					userToggles.categories[index + 1] = user.toggles.categories[index]; 
					// remember that the first one is default, and so must take 0th place.
					//... document.	
				}
            })
    	}
		res
        .status(200)
        .send(userSettings);
};

exports.submitUserSettings = function(req, res){
    const {settings} = req.body;

    console.table(settings);

    res
    .status(200)
    .send("Submitted - thanks -, but I haven't done any validation or ... anything with this.");
};
