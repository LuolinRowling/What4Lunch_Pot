$(document).ready(function(){
	$('#topics').addClass('navigation-border');
	$('#anotherMe').css('display','none');
});

$('.mdl-navigation__link').on('click',function(){
	$(this).addClass('navigation-border');
	$(this).siblings('a').removeClass('navigation-border');
	if($('#topics').hasClass('navigation-border')){
		$('#anotherMe').css('display','none');
		$('#main').css('display','block');
	}
	if($('#another').hasClass('navigation-border')){
		$('#anotherMe').css('display','block');
		$('#main').css('display','none');
	}
});