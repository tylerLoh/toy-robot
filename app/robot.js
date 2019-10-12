const config = require("./config");

class Robot {
	constructor(messenger, validator) {
		this.x = null;
		this.y = null;
		this.f = null;
		this.messenger = messenger;
		this.validator = validator;
		this.isInitialized = false;
	}

	throwError(ret) {
		throw new Error(ret);
	}

	updatePosition(x, y, f) {
		this.x = x;
		this.y = y;
		if (f) {
			this.f = config.validator.direction.indexOf(f.toUpperCase());
		}
	}

	placeValidation(x, y, f) {
		if (!this.validator.isInteger(x) || !this.validator.isInteger(y)) {
			this.throwError(
				this.messenger.getMessage("invalidCoordinate", x, y)
			);
		}

		if (
			!this.validator.isString(f) ||
			!this.validator.isValidDirection(f)
		) {
			this.throwError(this.messenger.getMessage("invalidDirection"));
		}

		if (!this.validator.isInTable(x, y)) {
			this.throwError(this.messenger.getMessage("outOfTable"));
		}
	}

	place(x, y, f) {
		try {
			this.placeValidation(x, y, f);
		} catch (e) {
			return e;
		}

		this.updatePosition(x, y, f);
		this.isInitialized = true;

		return true;
	}

	report() {
		if (!this.isInitialized) {
			return this.messenger.getMessage("invalidInitialize");
		}

		return this.messenger.getMessage("report", this.x, this.y, this.f);
	}

	/**
	 * Move robot if is initialized
	 * Move direction will depend on robot facing direction
	 */
	move() {
		if (!this.isInitialized) {
			return this.messenger.getMessage("invalidInitialize");
		}

		var x = this.x;
		var y = this.y;
		switch (this.f) {
			case 0:
				++y;
				break;
			case 1:
				++x;
				break;
			case 2:
				--y;
				break;
			case 3:
				--x;
				break;
		}

		if (!this.validator.isInTable(x, y)) {
			return this.messenger.getMessage("outOfTable");
		}

		this.updatePosition(x, y);

		return true;
	}

	right() {
		if (!this.isInitialized) {
			return this.messenger.getMessage("invalidInitialize");
		}

		this.f = this.f + 1 > 3 ? 0 : this.f + 1;

		return true;
	}

	left() {
		if (!this.isInitialized) {
			return this.messenger.getMessage("invalidInitialize");
		}

		this.f = this.f - 1 < 0 ? 3 : this.f - 1;

		return true;
	}
}

module.exports = Robot;
