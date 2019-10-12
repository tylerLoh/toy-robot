/* eslint-disable max-len */
const os = require("os");
const chalk = require("chalk");
const App = require("./app/app");
const stdin = process.openStdin();
stdin.setEncoding("utf8");

console.log(
	chalk.cyan(App.messenger.getMessage("initial")),
	chalk.cyan(App.messenger.getMessage("help"))
);

console.log(
	chalk.red(
		`Type exit or press CTRL+C (Windows) or Command+C (Mac) on your keyboard to exit program ${os.EOL}`
	)
);

/**
 * stdin portion, will read user's input from CLI
 */
stdin.addListener("data", function(d) {
	const args = d.trim().split(/(?:\s+|,\s*)/i);
	const command = args.shift();

	if(command.toLowerCase() == 'exit') {
		process.exit();
	}

	const ret = App.fn(command, ...args);
	if (ret.startsWith("!!!")) {
		console.log(`${chalk.red(ret)}${os.EOL}`);
	} else {
		console.log(`${chalk.green(ret)}${os.EOL}`);
	}
});
