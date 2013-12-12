
	$(document).ready(function () {
               
		$('.hallo').click(function () {


						$.ajax({
					url: "test_part.html",
					cache: false
					})
					.done(function( html ) {
					$( "#results" ).append( html );
					});
		});
		
	});