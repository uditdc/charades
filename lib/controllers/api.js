'use strict';

var mongoose = require('mongoose'),
		Thing = mongoose.model('Thing'),
		Movie = mongoose.model('Movie'),
		request = require("request"),
		jsdom = require("jsdom");

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
	return Thing.find(function (err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};

exports.movies = function(req, res, callback) {
	Movie.random({}, function(err, random){
		if(err){
			res.send(err); 
			return null;
		}

		res.send(random);
	});
};

exports.reloadMovies = function(req, res) {

	var letters = new Array('a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');

	var $formattedArray = [];

	function getMovies(url, alphabet){
		jsdom.env({
			url: url,
			scripts: ["http://dumb-charades.herokuapp.com/bower_components/jquery/dist/jquery.js"],
			done: function(err, window){
				// console.log(alphabet);

				var $ = window.jQuery;
				var $movieTitles = $('a.m3b3b');

				$movieTitles.each(function(){
					$formattedArray.push({ name : $(this).find('strong').html(), year : '2014' });
				});

				if(alphabet === 'z'){
					Movie.find({}).remove(function(){
						Movie.create($formattedArray);
						console.log('Movies Updated');
					});
				}
			}
		});
	}


	for(var l in letters){
		var alphabet = letters[l];
		var url = 'http://www.bollywoodhungama.com/movies/alphalist/call/ajax/char/' + alphabet;
		getMovies(url, alphabet);
		console.log(url);
	}

	res.send();
};