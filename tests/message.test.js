const Messenger = require("@app/messenger");
const config = require("@app/config");

/**
 * Test Validator.
 * Check robot is in table.
 * use coordinate from config.js file.
 */
describe("Test Validator class", () => {
	let messenger;

	beforeAll(function() {
		messenger = new Messenger(config.message);
	});

	it("return help message", () => {
		expect(messenger.getMessage('help')).toEqual(
			config.message["help"]()
		);
	});

	it("return identical report message", () => {
		expect(messenger.getMessage('report', 1, 1, 0)).toEqual(
			config.message["report"](1, 1, 0)
		);
	});

	it("return initial message", () => {
		expect(messenger.getMessage()).toEqual(
			config.message['initial']()
		);
		expect(messenger.getMessage('initial')).toEqual(
			config.message['initial']()
		);
	});

	it("return unhandle message key", () => {
		expect(messenger.getMessage('someUnhandleKey')).toEqual(
			config.message['unhandle']('someUnhandleKey')
		);
	});

	it("return invalid coordinate message", () => {
		expect(messenger.getMessage('invalidCoordinate', 1.1)).toEqual(
			config.message['invalidCoordinate'](1.1)
		);
	});
});
