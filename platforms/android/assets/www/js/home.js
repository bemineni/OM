//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com
iam('home',['js/meteron.js','js/log.js', 'js/session.js'],
		function(meteron,log,session){
		"use strict";
		
	var home = (function(){
		
		     var HOME = '#home';
		     var FROMBUTTON = '#from-search';
		     var TOBUTTON = '#to-search';
		     
		     function home()
		     {
		    	 var self=this;
		    	 
		    	 this.init = function(){
		    		 
		    		 log.info('Home screen initialized');
		    		 
		    		 $( HOME ).on( "pageshow", this.show);
		    		 $( HOME ).on( "pagehide", this.hide);
		    	 };
		    	 
		    	 this.show = function(){
		    		 //Load the current session data
		    		 
		    		 //Linking the events
		    		 $(FROMBUTTON).click(function(e){
		    			 e.stopImmediatePropagation();
		    			 e.preventDefault();
		    			 session.currentSearching = 'from';
		    			 $.mobile.changePage('map.html');
		    		 })
		    		 
		    		 $(TOBUTTON).click(function(e){
		    			 e.stopImmediatePropagation();
		    			 e.preventDefault();
		    			 session.currentSearching = 'from';
		    			 $.mobile.changePage('map.html');
		    		 })
		    		 log.info('home page loaded');
		    		 
		    	 };
		    	 
		    	 this.hide = function(){
		    		 $(FROMBUTTON).unbind();
		    		 $(TOBUTTON).unbind();
		    		 $( HOME ).off( "pageshow", self.show);
		    		 $( HOME ).off( "pagehide", self.hide);
		    		 log.info('home page hidden');
		    		 
		    	 };
		    	 
		    	 function preparebutton(icon,href,text)
		    	 {
		    		 var a = $(document.createElement('a'));
		    		 $(a).attr('href',href);
		    		 $(a).attr('data-inline',true);
		    		 $(a).attr('data-role','button');
		    		 $(a).attr('data-icon','search');
		    		 $(a).attr('data-iconpos','notext');
		    		 $(a).value('search');
		    		 return a;
		    		  
		    	 }
		     }
		     
		     return new home();
	})();
	return home;
});