/**
 * Vue Dummy Bundler
 * 
 * @author Champa
 * @version v0.0.1
 * 
 * Bundles Vue Single File Components into a single file
 * All configuration is done in the bundler.json file
 */

'use strict';

const fs = require('fs');

const version = 'v0.0.1';

var config = require('./bundler.json');
var args = process.argv.slice(2);
let scriptContent = fs.readFileSync(config.entryScript, 'utf8');
var newScriptContent = scriptContent;
var requireTags = scriptContent.match(/require\(\"(.*?)\"\)/g);
var bundleCount = 0;

console.log("Vue Bundler "+ version);

if(requireTags === null) {

	requireTags = scriptContent.match(/require\(\'(.*?)\'\)/g);
}

if(requireTags === null) {

	console.log("Nothing to bundle, exiting...");
	return false;
}

var stylesArr = [];

requireTags.forEach(function(val, index) {

	bundleCount ++;

    let path = val.split('"');

	var vueComponent = fs.readFileSync(config.rootPath + path[1], 'utf8');
	
    var template = vueComponent.match(/<template[^>]*>([\s\S]*?)<\/template>/g).map(function(val) {
        return val.replace(/<\/?template>/g,'').replace(/\r\n/g, '');
	});

    var script = vueComponent.match(/<script[^>]*>([\s\S]*?)<\/script>/g).map(function(val) {
		return val.replace(/<\/?script>/g,'').replace(/\r\n/g, '').replace("module.exports = {", '').replace(/}([^}]*)$/,''+'$1');
    });

    var styles = vueComponent.match(/<style[^>]*>([\s\S]*?)<\/style>/g).map(function(val) {
        return val.replace(/<\/?style>/g,'').replace(/\r?\n|\r/g, '');
    });

    stylesArr.push(styles[0].replace('<style src="', '').replace('">', ''));

    let componentObject = '{' +
        
        script[0] + ',' +
        'template: \'' + template[0] + '\'' +
	'}';

	componentObject = componentObject.replace(/\r\n|\n|\r/g, '').trim();

    newScriptContent = newScriptContent.replace(val, componentObject);
});

newScriptContent += '\n\n// Vue Bundler CSS Lazy Load\nfunction vueBundlerLoadCss(path) {\n' +
    '   var file = location.pathname.split( "/" ).pop();\n\n' +

    '   var link = document.createElement( "link" );\n' +
    '   link.href = path;\n' +
    '   link.type = "text/css";\n' +
    '   link.rel = "stylesheet";\n' +
    '   link.media = "screen,print";\n\n' +

    '   document.getElementsByTagName( "head" )[0].appendChild( link );\n' +
    '}\n\n';

stylesArr.forEach(function(val) {

    newScriptContent += 'vueBundlerLoadCss("'+ val +'");\n';
});

fs.writeFileSync(config.bundleScript, newScriptContent, 'utf8');

console.log("Total files imported: " + bundleCount);
console.log("Finished bundling proccess.");