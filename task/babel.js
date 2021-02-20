var fs = require('fs'),
	babel = require("@babel/core"),
	files = require('../src/list.js'),
	ret;

console.log('[task/babel.js] Try to use babel to transform files.');
files.forEach( function ( file ) {
	console.log(`[task/babel.js] transform ${ file.module } ${ file.version } at src/${ file.src } ...`)
	try {
		ret = babel.transformFileSync( `src/${file.src}` );
		fs.writeFileSync( `dist/${file.module}.js`, ret.code.replace(/^"use strict";\n\n/, ""), "utf8");	
		console.log(`[task/babel.js] transform ${ file.module } ${ file.version } success.`);
	} catch ( e ) {
		console.error(`[task/babel.js] fail to transform src/${file.src}, error:`);
		throw e;
	}
} );

console.log(`[task/babel.js] done.`);