const os = require("os");

const config = {};
config.validator = {
	startX: 0,
	startY: 0,
	lengthX: 5,
	lengthY: 5,
	command: ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"],
	direction: ["NORTH", "EAST", "SOUTH", "WEST"],
};

config.message = {
	help: () => {
		return `${os.EOL}
			COMMAND ${os.EOL}
			-------------------- ${os.EOL}
			PLACE  : place robot
			MOVE   : move robot
			LEFT   : turn LEFT
			RIGHT  : turn RIGHT
			REPORT : get robot direction
			-------------------- ${os.EOL}
			-------------------- ${os.EOL}
			DICRECTION ${os.EOL}
			-------------------- ${os.EOL}
			${config.validator.direction.join(" ")}`;
	},
	unhandle: (key) => {
		return `!!! Unhandle message [${key}]`;
	},
	initial: () => {
		return `Welcome to Toy-Robot playground ${os.EOL}
			Use PLACE X, Y, F to initialize Robot ${os.EOL}
			Use HELP to check available command`;
	},
	invalidInitialize: () => {
		return "!!! Invalid initialize command, Use PLACE X, Y, F instead";
	},
	invalidCoordinate: (...input) => {
		return `!!! ${input} coordinate must be integer`;
	},
	invalidDirection: (input) => {
		return `!!! ${input} direction must be string and in 
			[${config.validator.direction.join(",")}]`;
	},
	outOfTable: () => {
		return "!!! Robot cannot PLACE or MOVE to that position, out of range";
	},
	report: (x, y, f) => {
		return `Robot position is: 
			${x}, ${y}, ${config.validator.direction[f]}`;
	}
};

module.exports = config;
