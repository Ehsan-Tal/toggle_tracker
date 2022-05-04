//Schema — ToggleInstance in ../Models/ToggleInstance
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ToggleInstanceSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref:'User', required: true },
	date: { type: Date, required: true },
	toggles: { type: Object, required: true }
});


ToggleInstanceSchema.virtual("toggleInstanceID").get(() => {
	return this._id;
})


module.exports = mongoose.model( "ToggleInstance" , ToggleInstanceSchema );