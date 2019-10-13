/* eslint-disable max-len */
/**
 * Config object for:
 *   Robot class
 *   Messenger class
 *   Validator class
 */

const os = require("os");

const config = {};

/**
 * validator object
 * @var direction use array index
 */
config.validator = {
	startX: 0,
	startY: 0,
	lengthX: 5,
	lengthY: 5,
	command: ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"],
	direction: ["NORTH", "EAST", "SOUTH", "WEST"]
};

config.message = {
	help: () => {
		return `${os.EOL}${os.EOL}COMMAND (case-insensitive) ${
			os.EOL
		}-------------------- ${
			os.EOL
		}PLACE  : Initial and update robot X,Y,F position${
			os.EOL
		}MOVE   : Move forward${os.EOL}LEFT   : Turn left${
			os.EOL
		}RIGHT  : Turn light${os.EOL}REPORT : Report robot current position${
			os.EOL
		}-------------------- ${os.EOL}${os.EOL}DICRECTION (case-insensitive)${
			os.EOL
		}-------------------- ${os.EOL}${config.validator.direction.join(" ")}${
			os.EOL
		}--------------------`;
	},
	unhandle: (key) => {
		return `!!! Unhandle message [${key}]`;
	},
	initial: () => {
		return `Welcome to Toy-Robot application`
	},
	invalidInitialize: () => {
		return "!!! Robot not ready, initial with PLACE X, Y, F to begin";
	},
	invalidCoordinate: (...input) => {
		return `!!! Coordinates [${input}] cant be empty and must be integer. eg. PLACE 1, 2, NORTH`;
	},
	invalidDirection: (input) => {
		return `!!! Direction [${input}] must be string and in [${config.validator.direction.join(
			","
		)}]`;
	},
	invalidCommand: (key) => {
		return `!!! Unhandle command [${key}], type [help] for more info`;
	},
	outOfTable: () => {
		return "!!! Robot cannot PLACE or MOVE to that position, out of range";
	},
	report: (x, y, f) => {
		return `Robot position : ${x}, ${y}, ${config.validator.direction[f]}`;
	},
	success: () => {
		return "Yes, master";
	}
};

module.exports = config;
