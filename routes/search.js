const express = require('express');
const router = express.Router();
const google = require('googleapis');
var Search = require('../models/search.js');

//Required infos for customer search;
const customsearch = google.customsearch('v1');
const cx = "008928106123010811591:d9gjf59qmjg";
const apiKey = "AIzaSyCXdQbIQSiHAIA06DMfHQ7Ypr2Pc_SwyQ4";


router.get('/search/', function (req,res){
	var keyword = req.query.keyword;
	var offset = req.query.offset;
	var num = req.query.num;
	//Save searching query into database:
	var searchObj = new Search({
		date: new Date(),
		keyword: keyword
	});
	searchObj.save(function (err){
		if(err){
			return err;
		}
		console.log("saved");
	});

	//Custom Search Start
	customsearch.cse.list({
		cx: cx,
		q: keyword,
		auth: apiKey,
		num: num,
		start: offset
	}, function(err, resp){
		if(err){
			return err;
		}
		//console.log('Result: ' + resp.searchInformation.formattedTotalResults);
		var imageArray = [];
		resp.items.forEach(function (item){
			//Create an obj with specified property
			var imageObj ={
				title: item.title.slice(0, item.title.indexOf("-")-1),
				link: item.link,
				snippet: item.snippet,
				id: item.cacheId
			};

			//push obj into array
			imageArray.push(imageObj);
			
		});
		res.send(JSON.stringify(imageArray));
	});
});

router.get('/history', function (req,res){
	Search.find({}, {_id:0, __v:0}, function (err, search){
		if(err){
			console.log(err);
			return;
		}
		res.send(search);
	})
})
module.exports = router;