var fs = require('fs'),
	UglifyJS = require("uglify-js"),
	options = {
		mangle: true,
		output: {
   		    beautify: false,
    	}
	},
	files = require('../src/list.js'),
	ret;

function merge ( file, code ) {
	return `/*!
 * ${ file.module } ${ file.version }
 * https://github.com/sunny00217wm/SickManWPFriends
 *
 * Copyright 2021 sunny00217wm
 * Released under the GPLv3
 */

( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		module.exports = factory( global, true );
	} else {
		factory( global );
	}

} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

${ code }

if ( typeof define === "function" && define.amd ) {
	define( "${ file.output }", [], function() {
		return ${ file.output };
	} );
}


var	_${ file.output } = window.${ file.output };

${ file.output }.noConflict = function() {
	if ( window.${ file.output } === ${ file.output } ) {
		window.${ file.output } = _${ file.output };
	}

	return ${ file.output };
};

if ( typeof noGlobal === "undefined" ) {
	window.${ file.output } = ${ file.output };
}

return ${ file.output };
} );
`;
}

console.log('[task/uglify.js] Try to use uglify-JS to transform files.');
files.forEach( function ( file ) {
	console.log(`[task/uglify.js] transform ${ file.module } ${ file.version } at src/${ file.src } ...`)
	try {
		ret = UglifyJS.minify( {
			"core.js": merge( file, fs.readFileSync( `src/${ file.src }`, "utf8") )
		}, options );
		fs.writeFileSync(
			`dist/${file.module}.min.js`,
			`/* SickManWPFriends-${ file.module } ${ file.version } | https://github.com/sunny00217wm/SickManWPFriends | GPLv3 */\n${ ret.code }`, "utf8"
		);	
		console.log(`[task/uglify.js] transform ${ file.module } ${ file.version } success.`);
	} catch ( e ) {
		console.error(`[task/uglify.js] fail to transform src/${file.src}, error:`);
		throw e;
	}
} );

console.log(`[task/uglify.js] done.`);

UglifyJS.minify()