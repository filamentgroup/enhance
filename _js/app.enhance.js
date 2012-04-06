/*
	app.enhance: this site-specific file uses the app.js api to:
		 * determine whether a browser is qualified for enhancements
		 * define available CSS and JS assets
		 * test features and device conditions and environment to determine which files to load
		 * load those files via a single concatenated call
*/
(function( win ){
	//re-reference app var locally
	var app = win.app;
	
	//basic browsers: last stop here!
	if( !"querySelectorAll" in win.document ){
		return;
	}
	
	// Configure css and js paths
	app.basepath.js = "_js/";
	app.basepath.css = "_css/";
	
	// Define potential JS files for loading
	app.files.js = {
		//foo	: "bar.js"
	};
	
	// Define potential CSS files for loading
	app.files.css = {
		//foo		: "bar.css"
	};
	
	// Start queueing files for load. 
	// Pass js or css paths one at a time to app.addFile 
	// Example:
	// app.addFile( app.files.js.foo );
	// app.addFile( app.files.css.foo );
	
	// Note: if you need to use hasClass to check if the body element has a class or not,
	// wrap all remaining logic in a call to app.bodyready
	
	// Load the files
	app.enhance();

}( window ));