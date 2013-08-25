//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com

iam('splash',['js/meteron.js','js/log.js'],function(meteron,log){
		"use strict";
		
	var splash = (function(){
		
		    
		     var PAGE = '#splash';
		     var appSettings = null;
		     var timerid;
		     function splash()
		     {
		    	 var self = this; 
		    	 this.init = function(){
		    		 
		    		 log.info('Splash initialized');
		    		 appSettings = meteron.settings();
		    		 //$('img',$(PAGE)).css('margin-top',(appSettings.windowHeight/4));
		    		 $( PAGE ).on( "pageshow", this.show);
		    		 $( PAGE ).on( "pagehide", this.hide);
		    		 //We will miss the first pageshow. so starting for the
		    		 //first time is necessary 
		    		 this.starttimer();
		    	 };
		    	 
		    	 this.show = function(){
		    		 self.starttimer(); 
		    		 log.info('splash page loaded');
		    	 };
		    	 
		    	 this.hide = function(){
		             //dont ever off the pageshow and pagehide events
		    		 //all these contents are in the main index.html
		    		 //These will be always loaded
		    		 log.info('splash page hidden');
		    	 };
		    	 
		    	 this.starttimer = function(){
		    		 timerid = setInterval(function(){
		    			 clearInterval(timerid);
		    			 $.mobile.changePage('home.html',{});
		    		 },1000);
		    	 }
		     }
		     
		     return new splash();
	})();
	return splash;
});