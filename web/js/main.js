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

$('#search-field').keypress(function(e) {
	if (e.which == 13) {
		e.preventDefault();
		var data = {
			specificTopic: $(e.target).val()
		}
		$.ajax({
			type: 'POST',
			url: 'http://jiangdongyu.space:3000/topicTOtopic',
			data: data,
			dataType: 'json',
			success: function(data){
				console.log(data);
			},
			error: function(xhr, type) {
				console.log(xhr);
			}
		});
	}
})