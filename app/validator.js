class Validator {
	constructor(x, y, lenX, lenY) {
		this.startX = x;
		this.startY = y;
		this.lengthX = lenX;
		this.lengthY = lenY;
	}

	/**
	 * Check if x, y is inside table
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
}

module.exports = Validator;
