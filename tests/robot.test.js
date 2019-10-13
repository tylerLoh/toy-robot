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

	it("return invalid command for unhandle function", () => {
		expect(robot.fn("_update")).toEqual(
			robot.messenger.getMessage("invalidCommand", '_update')
		);
	});

	it("return invalid coordinate if x | y not int", () => {
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

	it("return invalid direction for wrong face direction", () => {
		let x = 1;
		let y = 2;
		let f = "random";
		expect(robot.fn("place", x, y, f)).toEqual(
			robot.messenger.getMessage("invalidDirection", f)
		);
	});

	it("return out of table if x | y out of range", () => {
		let x = -1;
		let y = 4;
		let f = "south";
		expect(robot.fn("place", x, y, f)).toEqual(
			robot.messenger.getMessage("outOfTable")
		);
	});

	it("return invalid initialize when robot haven't been place", () => {
		expect(robot.fn("report")).toEqual(
			robot.messenger.getMessage("invalidInitialize")
		);
		expect(robot.fn("right")).toEqual(
			robot.messenger.getMessage("invalidInitialize")
		);
		expect(robot.fn("move")).toEqual(
			robot.messenger.getMessage("invalidInitialize")
		);
		expect(robot.fn("left")).toEqual(
			robot.messenger.getMessage("invalidInitialize")
		);
	});

	it("return valid robot position", () => {
		let x = 2;
		let y = 2;
		let f = "south";
		robot.fn("place", x, y, f);
		expect(robot.fn("report")).toEqual(
			robot.messenger.getMessage("report", x, y, robot.f)
		);
	});

	it("return TRUE flag for robot upon valid place", () => {
		let x = 2;
		let y = 2;
		let f = "south";

		robot.fn("place", x, y, f);
		expect(robot.isInitialized).toEqual(true);
	});


	it("return falling when is moving out of range", () => {
		let x = 4;
		let y = 4;
		let f = "east";

		robot.fn("place", x, y, f);
		expect(robot.fn("move")).toEqual(messenger.getMessage("outOfTable"));
	});

	it("update x, y, f accordingly upon valid place", () => {
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

	it("increase x accordingly when moving from EAST", () => {
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

	it("increase y accordingly when moving from NORTH", () => {
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

	it("decrease x accordingly when moving from WEST", () => {
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

	it("decrease y accordingly when moving from SOUTH", () => {
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

});
