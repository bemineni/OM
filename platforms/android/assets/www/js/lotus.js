//									OM
/*!
 * Lotus is a simple module loader. 
 * @author Srikanth Bemineni srikanth.bemineni@gmail.com
 * 
 */
var lotus,iam;

(function(global){

	"use strict";

	/*! 
	 * List of all the modules 
	 */
	var _modules={};

	/*!
	 *  loaded script which is loaded using iam but
	 *  not yet processed.
	 */
	var loadedModule;

	/*!
	 *  Unprocessed module whose script is not yet loaded.
	 */
	var unprocessedQueue = [];

	/*! 
	 * The head html element 
	 */
	var head = document.getElementsByTagName('head')[0];

	/*!
	 * The lotus module configuration
	 */
	var config = {};

	/*! Module storage structure */
	function module()
	{
		/*! If the script DOM object is loaded */
		this.loaded = false;

		/*! This module depends on */
		this.depends = {};

		/*! num dependent module loaded */
		this.num_dependents_loaded = 0; 

		/*! File name of the module or text file that is loaded */
		this.fileName = "";
		
		/*! Just keeping the reference to the callback*/
		this.callBack = null;

		/*! The instance after it is loaded */
		this.instance = null;

		/*! The class name of the module Id */ 
		this.className = "";

		/*! The text content if this is a text file */
		this.text = null;

		/*! This variable indicates if this module's call back was
		 * initialized or not.
		 */
		this.initialized = false;
	}


	iam = function( name , needs , callback  )
	{

		if(!(callback instanceof Function))
			return;
			
		loadedModule={ depends : needs ,
                	   callBack: callback,
                	   className:name };
			
	}

	lotus = function( conf , needs , callBack)
	{
		// We will have one main lotus module.
		var mod = new module();
		mod.loaded = true;
		mod.depends = needs;
		mod.callBack = callBack;
		mod.className = "_lotusmain";
		
		//We will directly add the first module
		//called using the lotus call.
		_modules[mod.className] = mod;

		//Lets load all the dependencies
		var params =  prepareDependents(mod);

		if( params.length == mod.depends.length )
		{
			mod.instance = createModule(mod,params);
			mod.initialized = true;
		}
		else
		{
			//There are some modules that needs to loaded
			processModules();		
		}
		
			
	}


	/*! 
	 * ************************************************************************
	 * Utilities 
	 * ************************************************************************
	 */

	/*!
	 * Prepare for dependents
	 */
	function prepareDependents(mod)
	{
		var allloaded = true;
		var paramstoPass = [];
	
		//There are some modules which are not yet loaded
		var i =0;
		var depmod = null;
		for( ; i < mod.depends.length ; i++ )
		{
			depmod  = mod.depends[i];
			if(_modules[depmod] == null && !is_module_getting_processed(depmod))
			{
				unprocessedQueue.push({ modulesrc:depmod,
					context:mod.context });
				allloaded = false;		
			}
			else if( _modules[depmod] != null && 
					_modules[depmod].loaded &&
					_modules[depmod].initialized &&
					allloaded)
			{
				paramstoPass.push(_modules[depmod].instance);
			}
			else
			{
				//Dependent module dependencies are not yet loaded
				allloaded = false;
			}
		}

		if(!allloaded)
		{
			paramstoPass = [];
		}

		return paramstoPass;
	}

	function is_module_getting_processed(depmod)
	{
		return (unprocessedQueue.indexOf(depmod) != -1);
	}

	/*!
	 * This function will create the dependent instances and 
	 * executes this modules.
	 */
	function createModule(mod , params)
	{
		return mod.callBack.apply(null, params);
	}

	function check_if_Dependent_Modules_Loaded(module)
	{
		var allLoaded = true;
		//check if these dependent modules are loaded
		for(needs_module in module.depends)
		{
			if(_modules.hasOwnProperty(needs_module))
			{
				module.num_dependents_loaded++;
			}
			else
			{
				allLoaded = false;
			}
		}

		return allLoaded;
	}

	function onLoadSucess(evt)
	{
		var scriptnode = evt.currentTarget || evt.srcElement;
		scriptnode.removeEventListener('load', onLoadSucess , false);
		scriptnode.removeEventListener('onreadystatechange', onLoadSucess, false);
		scriptnode.removeEventListener('error', onLoadError , false);
		var loadComplete = false;
		var mod = null;

		/*
		 * By this time iam in the module would have loaded.
		 * The loadedModule contains the initialized module.
		 * If the loadModule is empty, then script doesn't contain
		 * the iam module. 
		 */
		if(loadedModule)
		{
			/*
			 * check if this loaded module's dependencies are all loaded.
			 */ 
			//Lets create a new module
			mod = new module();
			mod.depends = loadedModule.depends;
			mod.callBack = loadedModule.callBack;
			mod.loaded = true;
			mod.className = loadedModule.className;
			mod.fileName = scriptnode.getAttribute('data-module');
			_modules[mod.fileName] = mod;
		
		    //Lets check if all the dependent modules are loaded an get 
			//the params
			var params = prepareDependents(mod);
			if( params.length == mod.depends.length )
			{
					mod.instance = createModule(mod,params);
					mod.initialized = true;
					loadComplete = true;
			}
		}


		if(loadComplete)
		{
			/* 
			 * If so, then call all dependent modules which are waiting for 
			 * this to complete  
			 * Fill up the dependencies if the other modules are waiting
			 * for this module and initialize that module
			 */
			callAllDepedendentModules(mod.fileName);
		}

		/*
		 * We will process the next module if exists
		 */
		processModules();
	}
	
	
	function callAllDepedendentModules()
	{
		var i = 0;	
		var mod = null;
		var keys = getKeys(_modules);
		while ( i < keys.length )
		{
		   	mod  = _modules[keys[i]];
		   	if(mod && !mod.initialized)
		   	{
		   		var params = prepareDependents(mod);
		   		if( params.length == mod.depends.length )
				{
					mod.instance = createModule(mod,params);
					mod.initialized = true;
					//we will reset the index to start from first
					i = 0;
					continue;
				}
		   	}
		   	i++;
		}
	}

	function processModules()
	{
		if(unprocessedQueue.length != 0)
		{
			//We will process all the scripts one by one.
			var mod = unprocessedQueue.shift();
			loadModule(mod);
			loadedModule = null;
		}
	}

	function onLoadError()
	{

	}


	function loadModule( mod )
	{

		var scriptnode =  document.createElement('script');
		scriptnode.type = 'text/javascript';
		scriptnode.charset = 'utf-8';
		scriptnode.async = true;
		scriptnode.src = mod.modulesrc;
		scriptnode.addEventListener('load', onLoadSucess, false);
		scriptnode.addEventListener('onreadystatechange', onLoadSucess, false);
		scriptnode.addEventListener('error', onLoadError, false);
		//for future if we want aliases
		scriptnode.setAttribute('data-module', mod.modulesrc );
		head.appendChild(scriptnode);
	}
	
	
	function removeListener(node, func, name, ieName) {
      
        if (node.detachEvent && !isOpera) {

            if (ieName) {
                node.detachEvent(ieName, func);
            }
        } else {
            node.removeEventListener(name, func, false);
        }
    }


	function isFunction(it) {
		return Object.prototype.toString.call(it) === '[object Function]';
	}

	function isArray(it) {
		return Object.prototype.toString.call(it) === '[object Array]';
	}
	
	function getKeys(obj)
	{
	   var keys = [];
	   for(var key in obj)
	   {
		   if (obj.hasOwnProperty(key))
			   keys.push(key);
	   }
	   return keys;
	}

})(this);








