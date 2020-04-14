const replace = require('replace-in-file');
const commandLineArgs = require('command-line-args')

const argDefinition = [
	{ name: 'source', alias: 's', type: String, multiple: true },
	{ name: 'from', alias: 'f', type: String, multiple: true },
	{ name: 'to', alias: 't', type: String, multiple: true }
]

const options = commandLineArgs(argDefinition);

const replaceOptions = {
	files: options.source,
	from: options.from,
	to: options.to,
};

try {
	const changes = replace.sync(replaceOptions);
	console.log('Modified files:', changes.join(', '));
} catch (error) {
	console.error('Error occurred:', error);
}

