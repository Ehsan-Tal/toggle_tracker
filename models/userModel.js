//Schema — User in ../Models/User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
	user_name: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	token: String,
	display_name: { type: String, required: true },
	email_address: String,
	first_name: String,
	last_name: String,
	description: String,
	toggles: { type: Object }
});


userSchema.virtual('url').get( () => {
return 'users/' + this.user_name;
});


module.exports = mongoose.model( 'User' , userSchema ); 