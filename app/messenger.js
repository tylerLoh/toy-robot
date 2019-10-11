class Messenger {
	constructor(message) {
		this.message = message;
		this.unhandleKey = "unhandle";
	}

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
