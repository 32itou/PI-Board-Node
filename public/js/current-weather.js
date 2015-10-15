
function get_direction_icon(wind_direction) {

	var wind_dir_symbol = '';
		if (wind_direction <= 22.5 || wind_direction >= 337.5){
			wind_dir_symbol = 'wi-wind-north';
		}
		if (wind_direction > 22.5 && wind_direction < 67.5){
			wind_dir_symbol = 'wi-wind-north-east';
		}
		if (wind_direction >= 67.5 && wind_direction <= 112.5){
			wind_dir_symbol = 'wi-wind-east';
		}
		if (wind_direction > 112.5 && wind_direction < 157.5){
			wind_dir_symbol = 'wi-wind-south-east';
		}
		if (wind_direction >= 157.5 && wind_direction <= 202.5){
			wind_dir_symbol = 'wi-wind-south';
		}
		if (wind_direction > 202.5 && wind_direction < 247.5){
			wind_dir_symbol = 'wi-wind-south-west';
		}
		if (wind_direction >= 247.5 && wind_direction <= 292.5){
			wind_dir_symbol = 'wi-wind-west';
		}
		if (wind_direction > 292.5 && wind_direction < 337.5){
			wind_dir_symbol = 'wi-wind-north-west';
		}

	return wind_dir_symbol;
}

function get_current_data() {
	var request =  get_XmlHttp();
	// call the function for the XMLHttpRequest instance

	request.open("GET", "http://data.geo.admin.ch.s3.amazonaws.com/ch.meteoschweiz.swissmetnet/VQHA69.txt");			// define the request
	request.send(null);	 
	
	request.onreadystatechange = function get_data() {
		if (request.readyState === 4) {
			var text = request.responseText;
			var n = text.search("PUY"); 
		
			var raw_data = text.substring(n, n + 64);
			current_data = raw_data.split('|');
                    }
            }   
return  current_data;    	
}

function get_XmlHttp() {
  // create the variable that will contain the instance of the XMLHttpRequest object (initially with null value)
  var xmlHttp = null;

  if(window.XMLHttpRequest) {		// for Forefox, IE7+, Opera, Safari, ...
    xmlHttp = new XMLHttpRequest();
  }
  else if(window.ActiveXObject) {	// for Internet Explorer 5 or 6
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return xmlHttp;
}

function updateCurrentWeatherData(data)
	{
    
	var request =  get_XmlHttp();
	//var json = data;
	var dataout;
	request.open("GET", "http://data.geo.admin.ch.s3.amazonaws.com/ch.meteoschweiz.swissmetnet/VQHA69.txt");			// define the request
	request.send(null);	

	request.onreadystatechange = function() {
		if (request.readyState === 4) {				
			
			var text = request.responseText;
			var n = text.search("PUY"); 
			var now = new Date();
			var raw_data = text.substring(n, n + 64);
			var current_data = raw_data.split('|');
			var temp = parseInt(current_data[2]) + parseInt(tempOffset);
			var wind = current_data[6];
			var wind_direction = current_data[5];
			var wind_dir_icon = get_direction_icon(wind_direction);		
			var windicon = $('<span class="wi xdimmed">').addClass(wind_dir_icon);
			var windString = windicon.outerHTML() +' ' + wind + ' km/h' ;
			//var sunrise = new Date(json.sys.sunrise*1000).toTimeString().substring(0,5);
			//var sunset = new Date(json.sys.sunset*1000).toTimeString().substring(0,5);
			//var sunString = '<span class="wi wi-sunrise xdimmed"></span> ' + sunrise;
             //sunString += '<span class="wi wi-sunset xdimmed">dddd</span> ' + sunset;
			// console.log(sunset);
			var sunString= 'ddd';
			$('.windsun').updateWithText(windString+' '+sunString, 1000);
			
			var icon = $('<span><span/>').addClass('dimmed').addClass('wi').addClass('wi-thermometer');
			var temptext = '<span>' +temp + '&deg;</span> ';
			$('.temp').updateWithText(icon.outerHTML() +'   '+ temp + '&deg;', 1000);
		}
        }
}	

function updateSwissWeatherData(data)
	{
	//Nexts days forecast
	var day = [ 'day_1','day_2','day_3'];

	for (i = 0; i < 3; i++) {
		var fcst_day = 'fcst_' 
		fcst_day = fcst_day.concat(day[i]);
		
		var icon = data[fcst_day]['icon'];
		
		var image = $('<div class="current_icon"><img src="' + icon +'"/></div>');
		var div_text = '<div class="current_icon"><img src="' + icon +'"/></div>';

		var tmin = data[fcst_day]['tmin'];
		var tmax = data[fcst_day]['tmax'];
		var short_day = data[fcst_day]['day_short'];

		div_text += '<span class="wi xdimmed"></span>';

		div_text += tmin+'&deg;'+ '/'+tmax+'&deg;'+ '<br />';
		div_text += '<span class="day wi xdimmed xsmall">'+ short_day +'</span>';
		
		document.getElementById(day[i]).innerHTML= div_text;
	
		}
	
	var now = moment().format('HH');
	
	for (i = 0; i < 2; i++) {
		var hour = '';
		
		if ((parseInt(now)+timeshift[i]) >= 24){
			hour = String(parseInt(now)+timeshift[i]-24)+'H00';
		} else {
			hour = String(parseInt(now)+timeshift[i])+'H00';
		}
		var fcst_day0 = 'fcst_day_0' ;		
		var icon = data[fcst_day0]['hourly_data'][hour]['ICON'];		
		var div_text = '<div class="current_icon"><img src="' + icon +'"/></div>';		
		var tmp = data[fcst_day0]['hourly_data'][hour]['TMP2m'];
		div_text += '<span class="wi xdimmed"></span>' + tmp +'&deg;<br />';
		div_text += '<span class="day wi xdimmed xsmall">'+ hour +'</span>';
		
		var div_id = 'day_0_' + String(i+1);
		document.getElementById(div_id).innerHTML= div_text;
	}
    }	
    
