class Validator {
	constructor(config) {
		const { startX, startY, lengthX, lengthY, direction } = config;

		this.startX = startX;
		this.startY = startY;
		this.lengthX = lengthX;
		this.lengthY = lengthY;
		this.direction = direction;
	}

	/**
	 * Check if x, y coordinate inside table
	 * @param {INT} x coordinate x
	 * @param {INT} y coordinate y
	 * @return {Boolean}
	 */
	isInTable(x, y) {
		if (
			x >= this.startX &&
			x <= this.lengthX - 1 &&
			y >= this.startY &&
			y <= this.lengthY - 1
		) {
			return true;
		}
		return false;
	}

	/**
	 * Check if f is valid direction
	 * @param {STR} f direction string
	 * @return {Boolean}
	 */
	isValidDirection(f) {
		f = f.toUpperCase(f);
		return this.direction.indexOf(f) !== -1;
	}

	/**
	 * Check if input is valid integer
	 * @param {INT} num
	 * @return {Boolean}
	 */
	isInteger(num) {
		return Number.isInteger(num);
	}

	/**
	 * Check if input is valid string
	 * @param {STR} str
	 * @return {Boolean}
	 */
	isString(str) {
		return typeof str === "string";
	}
}

module.exports = Validator;
