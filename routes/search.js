const express = require('express');
const router = express.Router();
const google = require('googleapis');
const customsearch = google.customsearch('v1');
const cx = "008928106123010811591:d9gjf59qmjg";
const apiKey = "AIzaSyCXdQbIQSiHAIA06DMfHQ7Ypr2Pc_SwyQ4";


router.get('/search/', function (req,res){
	var keyword = req.query.keyword;
	var offset = req.query.offset;
	customsearch.cse.list({
		cx: cx,
		q: keyword,
		auth: apiKey
	}, function(err, resp){
		if(err){
			return err;
		}
		console.log('Result: ' + resp.searchInformation.formattedTotalResults);
		res.send(resp);
	})
	
	
	//console.log('keyword: ' + keyword + "; offset: " + offset);
	//res.send('keyword: ' + keyword + "; offset: " + offset);

	//Example API link call:
	//https://www.googleapis.com/customsearch/v1?key=AIzaSyCXdQbIQSiHAIA06DMfHQ7Ypr2Pc_SwyQ4&cx=008928106123010811591:d9gjf59qmjg%20Public%20URLGet%20code&q=%22cat%22
});
module.exports = router;