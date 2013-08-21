//OM

iam('map',['js/meteron.js','js/log.js', 'js/session.js'],
		function(meteron,log,session){
		"use strict";
		
	var map = (function(){
		
		     var MAP = '#map';
		     var DONE = '#done';
		     var LOCATION = '#location';
		     var MAPCANVAS = 'map-canvas';
		     var FINDME = '#find-me';
		     
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
		    			 navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError);
		    		 });
		    		 
		    		 var canvasHeight = self.idealContentHeight()-$("div[data-role='fieldcontain']").first().outerHeight(true);
		    		 $('#' + MAPCANVAS).css('height',canvasHeight);
		    		 
		    		 self.googlemaps(MAPCANVAS);
		    		 
		    		 log.info('Map page loaded');
		    		 
		    	 };
		    	 
		    	 this.hide = function(){
		    		 $(DONE).unbind();
		    		 $( MAP ).off( "pageshow", self.show);
		    		 $( MAP ).off( "updatelayout", self.load);
		    		 $( MAP ).off( "pagehide", self.hide);
		    		 
		    		 log.info('Map page hidden');
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
				
				this.idealContentHeight = function(){
					
					var unimportantHeight = $( "div[data-role='header']" ).first().outerHeight(true) + $( "div[data-role='footer']" ).first().outerHeight(true);
					var contentHeight = $('body').outerHeight() - unimportantHeight;
					return contentHeight;
				}
				
				function onGeolocationSuccess(position)
				{
					
				}
				
				function onGeolocationError(error)
				{
					
				}
		    	 
		    	
		     }
		     
		     return new map();
	})();
	return map;
});