// console.log("NodeJS Version: " + process.version)
const render = require("./modules/static")

let string = `
<nav alignment="top" style="border-bottom: 1px solid rgba(180, 180, 180, 0.35)">
	<div class="items">
		<a class="active">page 1</a>
		<a>page 1</a>
		<a>page 1</a>
		<a>page 1</a>
	</div>
</nav>

<p>The current page url is {{url}}</p>
<p> And your name is {{name}} </p>
`

console.log(render.renderString(string, {
	url: "hi",
	name: "darkdarcool"
}));