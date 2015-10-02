/**
 * MYCLIENT.JS
 * an example of a JSON request - an ajax request which returns a JSON object 
 * 
 * When a user browses to http://localhost:3000, index.html is loaded, which then 
 * loads and executes this code
 */

window.onload = function () {
  var url, i;
 
 
  var socket = io.connect('http://192.168.0.160:3000');

  for (i = 0; i < 2; i++) {
    url = document.URL + 'inputs/' + i;
    $.getJSON(url, function (data) {
      
      $('#input').append('<p>input gpio port ' + data.gpio + ' on pin ' + data.pin + ' has current value ' + data.value + '</p>');
    });
  }

  socket.on('temperatureUpdate', function (time, data) {
                       
						//$('#input').innerHtml('The temperature is ' + data +'ddaf');
 
                    });
  socket.on('swissWeather', function (data) {
                       
						$('#temp').html( data['city_info']['name'] );
 
                    });
					

       
     
  
};

jQuery(document).ready(function($) {
	
	(function updateMoonPhase()
	{
		console.log('dddddddddddddddddddPI response received');
	url = document.URL + 'temp/';
    $.getJSON(url, function (data) {
      console.log(data);
      $('#test').html('<p>'+data[0].pin+'</p>');
    });
			setTimeout(function() {
			updateMoonPhase();
		}, 1000);
	})();
	
	});

