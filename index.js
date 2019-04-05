const Glob = require('glob').Glob;
const { EventEmitter } = require('events');

/**
 * @typedef {object} Example
 */

/**
 * @typedef {object} ParserOptions
 * May optionally include glob options.
 */

class Parser extends EventEmitter {
	constructor(patterns, options) {
		options = options || {};
		super();
		// Parse each pattern.
		for (let pattern of patterns) {
			let matcher = new Glob(pattern, options);
			// let examples = [];
			matcher.on('match', (file) => {
				// todo: Parse file for examples.
				// Save example to array.
				// Emit example.
				// Parse file examples.
				console.log(file);
			});
			matcher.on('error', (err) => {
				// todo: Emit error.
				console.log(err);
			});
			matcher.on('end', () => {
				matcher.removeAllListeners();
				console.log('done');
				// todo: Emit done.
			});
		}
	}
}

module.exports = Parser;
