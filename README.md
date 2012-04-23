#Enhance.js

`Enhance.js` is a small JavaScript framework designed to help developers determine if a browser is qualified for enhancements, and load specific enhancements for that browser via a single, concatenated request (one for CSS and one for JavaScript).

* Copyright 2012 @scottjehl, @beep, @wilto, @maggiewachs, and Filament Group, Inc. 
* Dual license: MIT or GPLv2

## API

All of the Enhance api is available via `window.ejs` or just `ejs`. From `ejs`, you can access the following publicly:



### Configuration Properties

- `files`: an object consisting of two empty child objects: `js` and `css`. These two objects are empty by default, and are intended for storing references to CSS** and JavaScript files that will potentially be loaded. You can reference them like so:

		// list of available JS files
		ejs.files.js = {
			jQuery: "js/jquery.js",
			touchNormalization: "touch.js",
			uiLogic: "js/myapp.js"
		};
		
		// list of available CSS files
		ejs.files.css = {
			accountPanel: "css/account.css"
		};
		

- `basepath`: an object consisting of two empty strings: `js` and `css`. These can be used to store optional base file paths to CSS and JS directories. When in use, you can exclude those paths from references to files in `ejs.files.js` and `ejs.files.css`. Example:

		// reference to base javascript filepath
		ejs.basepath.js = "assets/js/";
		
		// reference to base CSS filepath
		ejs.basepath.css = "assets/css/";
		




### Methods

- `hasClass`: check whether an element has a particular class or not. Returns a boolean result. Example:

		// check if HTML element has class of "ie8"
		ejs.hasClass( document.documentElement, "home" );
		--> true | false

- `onDefine`: run a callback function as soon as a JS property is defined, such as an HTML element like `body` that may not  have loaded at execution time. Accepts 2 arguments: a string to be evaluated for definition, and a callback function to execute when that first string becomes defined. `onDefine` might be used to run a script when an element is ready for manipulation, such as checking if the `body` element has a particular class. Example:

		ejs.onDefine( "document.body", function(){
			if( ejs.hasClass( document.body, "home" ) ){
				// the body element has a class of "home"...
			}
		});
	In a pinch, `onDefine` could also be used to delay code execution until another JS file has loaded and executed.
	
	_note_: `onDefine` uses asynchronous timing, so if you need to use it during your qualification and enhancement process, you'll need to ensure any  logic that depends on the result of that callback executes afterwards, which can be acheived by wrapping it all in the `onDefine` callback.

- `bodyReady`: run a callback function when the `body` element is defined. Accepts one argument: a callback function to execute when the `body` element becomes defined. This is merely a shortcut to the `onDefine` example above. Example:

		ejs.bodyReady( function(){
			if( ejs.hasClass( document.body, "home" ) ){
				// the body element has a class of "home"...
			}
		} );
	_note_: `bodyReady` uses asynchronous timing, so if you need to use it during your qualification and enhancement process, you'll need to ensure any  logic that depends on the result of that callback executes afterwards, which can be acheived by wrapping it all in the `bodyReady` callback.

- `addFile`: add a CSS or JavaScript file to the queue for loading. This method accepts one argument, a string reference to a file. Example:

		ejs.addFile( "js/foo.js" );
		ejs.addFile( "css/foo.css" );

- `enhance`: load all queued CSS and JavaScript files via a single, concatenated request (per language). Example:

		ejs.enhance();




### Additional Methods and Properties

Enhance has a few more methods and properties that you might use in more complicated scenarios.

- `load`: Load a single CSS** or JavaScript file. This method accepts one argument, a string reference to a file. The type of file is determined by file extension. Example:

		// Load a single css file
		ejs.load( "files/css/foo.css" );
		
		// Load a single JavaScript file
		ejs.load( "files/js/foo.js" );
	

- `loadJS`: Load a single JavaScript file.  This method accepts one argument, a string reference to a file. Useful if JS filetype can not be guessed by filetype. Example:

		// Load a single JavaScript file
		ejs.loadJS( "files/js/foo.php" );


- `loadCSS`: Load a single CSS file**.  This method accepts one argument, a string reference to a file. Useful if JS filetype can not be guessed by filetype. Example:

		// Load a single CSS file
		ejs.loadCSS( "files/css/foo.php" );

- `jsToLoad`: an array of JavaScript files currently in the queue for loading.
- `cssToLoad`: an array of CSS files currently in the queue for loading.

** Note: dynamically loaded CSS is not guaranteed to render before the page content begins visually rendering (and thus, can cause a FOUC). Don't depend on it for styles that need to be there during initial page load.


## Typical workflow

While the Enhance core utility is very simple by itself; its real value is in the workflows it enables.

Check out [the Southstreet project](https://github.com/filamentgroup/Southstreet) for an overview.



