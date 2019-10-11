const os = require("os");

const config = {};
config.validator = {
	startX: 0,
	startY: 0,
	lengthX: 5,
	lengthY: 5
};

config.command = {
	action: ["PLACE", "MOVE", "LEFT", "RIGHT", "REPORT"],
	direction: ["NORTH", "EAST", "SOUTH", "WEST"],
	initialAction: "PLACE"
};

config.message = {
	help: () => {
		return `${os.EOL}
			ACTION ${os.EOL}
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
			${config.command.direction.join(" ")}`;
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
	invalidCoordinate: (input) => {
		return `!!! ${input} coordinate must be integer`;
	},
	invalidDirection: (input) => {
		return `!!! ${input} direction must be string and in 
			[${config.command.direction.join(",")}]`;
	},
	outOfTable: () => {
		return "!!! Robot out of table";
	},
	report: (x, y, f) => {
		return `Robot position is: ${x}, ${y}, ${config.command.direction[f]}`;
	}
};

module.exports = config;
