/**
 * Module dependencies.
 */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOLAB_URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


// api baseURI is at /api/
// API Routes
// CREATE - http://appname.com/api/create (POST)
// RETRIEVE 1 - http://appname.com/api/get/:id (GET)
// RETRIEVE ALL - http://appname.com/api/get (GET)
// UPDATE - http://appname.com/api/update/:id (PUT)
// DELETE - http://appname.com/api/delete/:id (DELETE)

// ROUTES, logic is in routes/index.js
const routes = require('./routes/index.js');

// home route is not really an API route, but does respond back
app.get('/', routes.index); // calls index function in /routes/index.js

// API routes
app.post('/api/create', routes.create); // API create route and callback (see /routes/index.js)
app.get('/api/get/:id', routes.getOne); // API retrieve 1 route and callback (see /routes/index.js)
app.get('/api/get', routes.getAll); // API retrieve all route and callback (see /routes/index.js)
app.post('/api/update/:id', routes.update); // API update route and callback (see /routes/index.js)
app.get('/api/delete/:id', routes.remove); // API delete route and callback (see /routes/index.js)

// if route not found, respond with 404
app.use(function(req, res, next){

	let jsonData = {
		status: 'ERROR!',
		message: 'Sorry, we cannot find the requested URI'
	};

	// set status as 404 and respond with data
  res.status(404).send(jsonData);

});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
