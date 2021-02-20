var fs = require('fs'),
	files = require('../src/list.js');

console.log('[task/build.js] Try to use babel to transform files.');

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

${ file.output }.noConflict = function( deep ) {
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

files.forEach( function ( file ) {
	console.log(`[task/build.js] build ${ file.module } ${ file.version } at src/${ file.src } ...`)
	try {
		fs.writeFileSync( `dist/${file.module}.js`, merge( file, fs.readFileSync( `src/${file.src}`, "utf8") ), "utf8");	
		console.log(`[task/build.js] build ${ file.module } ${ file.version } success.`);
		file.src = `dist/${file.module}.js`;
	} catch ( e ) {
		console.error(`[task/build.js] fail to build src/${file.src}, error:`);
		throw e;
	}
} );

console.log(`[task/build.js] done.`);