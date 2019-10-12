/**
 * The Messenger class, constructor
 * @param {object} message message config
 * @param {string} unhandleKey unhandle message route key
 */
class Messenger {
	constructor(message) {
		this.message = message;
		this.unhandleKey = "unhandle";
	}

	/**
	 * Return Messenger message when key match
	 * @param  {object} key - to match config message key
	 * @param  {array} arguments - slice optional params and apply into callback
	 * @return {string} - parsed matched message
	 */
	getMessage(key = "initial") {
		if (!this.message[key]) {
			key = this.unhandleKey;

			return this.message[key].apply(
				this,
				Array.prototype.slice.call(arguments, 0, 1)
			);
		}

		return this.message[key].apply(
			this,
			Array.prototype.slice.call(arguments, 1)
		);
	}
}

module.exports = Messenger;
