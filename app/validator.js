class Validator {
	constructor(x, y, lenX, lenY, direction) {
		this.startX = x;
		this.startY = y;
		this.lengthX = lenX;
		this.lengthY = lenY;
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

	isValidDirection(f) {
		f = f.toUpperCase(f);
		return this.direction.indexOf(f) !== -1;
	}
}

module.exports = Validator;
