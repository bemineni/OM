//OM
//Srikanth Bemineni
iam( 'Meteron' ,['js/splash.js','js/log.js'] , function(splash,log){
	"use strict";

	var Meteron = (function() {

		var settings = {
				appName :"Auto and Cab charge calculator",
				appAuthor : "Srikanth Bemineni",
				windowWidth :  0 ,
				windowHeight : 0 ,
		};

		function Meteron()
		{
			this.init = function(){
				//Lets set all the screen elements and also width of the html
				//body 
				settings.windowWidth = $(window).width();
				settings.windowHeight = $(window).height();
			};

			/*!
			 * This function will set up the google maps.
			 */
			this.googlemaps = function( id ){
				var mapOptions = {
						center: new google.maps.LatLng(-34.397, 150.644),
						zoom: 8,
						mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				var map = new google.maps.Map(document.getElementById(id), mapOptions);
			};

		}
		return new Meteron();
	})();

	return Meteron;	
});






