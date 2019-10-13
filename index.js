/* eslint-disable max-len */
const os = require("os");
const chalk = require("chalk");
const App = require("./app/app");
const stdin = process.openStdin();
stdin.setEncoding("utf8");

console.log(chalk.cyan(App.messenger.getMessage("initial")), os.EOL);

console.log(
	chalk.green(`Type ${chalk.yellow("PLACE X,Y,F")} to initialize Robot`)
);
console.log(
	chalk.green(`Type ${chalk.yellow("HELP")} to check available commands`),
	os.EOL
);

console.log(
	chalk.green(
		`Type ${chalk.red("exit")} or press ${chalk.red(
			"CTRL+C"
		)} (Windows) or ${chalk.red(
			"Command+C"
		)} (Mac) on your keyboard to exit program ${os.EOL}`
	)
);

/**
 * stdin portion, will read user's input from CLI
 */
stdin.addListener("data", function(d) {
	const args = d.trim().split(/(?:\s+|,\s*)/i);
	const command = args.shift();

	if (command.toLowerCase() == "exit") {
		process.exit();
	}

	const ret = App.fn(command, ...args);

	if (command.toLowerCase() == "help") {
		console.log(`${chalk.cyan(ret)}${os.EOL}`);
	} else if (ret.startsWith("!!!")) {
		console.log(`${chalk.red(ret)}${os.EOL}`);
	} else {
		console.log(`${chalk.green(ret)}${os.EOL}`);
	}
});
