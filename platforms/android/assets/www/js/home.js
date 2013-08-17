//OM

iam('home',['js/meteron.js','js/log.js'],function(meteron,log){
		"use strict";
		
	var home = (function(){
		
		    
		     function home()
		     {
		    	 this.init = function(){
		    		 
		    		 log.info('Home screen initialized');
		    	 };
		    	 
		    	 this.load = function(){
		    		 
		    	 };
		    	 
		    	 this.unload = function(){
		    		 
		    	 };
		     }
		     
		     return new home();
	})();
	return home;
});