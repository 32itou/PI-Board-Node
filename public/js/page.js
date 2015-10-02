$(function() {
    window.onpopstate = function() {

     };
    $('.home').addClass('visible');


    $(window).on('hashchange', function(){
		render(window.location.hash);
	});

});


function showHome(){
     $('.page').removeClass('visible');
     $('.home').addClass('visible');
};


function showGraph(){
     $('.page').removeClass('visible');
     $('.graph').addClass('visible');
};

function showMenu(){
     $('.page').removeClass('visible');
     $('.menu-page').addClass('visible');
};

function render(url){
     $('.page').removeClass('visible');
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
}     

};