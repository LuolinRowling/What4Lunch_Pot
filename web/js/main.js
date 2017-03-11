$(document).ready(function(){
	$('#topics').addClass('navigation-border');
});

$('.mdl-navigation__link').on('click',function(){
	$(this).addClass('navigation-border');
	$(this).siblings('a').removeClass('navigation-border');
});