const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html
const personSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlength: 3,
		trim: true
	},

	dateAdded: {
		type: Date,
		default: Date.now
	}
});

// export 'Person' model so we can interact with it in other files
module.exports = mongoose.model('Person', personSchema);
