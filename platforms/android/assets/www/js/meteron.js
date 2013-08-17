//OM
//Srikanth Bemineni
iam( 'Meteron' ,['js/splash.js','js/log.js'] , function(splash,log){
	"use strict";

	var Meteron = (function() {

		var appSettings = {
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
				appSettings.windowWidth = $(window).width();
				appSettings.windowHeight = $(window).height();
				//Lets initialize the splash screen
				splash.init(this);
			};
			
			this.settings = function(){
				
				return appSettings;
			};
			
			this.register = function(){
				
				
				//All controls for the home screen
				$(document).on('pageinit','#home',function(evt){
					iam( '',['js/home.js'],function(home){
						home.init();
					});
				});
				
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






