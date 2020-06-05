/*
 * routes/index.js
 *
 * Routes contains the functions (callbacks) associated with request urls.
 */
// our db model
const Person = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
exports.index = (req, res) => {
	console.log("main route requested");

	let data = {
		status: 'OK',
		message: 'Welcome to the moon&nuri v1 API'
	};

	// respond back with the data
	res.json(data);

};

/**
 * POST '/api/create'
 * Receives a POST request of the new user and location, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

exports.create = function(req,res){
	let name = req.body.name,
		person = Person({
			name: name
		});

	// now, save that person to the database
	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save
	person.save((err, data) => {

		// if err saving, respond back with error
		if (err){
			let jsonData = {
				status:'ERROR',
				message: 'Error saving person',
				err: err
			};

			return res.json(jsonData);
		}

		// now return the json data of the new person
		let jsonData = {
			status: 'OK',
			person: data
		};

		return res.json(jsonData);
	});
};

/**
 * GET '/api/get/:id'
 * Receives a GET request specifying the user to get
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */
exports.getOne = function(req,res){
	let requestedId = req.param('id');

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
	Person.findById(requestedId, function(err,data){
		// if err or no user found, respond with error
		if (err || data == null) {
			let jsonData = {status:'ERROR', message: 'Could not find that person'};

			return res.json(jsonData);
		}

		// otherwise respond with JSON data of the user

		let jsonData = {
			status: 'OK',
			person: data
		};

		return res.json(jsonData);
	});
};

/**
 * GET '/api/get'
 * Receives a GET request to get all user details
 * @return {Object} JSON
 */
exports.getAll = function(req,res){

	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.find
	Person.find((err, data) => {
		// if err or no users found, respond with error
		if (err || data == null) {
			let jsonData = {
				status:'ERROR',
				message: 'Could not find people'
			};

			return res.json(jsonData);
		}

		// otherwise, respond with the data
 		let jsonData = {
  			status: 'OK',
  			people: data
  		};

		res.json(jsonData);
	});
};

/**
 * POST '/api/update/:id'
 * Receives a POST request with data of the user to update, updates db, responds back
 * @param  {String} req.param('id'). The userId to update
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */
exports.update = function(req,res){
	let requestedId = req.param('id');

	// pull out the name and location
	let name = req.body.name;
	let dataToUpdate = {
		name: name
	};

	// now, update that person
	// mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
	Person.findByIdAndUpdate(requestedId, dataToUpdate, (err, data) => {

		// if err saving, respond back with error
		if (err){
			let jsonData = {
				status:'ERROR',
				message: 'Error updating person'
			};

			return res.json(jsonData);
		}

		// now return the json data of the new person
		let jsonData = {
			status: 'OK',
			person: data
		};

		return res.json(jsonData);
	});
};

/**
 * GET '/api/devare/:id'
 * Receives a GET request specifying the user to devare
 * @param  {String} req.param('id'). The userId
 * @return {Object} JSON
 */
exports.remove = function(req,res){
	let requestedId = req.param('id');

	// Mongoose method, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
	Person.findByIdAndRemove(requestedId, (err, data) => {
		if (err || data == null) {
			let jsonData = {
				status:'ERROR',
				message: 'Could not find that person to remove'
			};

			return res.json(jsonData);
		}

		// otherwise, respond back with success
		let jsonData = {
			status: 'OK',
			message: 'Successfully removed id ' + requestedId
		};

		res.json(jsonData);
	});
};
