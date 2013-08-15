//OM

iam('splash',['js/log.js'],function(log){
		"use strict";
		
	var splash = (function(){
		
		    
		     function splash()
		     {
		    	 this.init = function(){
		    		 log.info('Splash initialized');
		    		 alert('splash initialized');
		    	 };
		    	 
		    	 this.load = function(){
		    		 
		    	 };
		    	 
		    	 this.unload = function(){
		    		 
		    	 };
		     }
		     
		     return new splash();
	})();
	return splash;
});