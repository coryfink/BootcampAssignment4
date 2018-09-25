var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    listingsRouter = require('../routes/listings.server.routes'),
    getCoordinates = require('../controllers/coordinates.server.controller.js');

module.exports.init = function() {
  //connect to database
	mongoose.connect(config.db.uri );


  //initialize app
  var app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.json());

  app.post('/api/coordinates', getCoordinates, function(req, res) {
    res.send(req.results);
  });

  /* serve static files */
	app.use('/', express.static(__dirname + '/../../client'));
  app.use('/public', express.static(__dirname + '/../../public'));

  /* use the listings router for requests to the api */
	app.use('/api/listings', listingsRouter);

	app.all('/*', function(req, res) {
	 res.sendFile(path.resolve('client/index.html'));
 });

  return app;
};
