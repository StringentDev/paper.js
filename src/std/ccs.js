/**
 * This is to parse CSS
 */

class cssParser {
	constructor(css) {
		this.css = css;
	} 
	parse() {
		// do something with this.css
	}
}

/**
 * We want it to return a dict with all of the css, like this:
 * .hello {
 * 	color: red;
 * }
 * becomes:
 * 	{
 * 		hello: "color: red; .....(the css after)"
 *  }
 * we have to only allow classes because theres no way to load css without classes
 * we can have a global stylesheet loader, but that's it
 * - darkdarcool
 */