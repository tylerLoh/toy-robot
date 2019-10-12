const Validator = require("@app/validator");
const config = require("@app/config");

/**
 * Test Validator.
 * Check robot is in table.
 * use coordinate from config.js file.
 */
describe("Test Validator class", () => {
	const { startX, startY, lengthX, lengthY } = config.validator;
	let validator = null;

	beforeAll(function() {
		validator = new Validator(config.validator);
	});

	it("return TRUE if x, y in table", () => {
		expect(validator.isInTable(startX, startY)).toBe(true);
		expect(validator.isInTable(lengthX - 1, lengthY - 1)).toBe(true);
		expect(validator.isInTable(startX, lengthY - 1)).toBe(true);
		expect(validator.isInTable(lengthX - 1, startY)).toBe(true);
	});

	it("return FALSE if x, y out of table", () => {
		expect(validator.isInTable(startX - 1, startY - 1)).toBe(false);
		expect(validator.isInTable(lengthX, lengthY)).toBe(false);
	});

	it("return FALSE if only x out of table", () => {
		expect(validator.isInTable(startX - 1, startY)).toBe(false);
		expect(validator.isInTable(lengthX, startY)).toBe(false);
	});

	it("return FALSE if only y out of table", () => {
		expect(validator.isInTable(startX, startY - 1)).toBe(false);
		expect(validator.isInTable(lengthX - 1, lengthY)).toBe(false);
	});

	it("return TRUE if valid direction", () => {
		expect(validator.isValidDirection("EAST")).toBe(true);
		expect(validator.isValidDirection("WEST")).toBe(true);
	});

	it("return FALSE if invalid direction", () => {
		expect(validator.isValidDirection("random")).toBe(false);
	});

	it("return FALSE if input not integer", () => {
		expect(validator.isInteger(1.2)).toBe(false);
		expect(validator.isInteger("1")).toBe(false);
	});

	it("return FALSE if input not string", () => {
		expect(validator.isString(1)).toBe(false);
	});
});
