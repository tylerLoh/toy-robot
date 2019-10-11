const Validator = require("@app/validator");
const config = require("@app/config");

describe("Test Validator class", () => {
	const startX = config.validator.startX;
	const startY = config.validator.startY;
	const lengthX = config.validator.lengthX - 1;
	const lengthY = config.validator.lengthY - 1;
	let validator = null;

	beforeAll(function() {
		validator = new Validator(startX, startY, lengthX, lengthY);
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
});
