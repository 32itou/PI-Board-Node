

$(function() {
    window.onpopstate = function() {

     };
    $('.home').addClass('visible');


    $(window).on('hashchange', function(){
		render(window.location.hash);
	});

});

function switchOff(){

}

function standBy(){

}

function synology(){

    socket.emit('wol', 'test','ttt');
  

}

function showHome(){
     $('.page').removeClass('visible');
     $('.home').addClass('visible');
     document.getElementsByClassName("graph").remove();
     document.getElementsByClassName("menu-page").remove();
 };


function showGraph(){
     $('.page').removeClass('visible');
     $('.graph').addClass('visible');
     document.getElementsByClassName("home").remove();
     document.getElementsByClassName("menu-page").remove();
 };

function showMenu(){
     $('.page').removeClass('visible');
     $('.menu-page').addClass('visible');
     document.getElementsByClassName("menu-page").remove();
     document.getElementsByClassName("home").remove();
 };

function render(url){
     //$('.page').removeClass('visible');
     var temp = url.split('/')[0];
     switch(temp) {
        case '#home':
        showHome();
        break;
        case '#graph':
        showGraph();
        break;
        case '#menu':
        showMenu();
        break;
        case '#off':
        switchOff();
        break;
        case '#standby':
        standBy();
        break;
        case '#synology':
        synology();
}     

};



 var socket = io.connect('http://192.168.0.160:3000'); 
  socket.on('ping', function (ping) {
		switch (ping['host']){
			case '192.168.0.100':
				if (ping['alive'] == false ) {
					$('.synologybtn').removeClass('btn-success');
					$('.synologybtn').addClass('btn-danger');
				}
				else {
					$('.synologybtn').addClass('btn-success');
					$('.synologybtn').removeClass('btn-danger');
				}
			break;
			case '192.168.0.155':
				if (ping['alive'] == false ) {
					$('.kodibtn').removeClass('btn-success');
					$('.kodibtn').addClass('btn-danger');
				}
				else {
					$('.kodibtn').addClass('btn-success');
					$('.kodibtn').removeClass('btn-danger');
				}
		}
 
    });
