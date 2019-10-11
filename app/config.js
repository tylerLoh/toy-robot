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
	initial: `Welcome to Toy-Robot playground ${os.EOL}
		Use PLACE X, Y, F to initialize Robot`,
	wrongInitialize: "Wrong initialize command, Use PLACE X, Y, F instead",
	outOfTable: "Robot out of table"
};

module.exports = config;
