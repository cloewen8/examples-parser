const { describe, afterEach, it, expect } = require('./jasmine').env;
const Parser = require('../');
const EventEmitter = require('events');

describe('interface', () => {
	/** @type {Parser} */
	let parser = null;

	it('is an event emitter', () => {
		parser = new Parser([]);
		expect(parser instanceof EventEmitter).toBeTruthy();
	});
	it('emits once complete', (done) => {
		parser = new Parser([]);
		parser.on('end', () => {
			done();
		});
	});
	it('edmits examples', (done) => {
		let found = 0;
		parser = new Parser(['tests/examples1.md']);
		parser.on('example', () => {
			found++;
		});
		parser.on('end', () => {
			expect(found).toBe(1);
			done();
		});
	});

	afterEach(() => {
		if (parser !== null) {
			parser.removeAllListeners();
			parser = null;
		}
	});
});
