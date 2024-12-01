const express = require('express');
const app = express();
const chalk = require('chalk');

const port = 9000;
const path = __dirname + '/dist/';

app.use(express.static(path));

app.get('*', (req, res) => {
	res.sendFile(path + '/index.html');
});

app.listen(port);

console.log(chalk.black.bgYellow('  *****--------------------------------------------------------------------------*****  '));
console.log('');
console.log(chalk.red('You need to have run "npm build" or be running "npm run watch"'));
console.log(chalk.yellow('Now serving /dist/ directory: ' + path));
console.log(chalk.green.bold('Server is running on:') + ' ' + chalk.underline(`http://localhost:${port}`));
console.log('');
console.log(chalk.black.bgYellow('  *****--------------------------------------------------------------------------*****  '));
