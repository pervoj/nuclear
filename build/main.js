const tasks = {
	build: require('./build'),
	serve: require('./serve'),
	start: require('./start')
}

const f = require('./functions');

if (process.argv[2]) {
	if (tasks[process.argv[2]]) {

		console.log(`${f.getLogTime()} Running ${process.argv[2]}`);

		try {
			tasks[process.argv[2]]();
		} catch (e) {
			console.error(`${e}`);
		}

	} else console.error('Error: this task doesn\'t exist!');
} else console.error('Error: you have to specify the task!');
