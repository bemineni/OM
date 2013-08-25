//OM
//Srikanth Bemineni srikanth.bemineni@gmail.com
iam( 'Log' ,[] , function(){
	"use strict";

	var Log  = (function(){
		var console;
		function Log()
		{
			console =  window.console ? window.console : null;

			this.error = function(message){
				if(console)
					console.error(message);
			};

			this.warn = function(message){
				if(console)
					console.warn(message);
			};

			this.info = function(message){
				if(console)
					console.info(message);

			};
			
			this.log = function(message){
				if(console)
					console.log(message);
			};
		}

		return new Log();

	})();

	return Log;

});