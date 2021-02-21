var fs = require('fs'),
	babel = require("@babel/core"),
	UglifyJS = require("uglify-js"),
	files = require('../src/list.js'),
	code,
	ret;

function info ( file, min ) {
	return min
? `/* SickManWPFriends-${ file.module } ${ file.version } | https://github.com/sunny00217wm/SickManWPFriends | GPLv3 */\n`
: `/*!
 * ${ file.module } ${ file.version }
 * https://github.com/sunny00217wm/SickManWPFriends
 *
 * Copyright 2021 sunny00217wm
 * Released under the GPLv3
 */
`;
}
	

function merge ( file, code ) {
	return `( function( global, factory ) {

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

console.log(`[task/build.js] start task build ...`)

files.forEach( function ( file ) {
	console.log(`[task/build.js] build ${ file.module } ${ file.version } at src/${ file.src } ...`)
	try {
		code = fs.readFileSync( `src/${file.src}`, "utf8");


		fs.writeFileSync( `dist/${file.module}.js`, `${ info( file ) }${ merge( file, code ) }`, "utf8");
		console.log(`[task/build.js] build ${ file.module } ${ file.version } to dist/${file.module}.js success.`);

		code = babel.transformSync( code ).code;

		ret = UglifyJS.minify( {
			"core.js": merge( file, code )
		}, {
			mangle: false,
			output: {
				beautify: true,
			}
		} );

		fs.writeFileSync( `dist/${file.module}.babel.js`, `${ info( file ) }${ ret.code }`, "utf8");	
		console.log(`[task/build.js] build ${ file.module } ${ file.version } to dist/${file.module}.babel.js success.`);

		ret = UglifyJS.minify( {
			"core.js": merge( file, code )
		}, {
			mangle: true,
			output: {
				beautify: false,
			}
		} );

		fs.writeFileSync( `dist/${file.module}.min.js`, `${ info( file, true ) }${ ret.code }`, "utf8");	
		console.log(`[task/build.js] build ${ file.module } ${ file.version } to dist/${file.module}.min.js success.`);

		console.log(`[task/build.js] build ${ file.module } ${ file.version } success.`);
		file.src = `dist/${file.module}.js`;
	} catch ( e ) {
		console.error(`[task/build.js] fail to build src/${file.src}, error:`);
		throw e;
	}
} );

console.log(`[task/build.js] done.`);