/**
 * myapi.js
 * 
 * @version 1.1 - updated for Express 4.x : April 2015
 *
 * 
 * DESCRIPTION:
 * a "HELLO WORLD" server-side application to demonstrate running a node 
 * API Appserver on a Raspberry Pi to access IOs
 * Uses the Express node packages. 
 * 
 * 
 * @throws none
 * @see nodejs.org
 * @see express.org
 * 
 * @author Robert Drummond
 * (C) 2013 PINK PELICAN NZ LTD
 */
var request 	= require('request');
var http     	= require('http');
var express  	= require('express');

var app      	= express();
var server = http.createServer(app);

var    fs = require('fs');
var  sys = require('util');
var io 			= require('socket.io').listen(server);
var exec 		= require('child_process').exec;
var child;


// dummy input port values for our example
var inputs = [    { pin: '11', gpio: '17', value: 1 },
                  { pin: '12', gpio: '18', value: 0 }
                ];

var out_weather_current = {};
var timetmp = [ {pin: '0'}];
var i =1 ;
var test = 0;

// ------------------------------------------------------------------------
setInterval( function () {
i += 1;
  timetmp= [{pin: i}];

}, 500); // setInterval






// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,*");
  next();
});


// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  res.send(inputs[req.params.id]);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/inputs', function (req, res) {
  // send an object as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()

// Express route for incoming requests for cpu temperature
app.get('/temp', function (req, res) {
  // send an object as a JSON string
  //console.log('CPU temp');
  res.status(200).send(timetmp);
}); // apt.get()

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

// ------------------------------------------------------------------------
// Start Express App Server
//
server.listen(3000);
console.log('App Server is listening on port 3000');





io.set('origins', '*:*');
io.sockets.on('connection', function(socket) {
	
// real-time loop for internal measurement
  setInterval(function(){
    child = exec("cat /sys/class/thermal/thermal_zone0/temp", function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      // You must send time (X axis) and a temperature value (Y axis) 
      var date = new Date().getTime();
      var temp = parseFloat(stdout)/1000;
	  test = temp;
      socket.emit('temperatureUpdate', date, temp); 	
	}		
    
  });}, 1000);
  
// 5 minutes loop for external measurement and database update   
	



	
	
	//add: sunrise sunset moon


});


setInterval(function(){
	
	request.get('http://data.geo.admin.ch.s3.amazonaws.com/ch.meteoschweiz.swissmetnet/VQHA69.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
		var line = body.search("PUY"); 
		var raw_data = body.substring(line, line + 64);
		var ln = raw_data.split('|');
		out_weather_current = { city:ln[0],date:ln[1],temp:ln[2],sun:ln[3],rain:ln[4],winddir:ln[5],windspeed:ln[6],pressure:ln[7]};
                console.log('loop');
		//socket.emit('swissCurrentWeather', out_weather_current); 
	}
	});
	//update 5 minutes rrd table
    child = exec("rrdtool update /home/pi/database/rrd-test.rrd N:"+ out_weather_current['temp'], function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
        console.log(out_weather_current['temp']);
	}
	});
        //weather forecast
    	var url = "http://www.prevision-meteo.ch/services/json/pully" ;
	request({
        url: url,
        json: true
	}, function (error, response, body) {
	//socket.emit('swissForecst', body);
    });

}, 5000);

