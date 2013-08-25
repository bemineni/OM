//OM

iam('session',['js/log.js'],function(log){
		"use strict";
		
	var session = (function(){
		
		     var SERVER = 'http://www.cabcalculator.com';
		     function session()
		     {
		    	 
		    	 this.init = function(){
		    		 
		    		 this.user = 'guest';
		    		 
		    		 //We have to get this from the GPS of the
		    		 //current device
		    		 /*! The current longitude */
		    		 this.long = '';
		    		 
		    		 /*! The current latitude */
		    		 this.lat = '';
		    		 
		    		 /*! User from location */
		    		 this.from = '';
		    		 
		    		 /*! User to location */
		    		 this.to = '';
		    		 
		    		 /*! This is for the maps. To search for 
		    		  * what kind of info in the map 
		    		  */
		    		 this.currentSearching = 'from';
		    		 
		    		  /* when we want to show a message to the user
		    		   * we need to fill this up 
		    		   */
		    		 this.showInfo = {
		    				 type:"",
		    				 title:"",
		    				 message:"",
		    				 url:""
		    		 };
		    		 
		    		 log.info('Session initialized');
		    	 };
		    		 
		    	this.setCurrentLocation = function(lat,long){
		    		this.long = long;
		    		this.lat = lat;
		    	};
		     }
		     
		     return new session();
	})();
	return session;
});