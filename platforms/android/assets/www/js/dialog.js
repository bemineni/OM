//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com
iam('dialog',['js/log.js', 'js/session.js'],
		function(log,session){
		"use strict";
		
	var Dialog = (function(){
		
		     var DIALOGID= '#adialog';
		     var TITLE = '#title';
		     var MESSAGE = '#message';
		     var OKBUTTON = '#dialog-ok';
		     function Dialog()
		     {
		    	 var self=this;
		    	 
		    	 this.init = function(){
		    		 
		    		 log.info('Dailog initialized');
		    		 
		    		 $( DIALOGID ).on( "pageshow", this.show);
		    		 $( DIALOGID ).on( "pagehide", this.hide);
		    		 
		    	 };
		    	 
		    	 this.show = function(){
		    		 //Load the current session data
		    		 var dialog = $(DIALOGID);
		    		 var icon = "info"; 
		    		 if(session.showInfo.type === 'error')
		    		 {
		    			 icon = "delete";
		    		 }
		    		 else if(session.showInfo.type === 'alert')
		    		 {
		    		     icon = "alert";	 
		    		 }
		    		 
		    		 $(TITLE , dialog).parent().prepend('<div style="display:inline;" class ="ui-icon ui-icon-' + icon + '"></div>');
		    		 $(TITLE , dialog).html(session.showInfo.title);
		    		 $(MESSAGE ,dialog).html(session.showInfo.message);
		    		 $(OKBUTTON,dialog).attr("href", session.showInfo.url);
		    		 
		    		 log.info('Dialog loaded');
		    		 
		    	 };
		    	 
		    	 this.hide = function(){
		    		 $( DIALOGID ).off( "pageshow", self.show);
		    		 $( DIALOGID ).off( "pagehide", self.hide);
		    		 
		    		 log.info('Dialog hidden');
		    	 };
		     }
		     
		     return new Dialog();
	})();
	return Dialog;
});
	
		    	 