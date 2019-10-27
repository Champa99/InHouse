/**
 * Creates a Vue SFC
 */

'use strict';

const fs = require('fs');
const chalk = require('chalk');

const commandArguments = process.argv.slice(2);
const styleName = commandArguments[0];

if(styleName === undefined || styleName === '') {

	console.error(chalk.bgRed(' Missing argument "name" '));
	console.error(chalk.bgRed(' npm run make:scss {styleName} '));

	return false;
}

fs.writeFileSync('./css/' + styleName + '.scss', '', 'utf8');

console.info(chalk.green('Scss "'+ styleName + '" successfully created!'));