# Enhance
## A progressive enhancement workflow for cross-device web applications

Enhance is a progressive enhancement workflow developed at [Filament Group](http://filamentgroup.com). It is designed to help developers deliver rich web experiences that are accessible to the widest range of devices possible, and catered to the capabilities and constraints of each device. The "Enhance" workflow utilizes several tools, all of which are independent Github projects themselves:

- `Enhance.js`: (_hosted in this repository_) a tiny JavaScript framework designed to help developers determine if a browser is capable of handling additional JavaScript and CSS enhancements, and load specific enhancements for that browser as fast and simply as possible.
- [QuickConcat](https://github.com/filamentgroup/quickconcat): a simple dynamic concatenator for html, css, and js files, written in PHP
- [Wrap](https://github.com/filamentgroup/wrap): a modular JavaScript library for DOM manipulation and Ajax, inspired by the jQuery API
- [AjaxInclude](https://github.com/filamentgroup/ajaxinclude): a plugin that is designed for modular content construction, that runs on Wrap (or jQuery)

Together these tools form the core of Filament Group's progressive enhancement workflow; let's break down the role that each one plays.

## Enhance.js

`Enhance.js` is a tiny JavaScript framework designed to help developers determine if a browser is capable of handling additional JavaScript and CSS enhancements, and load specific enhancements for that browser as fast and simply as possible. `Enhance.js` provides [an API](https://github.com/filamentgroup/enhance/#readme) for some simple tasks such as checking whether an element has a particular classname, and assembling and requesting JavaScript and CSS files via a single, concatenated request. 

Typically, a site that uses Enhance will start by including (anywhere in the page, or in the `head` if necessary) at least two JavaScript files that will drive the progressive enhancement process: `enhance.js`, and a custom file that uses the `ejs` API to configure and enhance the user experience (or not) based on various conditions: for example purposes, we'll call that custom file `enhance.audit.js`. The role of `enhance.audit.js` is to determine if – and with which files – a browser's experience should be enhanced. Within `enhance.audit.js`, the following steps might be taken:

* Determine if a browser is broadly qualified enhancements and if not, exit early (a broad qualification might consist of detecting `document.querySelectorAll` support, CSS3 Media Queries support, or any other technology critical to an application's enhanced experience)
* Reference the JavaScript and CSS files that may potentially be loaded
* Queue certain files for loading based on various environmental conditions, browser capabilities, screen size, markup conditions, and more.
* Enhance the page by loading those files via a single, concatenated request.

For an example of how this process actually breaks down in JavaScript, check out the `enhance.audit.js` file in this repository.

_Note that loading CSS dynamically, or lazily, in this fashion can cause undesirable results because it will likely arrive after the website has begun rendering, causing a FOUC when its styles snap into place. Because of this, you'll want to include any CSS that's essential to rendering the page being requested via the `head` of the page, through a traditional `style` tag. This limitation means `enhance.js` is more useful for loading JavaScript files, but you can use it to load CSS as well, as long as that CSS is not critical to the intial page rendering (styles associated with an overlay panel not currently in view might be a good candidate for this sort of loading)._

All of these tasks can be facilitated simply through the [`enhance.js` `api`](_docs/API.md). However, Enhance.js itself does not handle the server-side concatenation that it is designed to interface with. Nor does it handle the application of enhancements itself. For those, let's move on.

## QuickConcat

[QuickConcat](https://github.com/filamentgroup/quickconcat) is a simple dynamic concatenator for html, css, and js files, written in PHP. Interacting with QuickConcat is simple: send it a URL containing several comma-separated filepaths, and it will combine those files and return them as a single response. It has a few simple features, described in its README, but basically, a QuickConcat URL looks something like the following:

    quickconcat.php?files=js/myfileA.js,js/myfileB.js

Or better yet...

    js/myfileA.js,js/myfileB.js=concat

That's pretty much it; you can find the `quickconcat.php` source code along with more examples and implementation notes in the [QuickConcat project readme](https://github.com/filamentgroup/quickconcat#readme).

Within the Enhance workflow, QuickConcat is used by `Enhance.js` to combine many different JavaScript or CSS files into a single request (per language). It is also used by `AjaxInclude` to combine different HTML files (more on that below). QuickConcat can also be used manually to combine JavaScript and stylesheet references in your document. For example, a site using Enhance might start by including `enhance.js` and `enhance.audit.js` like so:

    <script src="/_js/lib/enhance.js,/_js/enhance.audit.js"></script>

...and the necessary CSS files

Like many of the tools that comprise the Enhance pattern, QuickConcat is just as much a functional tool as it is a suggested pattern - the technology behind the implementation is less important than the workflow it facilitates. For small-scale production environments, quickconcat.php itself may be a suitable tool for use in a live website. However, at Filament Group, we typically only use QuickConcat during the initial development phase of a project, as it is easy to configure and get working quickly but does not include features for serving files quickly in a large-scale production environment. Early in a development phase, we commonly advise clients in building a custom file concatenation service similar to QuickConcat, but more robust and using their preferred languages, so that it can integrate tightly with their system in ways QuickConcat does not (at least by default).

In that vein, we recommend that a dynamic file concatenation tool provides at least the following services when deployed in a large-scale application:

1. Dynamic file concatenation via URL, combining separate files into one response via a comma-separated request (QuickConcat does this)
2. Minify the source files before or after combination, removing whitespace, comments, and in the case of JavaScript, optimizing the code itself to reduce its weight. Many open-source tools are available for this. We’d recommend checking out the Java-based [Google Closure Compiler](http://code.google.com/closure/compiler/) and [YUI Compressor](http://developer.yahoo.com/yui/compressor/) tools, or the Node.js-based [Uglify.js](https://github.com/mishoo/UglifyJS) (of these, YUI is designed to compress CSS as well).
3. Transfer the output file in GZIP compressed format. Most server-side environments provide tools for gzip output (see the [QuickConcat Readme](https://github.com/filamentgroup/quickconcat#readme) for an example using Apache)
4. When a particular combination of files is requested, its output should be saved as a static resource on the site's server or CDN, and all future requests should be directed straight to that file instead of dynamically generating it again. _In this way, different devices will generate the various file combinations, and the second time a particular browser/device combo visits the site, the server can deliver that file much more efficiently. We also recommend pre-generating common file combinations during deployment so that many popular combinations will never need to be generated dynamically during a request_

With `enhance.js` and `quickconcat.php` covered, we can move on to the actual enhancements.

## Wrap

Wrap is a simple framework of DOM utilities that is designed to target modern browsers without failing the rest. It is a simple dom wrapper function that is inspired by the jQuery API, designed to let you find elements and manipulate them. Uniquely however, Wrap is written in such a way that it'll only do anything at all in modern browsers, like Internet Explorer and up. Other browsers? They'll get a less-enhanced experience. There won't be errors, but there may be less _zing_. Assuming you're already building applications with Progressive Enhancement though, you should be fine without JavaScript enhancements - Wrap is built based on this presumption.

The technical bits: Wrap itself is a simple, small (half a kilobyte), extendable core that handles not much more than the iterating of DOM nodes. It doesn't come with much more than a means of finding and generating HTML elements, a DOM-ready handler, and a few essential methods like `each`, `find`, `children`. Using its API however, wrap is easy to extend further.






