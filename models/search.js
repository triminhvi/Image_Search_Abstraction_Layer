var mongoose = require('mongoose');
var SearchSchema = mongoose.Schema({
	date : {
		type: String
	},
	keyword: {
		type:String
	}
});

var Search = module.exports = mongoose.model('search', SearchSchema);