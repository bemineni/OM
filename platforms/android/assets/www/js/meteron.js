//OM
//Srikanth Bemineni
iam( 'Meteron' ,['js/log.js','js/session.js'] , function(log,session){
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
				//splash.init(this);
				log.info('Meteron initialized');
			};
			
			this.settings = function(){
				
				return appSettings;
			};
			
			this.register = function(){
					
				//All controls for the home screen
				$(document).on('pageinit','#splash',function(evt){
					iam( '',['js/splash.js'],function(splash){
						splash.init();
					});
				});
				
				$(document).on('pageinit','#home',function(evt){
					iam( '',['js/home.js'],function(home){
						home.init();
					});
				});
				
				$(document).on('pageinit','#map',function(evt){
					iam( '',['js/map.js'],function(map){
						map.init();
					});
				});
				
			};

		}
		return new Meteron();
	})();

	return Meteron;	
});






