// console.log("NodeJS Version: " + process.version)
//const render = require("./modules/static.js");
const style  = require("./std/style.js");
const os     = require("os");

style.verbose(`Paper.JS on NodeJS ${process.versions.node}`)() // add "()" to "style.verbose("hi") to create a new line
style.verbose(`V8 Engine Version ${process.versions.v8}`)()

style.ok(`All looks good`)()
style.warning(`Resolvable Issue Arose`)()
style.fatal(`Fatal Issue Arose`)()
//style.spinner("hi")
array_size = 20
array = new Array(array_size - 1).fill(0, 0)
setInterval(async function(){ 
	var reqsPerSec = os.loadavg();
	array.push(reqsPerSec[0])
	if (array.length > array_size) {
		array.shift()
	}
	style.sparkline(array, "% CPU")
}, 1000)

