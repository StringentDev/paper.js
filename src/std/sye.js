const chalk = require("chalk");
const os    = require("os");

process.stdout.write("\x1b[?25l")

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, exitCode) {
	process.stdout.write("\x1b[?25h")
	if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

Sparkline = (array, label) => {
	let min = 100;
	let max = 0;
	let cur = 0
	let maxValue;
	let calculation = [];
	let constructs = []
	let chars = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"] 
	for (var x in array) {
		if (array[x] > max) {
			max = array[x]
		} else if (array[x] < min){
			min = array[x]
		}
		
		maxValue = max - min
		//constructs.push(chars[Math.round(((x - min) / maxValue) * (chars.length))])
	}
	
	for (var x in array) {
		//console.log(Math.round(((x - min) / maxValue) * (12 - chars.length)))
		if ((array[x] - min) >= maxValue) { 
			constructs.push(`${chalk.green(chars[Math.round(((array[x] - min) / maxValue) * (chars.length - 1))])}`)
		} else if (array[x] <= min) {
			constructs.push(`${chalk.gray(chars[0])}`)
		} else {
			constructs.push(`${chars[Math.round(((array[x] - min) / maxValue) * (chars.length - 1))]}`)
		}
	}
	
	let line = constructs.join("")
	return `${line}\t ${array[array.length - 1]}${label} ${chalk.gray("(")}${chalk.gray(`${min}${label}`)}${chalk.gray("/")}${chalk.green(`${max}${label}`)}${chalk.gray(")")}`
}

module.exports = {
	verbose: (text) => {
		process.stdout.write(`\u001b[2K${chalk.dim(`\t   ...  \t`)}${text}\r`)
		return () => {
			process.stdout.write(`\n`)
		}
	},
	ok: (text) => {
		process.stdout.write(`\u001b[2K${chalk.green(`\t   ok   \t`)}${text}\r`)
		return () => {
			process.stdout.write(`\n`)
		}
	},
	warning: (text) => {
		process.stdout.write(`\u001b[2K${chalk.yellow(`\t   warn  \t`)}${text}\r`)
		return () => {
			process.stdout.write(`\n`)
		}
	},
	fatal: (text) => {
		process.stdout.write(`\u001b[2K${chalk.red(`\t   fatal \t`)}${text}\r`)
		return () => {
			process.stdout.write(`\n`)
		}
	},
	// spinner: (text) => {
	// 	spinner = ora.(text); 
	// 	spinner.color = "blue";                       //\t   fatal \t
	// 	spinner.spinner = { 	interval: 80, 	frames: ["\t   -     \t", "\t   \\     \t", "\t   |     \t", "\t   /     \t"] }
	// 	spinner.start()
	// 	return spinner
	// },
	sparkline: (array, label) => {
		// var total = os.totalmem();
		// var free = os.freemem();
		// var used = total - free;
		// var human = Math.ceil(used / 1000000) + ' MB';
		
		// process.stdout.write(`${Gauge(used, total, 20, total * 0.8, human)}\r`);
		process.stdout.write(`\u001b[2K${Sparkline(array, label)}\r`)
		

	}
};