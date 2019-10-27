/**
 * Creates a Vue SFC
 */

'use strict';

const fs = require('fs');
const chalk = require('chalk');
const {exec} = require('child_process');

const commandArguments = process.argv.slice(2);
const componentName = commandArguments[0];

if(componentName === undefined || componentName === '') {

	console.error(chalk.bgRed(' Missing argument "name" '));
	console.error(chalk.bgRed(' npm run make:component {componentName} '));

	return false;
}

var content =  fs.readFileSync('./commands/templates/createComponent.temp', 'utf8');

content = content.replace(/{componentName}/g, componentName);

fs.writeFileSync('./components/' + componentName + '.vue', content, 'utf8');

console.info(chalk.green('Component "'+ componentName + '" successfully created!'));

exec('npm run make:scss '+ componentName, function() {

	console.info(chalk.green('Scss "'+ componentName + '" successfully created!'));
});