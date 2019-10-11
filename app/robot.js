const config = require("@app/config");

class Robot {
	constructor(messenger, validator) {
		this.x = null;
		this.y = null;
		this.f = null;
		this.messenger = messenger;
		this.validator = validator;
		this.isInitialized = false;
	}

	get report() {
		return this.messenger.getMessage("report");
	}

	updatePosition(x, y, f) {
		this.x = x;
		this.y = y;
		this.f = config.command.direction[f];
	}

	placeValidation(x, y, f) {
		if (!Number.isInteger(x)) {
			return this.messenger.getMessage("invalidCoordinate");
		}

		if (!Number.isInteger(y)) {
			return this.messenger.getMessage("invalidCoordinate");
		}

		if (typeof f !== "string" || !this.validator.isValidDirection(f)) {
			return this.messenger.getMessage("invalidDirection");
		}

		if (!this.validator.isInTable(x, y)) {
			return this.messenger.getMessage("outOfTable");
		}
	}

	place(x, y, f) {
		
		if(this.placeValidation(x, y, f));
		this.isInitialized = true;
		return;
	}
}

module.exports = Robot;
