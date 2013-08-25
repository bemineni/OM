//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com

//Because of stupid google maps call api
function maploaded()
{
	iam("",['js/map.js'],function(map){
		map.googleMapsLoaded();
	});
}

iam('map',['js/meteron.js','js/log.js', 'js/session.js'],
		function(meteron,log,session){
		"use strict";
		
	var map = (function(){
		
		     var MAP = '#map';
		     var DONE = '#done';
		     var LOCATION = '#location';
		     var MAPCANVAS = 'map-canvas';
		     var FINDME = '#find-me';
		     var MAPSCRIPT = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpqy9OAuQzG4romb7bpYtd56ruohzG7M0&sensor=false&callback=maploaded";
		     
		     function map()
		     {
		    	 var self=this;
		    	 
		    	 this.init = function(){
		    		 
		    		 log.info('Map screen initialized');
		    		 
		    		 $( MAP ).on( "pageshow", this.show);
		    		 $( MAP ).on( "pagehide", this.hide);
		    		 
		    	 };
		    	 
		    	 this.show = function(){
		    		 //Load the current session data
		    		 if(session.currentSearching === 'from'){
		    			 $(LOCATION).val(session.from);
		    		 }else{
		    			 $(LOCATION).val(session.to);
		    		 }
		    		 
		    		 //Linking the events
		    		 $(DONE).click(function(e){
		    			 e.stopImmediatePropagation();
		    			 e.preventDefault();
		    			 if(session.currentSearching === 'from'){
			    			 session.from = $(LOCATION).val();
			    		 }else{
			    			 session.to = $(LOCATION).val();
			    		 }	   
		    			 $.mobile.changePage('home.html');
		    		 });
		    		 
		    		 $(FINDME).click(function(e){
		    			 e.stopImmediatePropagation();
		    			 e.preventDefault();
		    			 navigator.geolocation.getCurrentPosition(self.onGeolocationSuccess, 
		    					                           self.onGeolocationError,
		    					                           {enableHighAccuracy: true });
		    		 });
		    		 
		    		 $('#' + MAPCANVAS).css('height',self.idealMapHeight());
		    		 
		    		
		    		 
		    		 if(typeof google === "undefined" && meteron.isNetworkAvailable())
		    		 {
		    		     //The google map script has not yet been loaded
		    			 //This will call global maploaded function
		    			 iam( "", [MAPSCRIPT] , function(){} );
		    		 }
		    		 else if(typeof google !== "undefined" && meteron.isNetworkAvailable()) {
		    			 self.googlemaps(MAPCANVAS);
		    		 }
		    		 else
		    		 {
		    			 //Network is not available
		    			 session.showInfo = {
			    				 type:"error",
			    				 title:"Network connection error",
			    				 message:"No network connection available to " +
			    				 		"access maps",
			    				 url:"home.html"
			    		 };
		    			 $.mobile.changePage( "dialog.html", { role: "dialog" } );
		    			 
		    		 }
		    		 
		    		 log.info('Map page loaded');
		    		 
		    	 };
		    	 
		    	 this.hide = function(){
		    		 $(DONE).unbind();
		    		 $( MAP ).off( "pageshow", self.show);
		    		 $( MAP ).off( "pagehide", self.hide);
		    		 
		    		 log.info('Map page hidden');
		    	 };
		    	 
		    	 this.googleMapsLoaded = function()
		    	 {
		    		 self.googlemaps(MAPCANVAS);
		    		 log.info("Google map scripts loaded");
		    	 };
		    	 
		    	 /*!
				 * This function will set up the google maps.
				 */
				this.googlemaps = function( id )
				{
					this.mapOptions = {
							center: new google.maps.LatLng(-34.397, 150.644),
							zoom: 8,
							mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					this.map = new google.maps.Map(document.getElementById(id), this.mapOptions);
				};
				
				this.idealMapHeight = function(){
				    var context = $(MAP);	
					var unimportantHeight = $( "div[data-role='header']" ,context ).first().outerHeight(true); 
					unimportantHeight += $( "div[data-role='footer']",context ).first().outerHeight(true);
					var elementheight = ($("div[data-role='fieldcontain']",context).first().outerHeight(true); 
				    elementheight += $(".ui-grid-a",context).first().outerHeight(true));
					return ( $(window).outerHeight(true) - (unimportantHeight + elementheight));
				}
				
				this.onGeolocationSuccess = function(position)
				{
					var myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					
					
					log.info('Latitude: '          + position.coords.latitude          + '\n' +
					          'Longitude: '         + position.coords.longitude         + '\n' +
					          'Altitude: '          + position.coords.altitude          + '\n' +
					          'Accuracy: '          + position.coords.accuracy          + '\n' +
					          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
					          'Heading: '           + position.coords.heading           + '\n' +
					          'Speed: '             + position.coords.speed             + '\n' +
					          'Timestamp: '         + position.timestamp                + '\n');
										
					self.map.setCenter(myLatlng);
					 
					self.marker = new google.maps.Marker({
					      position: myLatlng,
					      map: self.map,
					      title: 'Current location'
					  });

				};
				
				this.onGeolocationError = function(error)
				{
					log.error('code: '    + error.code    + '\n' +
			                  'message: ' + error.message + '\n');
				};
		    	 
		    	
		     }
		     
		     return new map();
	})();
	return map;
});