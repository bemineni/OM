//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com

//Because of stupid google maps call api
function maploaded()
{
	iam("",['js/map.js'],function(map){
		google.maps.visualRefresh = true;
		map.googleMapsLoaded();
	});
}

iam('map',['js/meteron.js','js/log.js', 'js/session.js'],
		function(meteron,log,session){
		"use strict";
		
	var map = (function(){
		
		     var MAP = '#map';
		     var DONE = '#done';
		     var INPUTOVERLAY = '#inputoverlay';
		     var LOCATION = '#location';
		     var OVERLAYLOCATION = '#overlay-location';
		     var OVERLAYINPUTSET = '#overlay-inputset';
		     var OVERLAYDYNAMIC  ='#overlaydynamic';
		     var OVERLAYDONE = '#overlay-done';
		     var PREDICTIONSLIST = '#predictions';
		     var LOCATIONID = 'location';
		     var MAPCANVAS = 'map-canvas';
		     var OVERLAY = "#overlay";
		     var FINDME = '#find-me';
		     var MAPSCRIPT = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpqy9OAuQzG4romb7bpYtd56ruohzG7M0&sensor=false&libraries=places&callback=maploaded";
		     
		     function map()
		     {
		    	 var self=this;
		    	 
		    	 /*!
		    	  * The current set marker on the map
		    	  */
		    	 this.marker = null;
		    	 
		    	 /*!
		    	  * The current user locations
		    	  */
		    	 this.currentMarker = null;
		    	 
		    	 /*!
		    	  * Google map object
		    	  */
		    	 this.map = null;
		    	 
		    	 /*!
		    	  * Info window to be show when a marker is
		    	  * clicked
		    	  */
		    	 this.infoWindow = null;
		    	 
		    	 /*!
		    	  * Current selected address from the prediction list
		    	  */
		    	 this.currentSelected = null;
		    	 
		    	 /*!
		    	  * Track timer;
		    	  */
		    	 this.timerId = null;
		    	 
		    	 
		    	 this.init = function(){
		    		 
		    		 log.info('Map screen initialized');
		    		 
		    		 //this is one time registration
		    		 
		    		 
		    		 $( MAP ).on( "pageshow", this.show);
		    		 $( MAP ).on( "pagehide", this.hide);
		    		 
		    	 };
		    	 
		    	 this.show = function(){
		    		 
		    		 directUrlToExternalBrowser("http://maps.google.com/maps" , 'on');
		    		 directUrlToExternalBrowser("http://www.google.com/intl", 'on');
		    		 
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
		    		 
		    		 //This is for the find me icon on the map
		    		 $(FINDME).click(function(e){
		    			 e.stopImmediatePropagation();
		    			 e.preventDefault();
		    			
		    			 
		    			 //Lets toggle
		    			 if($(this).hasClass($.mobile.activeBtnClass))
		    			 {
		    				 $(this).removeClass($.mobile.activeBtnClass);
		    				 clearInterval(self.timerId);
		    				 self.timerId = null;
		    			 }
		    			 else
		    			 {
		    				 $(this).addClass($.mobile.activeBtnClass);	 
		    				 //Lets start the timer
		    				 self.timerId = setInterval(function(){
		    					 navigator.geolocation.getCurrentPosition(self.onGeolocationSuccess, 
				                           self.onGeolocationError,
				                           {enableHighAccuracy: true });
		    				 },3000);
		    				 
		    			 }
		    			
		    		 });
		    		 
		    		 //Setting the Map,Overlay heights
		    		 $('#' + MAPCANVAS).css('height',self.idealMapHeight());
		    		 
		    		 //////////////////////////////////////////////////////
		    		 //OVERLAY settings
		    		 //////////////////////////////////////////////////////
		    		 $(OVERLAY).css('height',self.idealMapHeight());
		    		 $(OVERLAY).css('max-height',self.idealMapHeight());
		    		 $(OVERLAY).css('max-width',$(window).outerWidth(true));
		    		 $(INPUTOVERLAY).css('max-width',$(window).outerWidth(true));
		    		 $(OVERLAY).css('width',$(window).outerWidth(true));
		    		 $(INPUTOVERLAY).css('width',$(window).outerWidth(true));
		    		 $(OVERLAYINPUTSET,$(OVERLAY)).css('max-width',$(window).outerWidth(true));
		    		 $(OVERLAYINPUTSET ,$(OVERLAY)).css('width',$(window).outerWidth(true));
		    		 
		    		 //OVERLAYINPUTSET is absolute positioned so need to move the other
		    		 //content below that
		    		 $(OVERLAYDYNAMIC).css('margin-top', $(OVERLAYINPUTSET).first().outerHeight(true) + 10);
		    		 $(OVERLAY).hide();
		    		 		    			    		 
		    		 //OverLay show animation with after function
		    		 //Lets set the connections to the location focus to popup
		    		 //the overlay
		    		 $(LOCATION).focusin(function(){
		    			 $(OVERLAYLOCATION).val($(LOCATION).val());
		    			 $(OVERLAY).fadeIn(300,function(){
		    				 $(OVERLAYLOCATION).focus();
		    				 //On key press in the overlay input 
		    				 //we need to start predicting the text.
		    				 $(OVERLAYLOCATION).on("keyup",function(event){
				    			 //We will do prediction
				    			 self.predictFromText(this);
				    		 });
                             
		    			 });
		    		 });
		    		 
		    		 //Overlay hide animation 
		    		 $(OVERLAYDONE).click(function(){
		    			 $(LOCATION).val($(OVERLAYLOCATION).val());
		    			 $(OVERLAY).fadeOut(300,function(){
		    				 $(OVERLAYLOCATION).off("keyup");
		    				 self.setAddress();
		    			 });
		    		 });
		    		 
		    		 //When an address is selected from predicted text list.
		    		 $(document).on("click", "#predictions li",function(event){
		    			                   var target = event.currentTarget || event.srcElement;
		    			                   self.currentSelected = $(target).data('placeData');
		    			                   $(OVERLAYLOCATION).val(self.currentSelected.description);
		    			                   showPlaceInfo(self.currentSelected);
		    			            });
		    		 
		    		 
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
		    		 
		    		 directUrlToExternalBrowser("http://maps.google.com/maps" , 'off');
		    		 directUrlToExternalBrowser("http://www.google.com/intl", 'off');
		    		 
		    		 $(DONE).unbind();
		    		 if(self.timerId != null)
		    		 {
		    			clearInterval(self.timerId);
    				   	self.timerId = null;
		    		 }
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
							mapTypeId: google.maps.MapTypeId.HYBRID,
							mapTypeControl:false,
							scaleControl: false,
							panControl:false,
							zoomControl:false,
							streetViewControl:false
					};
					this.map = new google.maps.Map(document.getElementById(id), this.mapOptions);
					
					google.maps.event.addListener(this.map,'click',function(){
						log.info("Maps click event");
					});
					
					this.infoWindow = new google.maps.InfoWindow();
					
					//Once we set up the map elements we will track the user to his/her
					//current location in the map
					navigator.geolocation.getCurrentPosition(self.onGeolocationSuccess, 
	                           self.onGeolocationError,
	                           {enableHighAccuracy: true });

				};
				
				this.idealMapHeight = function(){
				    var context = $(MAP);	
					var unimportantHeight = $( "div[data-role='header']" ,context ).first().outerHeight(true); 
					unimportantHeight += $( "div[data-role='footer']",context ).first().outerHeight(true);
					return ( $(window).outerHeight(true) - unimportantHeight);
				}
				
				this.onGeolocationSuccess = function(position)
				{
					if( self.map != null )
					{
						self.myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					
					
						log.info('Latitude: '          + position.coords.latitude          + '\n' +
								 'Longitude: '         + position.coords.longitude         + '\n' +
								 'Altitude: '          + position.coords.altitude          + '\n' +
								 'Accuracy: '          + position.coords.accuracy          + '\n' +
								 'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
								 'Heading: '           + position.coords.heading           + '\n' +
								 'Speed: '             + position.coords.speed             + '\n' +
								 'Timestamp: '         + position.timestamp                + '\n');
										
						self.map.setCenter(self.myLatlng);
					 
						if(self.currentMarker == null)
						{
							self.currentMarker = new google.maps.Marker({
								position: self.myLatlng ,
								map: self.map,
								animation:google.maps.Animation.DROP,
								title: 'Current location',
								icon: 'img/bluespot.png'
							});
							
							google.maps.event.addListener(self.currentMarker, 'click', function() {
							    self.infoWindow.setContent(this.getTitle());
							    self.infoWindow.open(self.map, this);
							  });

						}
						else
						{
							self.currentMarker.setPosition(self.myLatlng );
						}
						
						
					}		

				};
				
				this.onGeolocationError = function(error)
				{
					log.error('code: '    + error.code    + '\n' +
			                  'message: ' + error.message + '\n');
				};
				
				this.predictFromText = function(textinput)
				{
					var mark = self.marker;

					if(mark == null)
						mark = self.currentMarker;
					
					
					if(mark)//If both or null
					{
						var autocomplt = { 
								location:mark.getPosition(),
								radius:50000,
								input:$(OVERLAYLOCATION).val()
						};

						var autocompleteserv = new google.maps.places.AutocompleteService();

						autocompleteserv.getPlacePredictions(autocomplt,function(results,status){
							$(PREDICTIONSLIST).html('');
							for(var i=0;i < results.length;i++)
							{
								var listItem = $('<li><a href="#">' + results[i].description + '</a></li>');
								$(listItem).data('placeData',results[i]);
								$(PREDICTIONSLIST).append(listItem);
							}
							$(PREDICTIONSLIST).listview('refresh');
						});
					}
					
					
				};
				
				this.setAddress = function(){
					if(this.currentSelected)
					{
						var placeService = new google.maps.places.PlacesService(this.map);
						placeService.getDetails({'reference':this.currentSelected.reference},function(PlaceResult, PlacesServiceStatus){
							if(PlacesServiceStatus =  google.maps.places.PlacesServiceStatus.OK)
							{
								self.marker = new google.maps.Marker({
									position: PlaceResult.geometry.location ,
									map: self.map,
									animation:google.maps.Animation.DROP,
									title: '<b>' + PlaceResult.name + '</b> <p>' +  PlaceResult.formatted_address + '</p>'
								});
								
								google.maps.event.addListener(self.marker, 'click', function() {
								    self.infoWindow.setContent(this.getTitle());
								    self.infoWindow.open(self.map, this);
								  });
								
								
								self.map.setCenter(PlaceResult.geometry.location);
							}
						})
					}
				};
				
				function showPlaceInfo(currentSelected)
				{
					if(currentSelected)
					{
						//TBD
						//we can show info window of the place selected 
					}
					
				}
				
				function directUrlToExternalBrowser(urlPattern , swtch) 
				{
					  var pattern = "a[href^='"+urlPattern+"']";//all urls starting with urlPattern
					  if(swtch === 'on')
					  {
					      $(document).on('click', pattern ,function(e){
					         e.preventDefault();
					         meteron.openUrl($(pattern));
					      
  					      });
					  }
					  else
					  {
						  $(document).off('click', pattern); 
					  }
				}
				
		    	 
		    	
		     }
		     
		     return new map();
	})();
	return map;
});