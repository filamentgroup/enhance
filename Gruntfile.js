'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.company %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			dependencies: ['dist/']
		},
		copy: {
			cookie: {
				src: "./node_modules/fg-cookie/cookie.js",
				dest: "dist/dependencies/fg-cookie/cookie.js"
			},
			loadCSS: {
				src: "./node_modules/fg-loadcss/loadCSS.js",
				dest: "dist/dependencies/fg-loadcss/loadCSS.js"
			},
			loadJS: {
				src: "./node_modules/fg-loadjs/loadJS.js",
				dest: "dist/dependencies/fg-loadjs/loadJS.js"
			},
			getmeta: {
				src: "./node_modules/fg-getmeta/getmeta.js",
				dest: "dist/dependencies/fg-getmeta/getmeta.js"
			},
			fontFaceObserver: {
				src: "./node_modules/fontfaceobserver/fontfaceobserver.js",
				dest: "dist/dependencies/fontfaceobserver/fontfaceobserver.js"
			},
		},
		browserify: {
			options: {
				banner: '<%= banner %>',
			},
			dist: {
				files: {
					'dist/enhance.js': ['src/enhance.js']
				}
			}
		},
		jshint: {
			all: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'src/*.js'
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: ['src/*.js'],
				tasks: ['default']
			}
		},
		uglify: {
			js: {
				files: {
					'dist/enhance.min.js': [ 'dist/enhance.js' ]
				}
			}
		},
		bytesize: {
			dist: {
				src: [
					'dist/<%= pkg.name %>.min.js'
				]
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Default task.
	grunt.registerTask('travis', ['jshint']);
	grunt.registerTask('default', ['jshint', 'clean', 'copy', 'browserify', 'uglify', 'bytesize']);



};
