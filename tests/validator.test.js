const Validator = require("@app/validator");
const config = require("@app/config");

/**
 * Test Validator.
 * Check robot is in table.
 * use coordinate from config.js file.
 */
describe("Test Validator class", () => {
	const startX = config.validator.startX;
	const startY = config.validator.startY;
	const lengthX = config.validator.lengthX - 1;
	const lengthY = config.validator.lengthY - 1;
	const direction = config.command.direction;
	let validator = null;

	beforeAll(function() {
		validator = new Validator(startX, startY, lengthX, lengthY, direction);
	});

	it("return TRUE if x, y in table", () => {
		expect(validator.isInTable(startX, startY)).toBe(true);
	});

	it("return FALSE if x, y out of table", () => {
		expect(validator.isInTable(startX - 1, startY - 1)).toBe(false);
		expect(validator.isInTable(lengthX + 1, lengthY + 1)).toBe(false);
	});

	it("return FALSE if x out of table", () => {
		expect(validator.isInTable(startX - 1, startY)).toBe(false);
		expect(validator.isInTable(lengthX + 1, startY)).toBe(false);
	});

	it("return FALSE if y out of table", () => {
		expect(validator.isInTable(startX, startY - 1)).toBe(false);
		expect(validator.isInTable(lengthX, startY + 1)).toBe(false);
	});

	it("return TRUE if valid direction", () => {
		expect(validator.isValidDirection('EAST')).toBe(true);
	});

	it("return FALSE if invalid direction", () => {
		expect(validator.isValidDirection('random')).toBe(false);
	});
});
