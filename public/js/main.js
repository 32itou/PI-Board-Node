jQuery(document).ready(function($) {
    
    moment.lang(lang);

	(function updateTime()
	{
        var now = moment();
        var date = now.format('LLLL').split(' ',4);
        date = date[0] + ' ' + date[1] ;

		$('.date').html(date);
		$('.time').html(now.format('HH') + ':' + now.format('mm') + '<span class="sec">'+now.format('ss')+'</span>');

		setTimeout(function() {
			updateTime();
		}, 1000);
	})();
    (function updateCurrentWeather()
    {		//$.getJSON('http://api.openweathermap.org/data/2.5/weather', weatherParams, updateCurrentWeatherData);
		updateCurrentWeatherData('rr'),
		setTimeout(function() {
			updateCurrentWeather(true);
		}, 300000);

	})();
    (function updateSwissWeather()
	{	
		$.getJSON( "http://www.prevision-meteo.ch/services/json/pully", null, updateSwissWeatherData );
	
			setTimeout(function() {
			updateSwissWeather();
		}, 300000);
	})();	
    (function updateMoonPhase()
	{	
		var today = new Date();
		var moon = SunCalc.getMoonIllumination(today);
		var fraction = moon['fraction'];
		drawPlanetPhase(document.getElementById('moon'), fraction, true);
			setTimeout(function() {
			updateMoonPhase();
		}, 300000);
	})();
});

jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

jQuery.fn.updateWithText = function(text, speed)
{
	var dummy = $('<div/>').html(text);
	

	if ($(this).html() != dummy.html())
	{
		$(this).fadeOut(speed/2, function() {
			$(this).html(text);
			$(this).fadeIn(speed/2, function() {
				//done
			});
		});
	}
}
