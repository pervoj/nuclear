const tasks = {
	build: require('./build'),
	serve: require('./serve'),
	start: require('./start')
}

const f = require('./functions');

if (process.argv[2]) {
	if (tasks[process.argv[2]]) {

		let taskName = process.argv[2];
		let task = tasks[process.argv[2]];

		if (process.argv[3] && task[process.argv[3]]) {
			taskName += ` ${process.argv[3]}`;
			task = task[process.argv[3]];
		}

		console.log(`${f.getLogTime()} Running \`${taskName}\``);

		try {
			task();
		} catch (e) {
			console.error(`${f.getLogTime()} ${e}`);
		}

	} else {
		console.error(`${f.getLogTime()} Error: this command doesn't exist!`);
	}
} else {
	console.error(`${f.getLogTime()} Error: you have to specify the command!`);
}
