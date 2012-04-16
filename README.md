# app 

A progressive enhancement bootstrapping utility and pattern.

App is a small framework designed to determine if a browser is qualified for enhancements, and load specific enhancements for that browser via a single, concatenated request (one for CSS and one for JavaScript).


* Copyright 2012 @scottjehl, @beep, @wilto, @maggiewachs, Filament Group, Inc. 
* Dual license: MIT or GPLv2

## API

All of `app`'s api is available via `window.app` or just `app`. From `app`, you can access the following publicly:



### Configuration Properties

- `files`: an object consisting of two empty child objects: `js` and `css`. These two objects are empty by default, and are intended for storing references to CSS** and JavaScript files that will potentially be loaded. You can reference them like so:

		// list of available JS files
		app.files.js = {
			jQuery: "js/jquery.js",
			touchNormalization: "touch.js",
			uiLogic: "js/myapp.js"
		};
		
		// list of available CSS files
		app.files.css = {
			accountPanel: "css/account.css"
		};
		

- `basepath`: an object consisting of two empty strings: `js` and `css`. These can be used to store optional base file paths to CSS and JS directories. When in use, you can exclude those paths from references to files in `app.files.js` and `app.files.css`. Example:

		// reference to base javascript filepath
		app.basepath.js = "assets/js/";
		
		// reference to base CSS filepath
		app.basepath.css = "assets/css/";
		




### Methods

- `hasClass`: check whether an element has a particular class or not. Returns a boolean result. Example:

		// check if HTML element has class of "ie8"
		app.hasClass( document.documentElement, "home" );
		--> true | false

- `onDefine`: run a callback function as soon as a JS property is defined. Accepts 2 arguments: a string to be evaluated for definition, and a callback function to execute when that first string becomes defined. `onDefine` might be used to run a script when an element is ready for manipulation, such as checking if the `body` element has a particular class. Example:

		app.onDefine( "document.body", function(){
			if( app.hasClass( document.body, "home" ) ){
				// the body element has a class of "home"...
			}
		});
	In a pinch, `onDefine` could also be used to delay code execution until another JS file has loaded and executed.

- `bodyready`: run a callback function when the body element is defined. Accepts one argument: a callback function to execute when the `body` element becomes defined. This is merely a shortcut to the `onDefine` example above. Example:

		app.bodyReady( function(){
			if( app.hasClass( document.body, "home" ) ){
				// the body element has a class of "home"...
			}
		} );

- `addFile`: add a CSS or JavaScript file to the queue for loading. This method accepts one argument, a string reference to a file. Example:

		app.addFile( "js/foo.js" );
		app.addFile( "css/foo.css" );

- `enhance`: load all queued CSS and JavaScript files via a single, concatenated request (per language). Example:

		app.enhance();




### Additional Methods

App has a few more methods that you might use.

- `load`: Load a single CSS** or JavaScript file. This method accepts one argument, a string reference to a file. The type of file is determined by file extension. Example:

		// Load a single css file
		app.load( "files/css/foo.css" );
		
		// Load a single JavaScript file
		app.load( "files/js/foo.js" );
	

- `js`: Load a single JavaScript file. Useful if JS filetype can not be guessed by filetype. Example:

		// Load a single JavaScript file
		app.css( "files/js/foo.php" );


- `css`: Load a single CSS file**. Useful if JS filetype can not be guessed by filetype. Example:

		// Load a single CSS file
		app.css( "files/css/foo.php" );


** Note: dynamically loaded CSS is not guaranteed to render before the page content begins visually rendering (and thus, can cause a FOUC). Don't depend on it for styles that need to be there during initial page load.


## Typical workflow

While the `app` utility is very simple by itself; its real value is in the workflows it enables.

Typically, a site that uses `app` will have two files driving the progressive enhancement process: `app.js`, and a custom file that uses the `app` API to configure and enhance the user experience: for example purposes, `app.enhance.js`. The role of `app.enhance.js` is to determine if – and with which files – a browser's experience should be enhanced. Within `app.enhance.js`, any of the following steps might be taken:

* Determine if a browser is generally qualified enhancements and if not, exit early (perhaps by testing `document.querySelectorAll` support, or CSS3 Media Queries, or otherwise)
* Establish the CSS and JS files available for loading.
* Add certain CSS and JS files to the queue for loading based on various environmental conditions, browser capabilities, screen size, markup conditions, and more.
* Enhance the page by loading those files via a single, concatenated request.

For an example of this process, see the `app.enhance.js` file in the `_demo` folder.

## Further notes.

tbd...

### Loading from `head` vs. dynamic loading. When to use each.

### Managing dependencies between files

### Concatenating files


