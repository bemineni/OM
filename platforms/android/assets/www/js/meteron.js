//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com
iam( 'Meteron' ,['js/log.js','js/session.js'] , function(log,session){
	"use strict";

	var Meteron = (function() {

		var appSettings = {
				appName :"Auto and Cab charge calculator",
				appAuthor : "Srikanth Bemineni",
				windowWidth :  0 ,
				windowHeight : 0 ,
				version:"1.0"
		};

		function Meteron()
		{
			this.init = function(){
				//Lets set all the screen elements and also width of the html
				//body 
				appSettings.windowWidth = $(window).width();
				appSettings.windowHeight = $(window).height();
				
				document.addEventListener("pause", this.appPaused, false);
				document.addEventListener("resume", this.appResumed, false);
				document.addEventListener("backbutton", this.backButtonPressed, false);
				
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
				
				$(document).on('pageinit','#adialog',function(evt){
					iam( '',['js/dialog.js'],function(dialog){
						dialog.init();
					});
				});
				
				//We will start loading once all our pageinit's are setup
				// This will make sure we have guaranteed initialization 
				$.mobile.initializePage();
				
				log.info('Meteron registeration complete');
				
			};
				
			this.isNetworkAvailable = function(){
				
				if(browserMode)
					return true;
				
				var states = {};
			    states[Connection.UNKNOWN]  = 'Unknown connection';
			    states[Connection.ETHERNET] = 'Ethernet connection';
			    states[Connection.WIFI]     = 'WiFi connection';
			    states[Connection.CELL_2G]  = 'Cell 2G connection';
			    states[Connection.CELL_3G]  = 'Cell 3G connection';
			    states[Connection.CELL_4G]  = 'Cell 4G connection';
			    states[Connection.CELL]     = 'Cell generic connection';
			    states[Connection.NONE]     = 'No network connection';
			    
				return states[navigator.connection.type] != states[Connection.NONE]
		   };
		   
		   this.appPaused = function(){
			   //We will start the tracking timer  
			   log.info('App paused');
		   };
		   
		   this.appResumed = function(){
			  //We will stop the tracking timer
			   $.mobile.changePage($('#splash'),{});
			   log.info('App resumed');
		   };
		   
		   this.backButtonPressed = function(){
			   window.history.back();
		   };

		}
		return new Meteron();
	})();

	return Meteron;	
});






