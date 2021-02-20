var fs = require('fs'),
	UglifyJS = require("uglify-js"),
	options = {
		mangle: false,
		output: {
   		    beautify: false,
    	}
	},
	files = require('../src/list.js'),
	ret;

console.log('[task/uglify.js] Try to use uglify-JS to transform files.');
files.forEach( function ( file ) {
	console.log(`[task/uglify.js] transform ${ file.module } ${ file.version } at src/${ file.src } ...`)
	try {
		ret = UglifyJS.minify({
			"core.js": fs.readFileSync( `src/${file.src}`, "utf8")
		}, options);
		fs.writeFileSync(
			`dist/${file.module}.min.js`,
			`/* SickManWPFriends-${ file.module } ${ file.version } | https://github.com/sunny00217wm/SickManWPFriends | GPLv3 *\n${ ret.code }`, "utf8"
		);	
		console.log(`[task/uglify.js] transform ${ file.module } ${ file.version } success.`);
	} catch ( e ) {
		console.error(`[task/uglify.js] fail to transform src/${file.src}, error:`);
		throw e;
	}
} );

console.log(`[task/uglify.js] done.`);