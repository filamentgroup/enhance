/*! app: a progressive enhancement bootstrapper. Copyright 2012 @scottjehl, Filament Group, Inc. Licensed MIT/GPLv2 */
(function( w, undefined ) {
	
	// Enable JS strict mode
	"use strict";

	var doc = w.document,
		docElem = doc.documentElement,
		head = doc.head || doc.getElementsByTagName( "head" )[ 0 ];
	
	//app object for app-specific functions
	w.app = {};
	
	// hasClass function - check if element has a class
	app.hasClass = function( elem, cls ){
		return elem.className.indexOf( cls ) >= -1
	}
	
	// IE browser flags, based on conditional comments	
	app.oldIE = app.hasClass( docElem, "ieOld" );
	app.ie8 = app.hasClass( docElem, "ie8" );
	
	// Callback for running logic dependent on a property being defined
	// You can use isDefined to run code as soon as the document.body is defined, for example, for body-dependent scripts
	// or, for a script that's loaded asynchronously that depends on other scripts, such as jQuery.
	// First argument is the property that must be defined, second is the callback function
	app.onDefine = function( prop, callback ){
		var callbackStack 	= [];
		
		if( callback ){
			callbackStack.push( callback );
		}
		
		function checkRun(){
			if( eval( prop ) ){
				while( callbackStack[0] && typeof( callbackStack[0] ) === "function" ){
					callbackStack.shift().call( w );
				}
			}
			else{
				setTimeout(checkRun, 15); 
			}
		};
		
		checkRun();
	};
	
	// shortcut of isDefine body-specific 
	app.bodyready = function( callback ){
		app.onDefine( "document.body", callback );
	};
	
	
	//private style load function
	function css( href, media ){
		var lk = doc.createElement( "link" ),
			links = head.getElementsByTagName( "link" ),
			lastlink = links[ links.length-1 ];
			
		lk.type = "text/css";
		lk.href = href;
		lk.rel = "stylesheet";
			
		if( media ){
			lk.media = media;
		}
		if( lastlink && lastlink.nextSibling ){
			head.insertBefore(lk, lastlink.nextSibling );
		}
		else {
			head.appendChild( lk );
		}
	};
	
	// Private script load function
	function js( src ){
		var script = doc.createElement( "script" ),
			fc = head.firstChild;
			script.src = src;

		if( fc ){
			head.insertBefore(script, fc );
		} else {
			head.appendChild( script );
		}
	};	
	
	// Define base directory paths for referencing js, css, img files. Optional.
	app.basepath = {
		js	: "",
		css	: ""
	};
	
	// Define arrays to contain JS and CSS files that are available
	app.files = {		
		js: {},
		css: {}
	};	
	
	// Define arrays to contain JS and CSS files that will be loaded
	app.jsToLoad = [];
	app.cssToLoad = [];
	
	// Function for adding files to the queue for loading. 
	// CSS or JS is discovered by file path. 
	// Files should not include base paths, if already defined in app.basepath.
	app.addFile = function( file ){
		var js = file.indexOf( ".js" ) > -1;
		app[ js ? "jsToLoad" : "cssToLoad" ].push( app.basepath[ js ? "js" : "css" ] +  file );
	};
	
	// CSS and JS loading functions: load CSS or JS via single app.load method
	app.load = function ( url ){
		return ( url.indexOf( ".js" ) > -1 ? js : css )( url );
	};
	
	// Function for triggering the CSS and JS requests
	app.enhance = function(){
		if( app.jsToLoad.length ){
			app.load( app.jsToLoad.join(",") + "=concat" );
		}
		if( app.cssToLoad.length ){
			app.load( app.cssToLoad.join(",") + "=concat"  );
		}
	};

}( this ));