'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
		
/**
 * Thing Schema
 */
var MovieSchema = new Schema({
	name: String,
	year: String,
});

MovieSchema.statics = {

	/**
	 * List movies
	 *
	 * @param {Object} options
	 * @param {Function} cb
	 * @api private
	 */

	list: function (options, cb) {
		var criteria = options.criteria || {};
		this.find(criteria).exec(cb);
	},

	/**
	 * Random movies
	 *
	 * @param {Object} options
	 * @param {Function} cb
	 * @api private
	 */

	random : function (options, cb) {
		var criteria = options.criteria || {};
		var that = this;

		that.count(criteria, function(err, count){
			console.log(count);
			that.find(criteria).limit(-1).skip(getRandomInt(1,count)).exec(cb);
		});
	}

};

mongoose.model('Movie', MovieSchema);
