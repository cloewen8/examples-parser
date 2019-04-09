const Glob = require('glob').Glob;
const { EventEmitter } = require('events');

/**
 * @typedef {object} Example
 */

/**
 * @typedef {object} ParserOptions
 * May optionally include glob options.
 */

/**
 * Parses globs for examples.
 */
class Parser extends EventEmitter {
	/**
	 * Creates a new parser.
	 *
	 * @param {string[]} patterns
	 * @param {ParserOptions} options
	 */
	constructor(patterns, options) {
		options = options || {};
		super();
		let processing = [];
		// Parse each pattern.
		for (let pattern of patterns) {
			processing.push(new Promise((resolve) => {
				let matcher = new Glob(pattern, options);
				matcher.on('match', (file) => {
					// todo: Parse file for examples.
					this.emit('example', null);
				});
				matcher.on('error', (err) => {
					this.emit('error', err);
				});
				matcher.on('end', () => {
					matcher.removeAllListeners();
					resolve();
				});
			}));
		}
		Promise.all(processing).then(() => this.emit('end'));
	}
}

module.exports = Parser;
