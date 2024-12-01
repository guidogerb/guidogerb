const writeFile = require('write');
const gitLatestSemverTag = require('git-latest-semver-tag');
const gitCommitCount = require("git-commit-count");
const gitHash = require('git-rev-sync');

gitLatestSemverTag(function(err, tag) {

	const gitCount = gitCommitCount();
	const hash = gitHash.short();
	let version = {};

	version.version = tag + '-' + gitCount + '-g' + hash;
	version.branch = gitHash.branch();

	console.log('version:', version);

	writeFile('./src/static/version.json', JSON.stringify(version), function(err) {
		if (err) console.log(err);
	});

});
