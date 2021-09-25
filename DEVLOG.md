The following code creates a full string using AST

```nodejs
render = require("./modules/static")

let string = `
<nav alignment="top" style="border-bottom: 1px solid rgba(180, 180, 180, 0.35)">
	<div class="items">
		<a class="active">page 1</a>
		<a>page 1</a>
		<a>page 1</a>
		<a>page 1</a>
	</div>
</nav>

<p>The current page url is {{name}}</p>
`

console.log(render.renderString(string, {
	name: "hi"
}))
```

This is important as it allows this templating engine to work quickly and effieciently. This  also works on the Client so we can use the client rendering system to create SPA applications.

## Server Generation

We can help the user create the server script by creating a system like __Express.JS/Fastify__ to allow extra functionality. 

The code to register plugins would be the following:
```nodejs
let paper = require("paper-js").define()

// import and register plugins
paper.register.plugin("paper-js-pretty")
paper.register.plugin("./local/plugin/pretty")
paper.register.plugin("{{ onReq }}", (data) => {
	console.log(`[ Paper.JS ] \t${ data.message.time } \t${ data.message.text }`)
})

// register options
paper.register.option("port", 3000)
paper.register.option("keys", ["./private.key", "./public.key"])
paper.register.option("force", ["HTTPS", "^TLS-2.1"])
// ^ force HTTPS redirection with min TLS 2.1

paper.listen((ln) => {
	// functions you want to run
}
```

## Routes

Registering Routes should be quite easy.
```nodejs
paper.register.route("/:page", (obj) => {
	obj.response.send("./views/skeleton/index.html", { name: "StringentDev", page: ":page" })
}) //loads skeleton rendered with template engine
```

This allows the server to carry out instructions before sending the results.

### Building the API routes

Building an API should be as easy as possible.

```nodejs
paper.register.api("/api/auth", (obj) => {
	if(obj.request.auth == paper._store.match(obj.request.auth)) { //search database for match
		obj.response.add({ user: paper._store.match(obj.request.auth) })
	}
	obj.response.send()
}) //loads skeleton rendered with template engine
```

## Accessing Core Components
Core components are important in that they are accessible. Like allowing cache creation. The following code will show __how__ you may be able to do that.

```nodejs
// RAM contained database
paper._cache.register("key", "value")
paper._cache.read("key")
paper._cache.match("value")
paper._cache.release("key")

// permanent storage onto disk
paper._store.register("key", "value")
paper._store.read("key")
paper._store.match("value")
paper._store.release("key")

//server variables
paper._server.CPU // CPU usage in %
paper._server.RAM // RAM usage in %
paper._server.PID // PID of server
```