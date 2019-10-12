const Robot = require("@app/robot");
const Messenger = require("@app/messenger");
const Validator = require("@app/validator");
const config = require("@app/config");

describe("Test Robot class", () => {
	let messenger;
	let validator;
	let robot;

	beforeAll(function() {
		messenger = new Messenger(config.message);
		validator = new Validator(config.validator);
	});

	beforeEach(function() {
		robot = new Robot(messenger, validator);
	});

	it("should return invalid command for unhandle function", () => {
		expect(robot.fn("_update")).toEqual(
			robot.messenger.getMessage("invalidCommand", '_update')
		);
	});

	it("should return invalid coordinate if x | y not int", () => {
		let x = 1;
		let y = "hi";
		let f = "south";
		expect(robot.fn("place", x, y, f)).toEqual(
			robot.messenger.getMessage("invalidCoordinate", x, y)
		);

		x = "hi";
		y = 2;
		f = "south";
		expect(robot.fn("place", x, y, f)).toEqual(
			robot.messenger.getMessage("invalidCoordinate", x, y)
		);
	});

	it("should return invalid Direction for invalid face direction", () => {
		let x = 1;
		let y = 2;
		let f = "random";
		expect(robot.fn("place", x, y, f)).toEqual(
			robot.messenger.getMessage("invalidDirection")
		);
	});

	it("should return out of table if x | y out of range", () => {
		let x = -1;
		let y = 4;
		let f = "south";
		expect(robot.fn("place", x, y, f)).toEqual(
			messenger.getMessage("outOfTable")
		);
	});

	it("should return invalid initialize when robot haven't been init", () => {
		expect(robot.fn("report")).toEqual(
			messenger.getMessage("invalidInitialize")
		);
		expect(robot.fn("right")).toEqual(
			messenger.getMessage("invalidInitialize")
		);
		expect(robot.fn("move")).toEqual(
			messenger.getMessage("invalidInitialize")
		);
		expect(robot.fn("left")).toEqual(
			messenger.getMessage("invalidInitialize")
		);
	});

	it("should report return valid robot position", () => {
		let x = 2;
		let y = 2;
		let f = "south";
		robot.fn("place", x, y, f);
		expect(robot.fn("report")).toEqual(
			robot.messenger.getMessage("report", x, y, robot.f)
		);
	});

	it("should return valid isInitialized for robot upon place", () => {
		let x = 2;
		let y = 2;
		let f = "south";

		robot.fn("place", x, y, f);
		expect(robot.isInitialized).toEqual(true);
	});

	it("should update x, y, f accordingly upon valid place", () => {
		let x = 2;
		let y = 2;
		let f = "south";

		robot.fn("place", x, y, f);

		let received = {
			x: robot.x,
			y: robot.y,
			f: robot.f
		};

		let expected = {
			x: x,
			y: y,
			f: config.validator.direction.indexOf(f.toUpperCase())
		};
		expect(received).toEqual(expected);

		x = 3;
		y = 1;
		f = "west";
		robot.fn("place", x, y, f);

		received = {
			x: robot.x,
			y: robot.y,
			f: robot.f
		};

		expected = {
			x: x,
			y: y,
			f: robot.f
		};

		expect(received).toEqual(expected);
	});

	it("should increase x accordingly when facing EAST", () => {
		let x = 2;
		let y = 2;
		let f = "east";

		robot.fn("place", x, y, f);
		robot.fn("move");

		let received = {
			x: robot.x,
			y: robot.y,
			f: robot.f
		};

		let expected = {
			x: x + 1,
			y: y,
			f: robot.f
		};
		expect(received).toEqual(expected);
	});

	it("should increase y accordingly when facing NORTH", () => {
		let x = 2;
		let y = 2;
		let f = "north";

		robot.fn("place", x, y, f);
		robot.fn("move");

		let received = {
			x: robot.x,
			y: robot.y,
			f: robot.f
		};

		let expected = {
			x: x,
			y: y + 1,
			f: robot.f
		};
		expect(received).toEqual(expected);
	});

	it("should decrease x accordingly when facing WEST", () => {
		let x = 2;
		let y = 2;
		let f = "west";

		robot.fn("place",x, y, f);
		robot.fn("move");

		let received = {
			x: robot.x,
			y: robot.y,
			f: robot.f
		};

		let expected = {
			x: x - 1,
			y: y,
			f: robot.f
		};
		expect(received).toEqual(expected);
	});

	it("should decrease y accordingly when facing SOUTH", () => {
		let x = 2;
		let y = 2;
		let f = "south";

		robot.fn("place", x, y, f);
		robot.fn("move");

		let received = {
			x: robot.x,
			y: robot.y,
			f: robot.f
		};

		let expected = {
			x: x,
			y: y - 1,
			f: robot.f
		};
		expect(received).toEqual(expected);
	});

	it("should return out of table when is falling", () => {
		let x = 4;
		let y = 4;
		let f = "east";

		robot.fn("place", x, y, f);
		expect(robot.fn("move")).toEqual(messenger.getMessage("outOfTable"));
	});
});
