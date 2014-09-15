#Enhance.js

`Enhance.js` is a small JavaScript workflow designed to help developers progressively enhance a page in a qualified manner.

* Copyright 2010-2014 @scottjehl, @beep, @wilto, @maggiewachs, and Filament Group, Inc.
* License: MIT

## Overview

As of version 2, Enhance.js is no longer meant to be a library or framework, but rather an editable boilerplate file. It is small, delete-key-friendly, and meant to be included "inline" in the `head` of a page and edited to the needs of your project.

We typically use Enhance.js to run brief browser diagnostics before deciding whether to enhance a basic, but already-functional page further by adding classes and requesting additional scripts and stylesheets.

## Enhancement workflow

The logic within Enhance.js can and should vary from project to project - edit it to your needs.

By default though, it is set up to follow these steps:

1. Define some variables and functions for loading assets and accessing information about the browser and markup
2. Run one or more tests to see if a browser is qualified to load and render additional enhancements
3.   
	- A. If it's not qualified, exit early and do nothing more
	- B. If it is qualified, proceed on to load additional assets, add classes to the document, etc.


## How to use

We suggest keeping `enhance.js` in a folder alongside other editable JavaScript files used in your site.

It **should be included in your page inline**, rather than referencing it externally, through a server-side include or build process:

```html
<!doctype html>
<html>
<head>
	...
	<script><!--#include virtual="/path/to/enhance.js" --></script>
	...
</head>
```
Including this file inline is in keeping with the overall goal of reducing the number of blocking, external references found in the `head` of the page (to allow the page to render as quickly as possible).
*Note*: In a production setting, this file should be minified before being included in a page to ensure it's as small as possible. Tools like Uglify.js can help with this.


### Enhancing a page EnhanceJS

TODO: A lot of this information should move to the SouthStreet Project, to explain how the pieces above come together.

For EnhanceJS to work best, a careful setup in the `head` of a page is necessary.

First, we recommend including [the critical CSS for each template of a site](https://github.com/filamentgroup/grunt-criticalCSS) directly in a `style` element in the head of the page, and requesting the rest of the site's CSS asynchronously. Once we've fetched the full CSS for the site, we like to set a cookie to tell our server-side templates to reference that CSS file directly with a `link` element on subsequent visits, instead of any inline styles.

We also recommend loading any non-critical JavaScript asynchronously as well, and the `loadCSS` function in EnhanceJS allows us to do that in a qualified manner, so older and underfeatured browsers don't need to be bothered by DOM Frameworks and such.

To define URLs for files that may be requested by EnhanceJS, such as a file containing JavaScript enhancements, we like to use `meta` tags in the `head` of our page.

### A fully-configured `head` setup for EnhanceJS

Here's an example configuration for the head of a page. It uses SSI to detect cookies and decide whether to inline CSS or request it directly.

```html
<!doctype html>
<html>
<head>
	...
	<meta name="fullcss"  content="/path/to/full.css">
	<meta name="fulljs"  content="/path/to/enhancements.js">
<!--#if expr="$HTTP_COOKIE=/fullcss\=true/" -->
	<link rel="stylesheet" href="/path/to/full.css">
<!--#else -->
	<style>
		/* critical CSS styles for this template go here... */
	</style>
	<script>
		<!--#include virtual="/path/to/enhance.js" -->
	</script>
	<noscript><link rel="stylesheet" href="/path/to/full.css"></noscript>
<!--#endif -->
	...
</head>
```


## API

Enhance.js exposes an object called `window.enhance` or just `enhance`. You can place whatever enhancement-related properties and methods on this object that you might want to use elsewhere in your codebase, or, none at all.

By default, we typically expose functions like `loadCSS`, `loadJS`, `getMeta`, and `cookie`, so that we can use these in other scripts in our codebase.

You might choose to expose feature support information, or even user agent info if you really need that.
