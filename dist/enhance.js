/*! enhance - v0.1.0 - 2015-11-03
* https://github.com/filamentgroup/enhance
* Copyright (c) 2015 Filament Group; Licensed MIT */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*! cookie function. get, set, or forget a cookie. [c]2014 @scottjehl, Filament Group, Inc. Licensed MIT */
(function(w){
	var cookie = function( name, value, days ){
		// if value is undefined, get the cookie value
		if( value === undefined ){
			var cookiestring = "; " + w.document.cookie;
			var cookies = cookiestring.split( "; " + name + "=" );
			if ( cookies.length === 2 ){
				return cookies.pop().split( ";" ).shift();
			}
			return null;
		}
		else {
			// if value is a false boolean, we'll treat that as a delete
			if( value === false ){
				days = -1;
			}
			var expires = "";
			if ( days ) {
				var date = new Date();
				date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
				expires = "; expires="+date.toGMTString();
			}
			w.document.cookie = name + "=" + value + expires + "; path=/";
		}
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = cookie;
	}
	else {
		w.cookie = cookie;
	}
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
// getMeta function: get a meta tag's content attr by its name
(function( w ){
  var getMeta = function( metaname ){
  	var metas = w.document.getElementsByTagName( "meta" );
  	var meta;
  	for( var i = 0; i < metas.length; i ++ ){
  		if( metas[ i ].name && metas[ i ].name === metaname ){
  			meta = metas[ i ];
  			break;
  		}
  	}
  	return meta && meta.content;
  };
  
  // commonjs
  if( typeof module !== "undefined" ){
  	module.exports = getMeta;
  }
  else {
    w.getMeta = getMeta
  }
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
/*!
loadCSS: load a CSS file asynchronously.
[c]2015 @scottjehl, Filament Group, Inc.
Licensed MIT
*/
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined(function() {
			ss.media = media || "all";
		});
		return ss;
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */
(function( w ){
	var loadJS = function( src, cb ){
		"use strict";
		var ref = w.document.getElementsByTagName( "script" )[ 0 ];
		var script = w.document.createElement( "script" );
		script.src = src;
		script.async = true;
		ref.parentNode.insertBefore( script, ref );
		if (cb && typeof(cb) === "function") {
			script.onload = cb;
		}
		return script;
	};
	// commonjs
	if( typeof module !== "undefined" ){
		module.exports = loadJS;
	}
	else {
		w.loadJS = loadJS;
	}
}( typeof global !== "undefined" ? global : this ));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
/*! EnhanceJS: a progressive enhancement boilerplate. Copyright 2014 @scottjehl, Filament Group, Inc. Licensed MIT */
(function( w ) {

	// Enable JS strict mode
	"use strict";

	var loadCSS = require( "fg-loadcss/loadCSS" );
	var loadJS = require( "fg-loadjs/loadJS" );
	var cookie = require( "fg-cookie/cookie" );
	var getMeta = require( "fg-getmeta/getmeta" );

	// expose the 'enhance' object globally. Use it to expose anything in here that's useful to other parts of your application.
	var enhance = w.enhance = {};
	enhance.loadCSS = loadCSS;
	enhance.loadJS = loadJS;
	enhance.cookie = cookie;
	enhance.getMeta = getMeta;

	// Define some variables to be used throughout this file
	var doc = w.document,
		docElem = doc.documentElement,
		// this references a meta tag's name whose content attribute should define the path to the full CSS file for the site
		fullCSSKey = "fullcss",
		// this references a meta tag's name whose content attribute should define the path to the enhanced JS file for the site (delivered to qualified browsers)
		fullJSKey = "fulljs",
		// this references a meta tag's name whose content attribute should define the path to the custom fonts file for the site (delivered to qualified browsers)
		fontsKey = "fonts",
		// classes to be added to the HTML element in qualified browsers
		htmlClasses = [ "enhanced" ];

	/* Enhancements for all browsers - qualified or not */

	/* Load non-critical CSS async on first visit:
		On first visit to the site, the critical CSS for each template should be inlined in the head, while the full CSS for the site should be requested async and cached for later use.
		A meta tag with a name matching the fullCSSKey should have a content attribute referencing the path to the full CSS file for the site.
		If no cookie is set to specify that the full CSS has already been fetched, load it asynchronously and set the cookie.
		Once the cookie is set, the full CSS is assumed to be in cache, and the server-side templates should reference the full CSS directly from the head of the page with a link element, in place of inline critical styles.
		*/
	var fullCSS = getMeta( fullCSSKey );
	if( fullCSS && !cookie( fullCSSKey ) ){
		loadCSS( fullCSS );
		// set cookie to mark this file fetched
		cookie( fullCSSKey, "true", 7 );
	}

	/* Enhancements for qualified browsers - “Cutting the Mustard”
		Add your qualifications for major browser experience divisions here.
		For example, you might choose to only enhance browsers that support document.querySelector (IE8+, etc).
		Use case will vary.
		*/
	if( !( "querySelector" in w.doc ) ){
		// basic browsers: last stop here!
		return;
	}

	// From here on we're dealing with qualified browsers.

	// Add scoping classes to HTML element: useful for upgrading the presentation of elements that will be enhanced with JS behavior
	docElem.className += " " + htmlClasses.join(" ");

	/* Load JavaScript enhancements in one request.
		Your DOM framework and dependent component scripts should be concatenated and minified into one file that we'll load dynamically (keep that file as small as possible!)
		A meta tag with a name matching the fullJSKey should have a content attribute referencing the path to this JavaScript file.
		*/
	var fullJS = getMeta( fullJSKey );
	if( fullJS ){
		loadJS( fullJS );
	}

	/* Load custom fonts
		We prefer to load fonts asynchronously so that they do not block page rendering.
		To do this, a meta tag with a name matching the fontsWoffKey should have a content attribute referencing the path to this fonts file.
		NOTE: You may want to have logic here to choose between one of many font formats before loading it.
			For example, we often load WOFF, Truetype, or SVG. If so, just define meta tags for each
		*/
	var fonts = getMeta( fontsKey );
	if( fonts ){
		loadCSS( fonts );
	}

}( typeof global !== "undefined" ? global : this ));
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fg-cookie/cookie":1,"fg-getmeta/getmeta":2,"fg-loadcss/loadCSS":3,"fg-loadjs/loadJS":4}]},{},[5]);
