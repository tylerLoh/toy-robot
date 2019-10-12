/**
 * Robot App Instance
 * Declare and hook class dependencies
 */

const config = require("./config");
const Messenger = require("./messenger");
const Robot = require("./robot");
const Validator = require("./validator");

const messenger = new Messenger(config.message);
const validator = new Validator(config.validator);
const App = new Robot(messenger, validator);

module.exports = App;