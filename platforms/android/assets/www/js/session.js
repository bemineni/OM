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
		    		 this.long = '';
		    		 
		    		 this.lat = '';
		    		 
		    		 this.from = '';
		    		 
		    		 this.to = '';
		    		 
		    		 this.currentSearching = 'from';
		    		 
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