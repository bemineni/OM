//OM
//Srikanth Bemineni
iam('splash',['js/meteron.js','js/log.js'],function(meteron,log){
		"use strict";
		
	var splash = (function(){
		
		    
		     var PAGE = '#splash';
		     var appSettings = null;
		     var timerid;
		     function splash()
		     {
		    	 this.init = function(){
		    		 
		    		 log.info('Splash initialized');
		    		 appSettings = meteron.settings();
		    		 $('img',$(PAGE)).css('margin-top',(appSettings.windowHeight/4));
		    		 timerid = setInterval(function(){
		    			 clearInterval(timerid);
		    			 $.mobile.changePage('home.html',{});
		    		 },1000);
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