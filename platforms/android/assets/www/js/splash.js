//OM

iam('splash',['js/log.js'],function(log){
		"use strict";
		
	var splash = (function(){
		
		    
		     var PAGE = '#splash';
		     function splash()
		     {
		    	 this.init = function(meteron){
		    		 
		    		 log.info('Splash initialized');
		    		 $(PAGE).css('height',meteron.settings().windowHeight);
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