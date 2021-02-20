var fs = require('fs'),
	babel = require("@babel/core"),
	files = require('../src/list.js'),
	ret;

console.log('[task/babel.js] Try to use babel to transform files.');

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
	console.log(`[task/babel.js] transform ${ file.module } ${ file.version } at src/${ file.src } ...`)
	try {
		ret = babel.transformSync( merge( file, fs.readFileSync( `src/${ file.src }`, "utf8") ) );
		fs.writeFileSync( `dist/${file.module}.babel.js`, ret.code.replace(/^"use strict";\n\n/, ""), "utf8");	
		console.log(`[task/babel.js] transform ${ file.module } ${ file.version } success.`);
	} catch ( e ) {
		console.error(`[task/babel.js] fail to transform src/${file.src}, error:`);
		throw e;
	}
} );

console.log(`[task/babel.js] done.`);