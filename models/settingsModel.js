//Schema — Settings in ../models/userSettings
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema(
    {
		user: { type: Schema.Types.ObjectId, ref:'User', required: true },
		
    }
);

settingsSchema.virtual('url').get( () => {
    //
});


module.exports = mongoose.model( 'Settings' , settingsSchema );
