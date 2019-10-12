const config = require("./config");

/**
 * Robot class dependencies : Validator and Messenger
 * @param {Messenger} messenger The Messenger instance
 * @param {Playground} playgroud The Playground instance
 * @constructor
 * @var {int} x robot horizontal position
 * @var {int} y robot vertical position
 * @var {int} f robot facing direction - array index map with config direction
 * @var {bool} isInitialized flag check for place command
 */
const Robot = function(messenger, validator) {
	this.x = null;
	this.y = null;
	this.f = null;
	this.messenger = messenger;
	this.validator = validator;
	this.isInitialized = false;

	/**
	 * Robot fn callback function checker
	 * @param {srt} key cross map and call keyFunc object key function
	 * @return {Messenger} matched callback or invalid command message
	 */
	this.fn = function(key) {
		if (!keyFunc[key.toLowerCase()]) {
			return this.messenger.getMessage("invalidCommand", key);
		}

		return keyFunc[key.toLowerCase()].apply(
			this,
			Array.prototype.slice.call(arguments, 1)
		);
	};

	/**
	 * update function
	 * @param {int} x coordinate for X
	 * @param {int} y coordinate for Y
	 * @param {int} f robot face direction, will map config direction index
	 * @return {bool} update if pass validation from place
	 * @private
	 */
	const _update = function(x, y, f) {
		this.x = x;
		this.y = y;
		if (f) {
			this.f = config.validator.direction.indexOf(f.toUpperCase());
		}
		return true;
	};

	/**
	 * key object function can access by user via robot.fn
	 */
	const keyFunc = {
		/**
		 * help function
		 * @return {Messenger} parsed messenger help config message
		 */
		help: function() {
			return this.messenger.getMessage("help");
		},

		/**
		 * to place robot or update robot position
		 * @param {int} x coordinate for X
		 * @param {int} y coordinate for Y
		 * @param {int} f robot face direction, will map config direction index
		 * @return {Messenger} parsed messenger config message
		 */
		place: function(x, y, f) {
			// validate x, y is a whole number
			x = parseInt(x) || x;
			y = parseInt(y) || y;
			if (!this.validator.isInteger(x) || !this.validator.isInteger(y)) {
				return this.messenger.getMessage("invalidCoordinate", x, y);
			}

			// validate f is a string and a valid config direction
			if (
				!this.validator.isString(f) ||
				!this.validator.isValidDirection(f)
			) {
				return this.messenger.getMessage("invalidDirection");
			}

			// validate x,y is in table
			if (!this.validator.isInTable(x, y)) {
				return this.messenger.getMessage("outOfTable");
			}

			_update.call(this, x, y, f);
			this.isInitialized = true;
			return this.messenger.getMessage("success");
		},

		/**
		 * send robot position to cli
		 * @return {Messenger} parsed invalid initialize if robot not place,
		 * otherwise parsed robot position message
		 */
		report: function() {
			if (!this.isInitialized) {
				return this.messenger.getMessage("invalidInitialize");
			}

			return this.messenger.getMessage("report", this.x, this.y, this.f);
		},

		/**
		 * Move robot if is initialized
		 * Move direction will depend on robot facing direction
		 * @return {Messenger} success message if in table range
		 */
		move: function() {
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

			// validate after move is still in table range
			if (!this.validator.isInTable(x, y)) {
				return this.messenger.getMessage("outOfTable");
			}

			_update.call(this, x, y);
			return this.messenger.getMessage("success");
		},

		/**
		 * Turn robot to right, update facing direction
		 * @return {Messenger}  If success it returs this, otherwise
		 * return not initialize message
		 */
		right: function() {
			if (!this.isInitialized) {
				return this.messenger.getMessage("invalidInitialize");
			}

			this.f = this.f + 1 > 3 ? 0 : this.f + 1;
			return this.messenger.getMessage("success");
		},

		/**
		 * Turn robot to left, update facing direction
		 * @return {Messenger}  If success it returs this, otherwise
		 * return not initialize message
		 */
		left: function() {
			if (!this.isInitialized) {
				return this.messenger.getMessage("invalidInitialize");
			}

			this.f = this.f - 1 < 0 ? 3 : this.f - 1;
			return this.messenger.getMessage("success");
		}
	};
};

module.exports = Robot;
