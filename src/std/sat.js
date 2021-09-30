const parse = (template) => {
	let result = /{{(.*?)}}/g.exec(template);
	const arr = [];
	let firstPos;

	while (result) {
		firstPos = result.index;
		if (firstPos !== 0) {
			
			arr.push(template.substring(0, firstPos));
			template = template.slice(firstPos);
		}

		arr.push(result[0]);
		template = template.slice(result[0].length);
		result = /{{(.*?)}}/g.exec(template);
	}

	if (template) arr.push(template);
	return arr;
}

const compileToString = function (template) {
	const ast = template;
	let fnStr = `""`;

	ast.map(t => {
		// checking to see if it is an interpolation
		if (t.startsWith("{{") && t.endsWith("}}")) {
			// append it to fnStr
			fnStr += `+data.${t.split(/{{|}}/).filter(Boolean)[0].trim()}`;
		} else {
			// append the string to the fnStr
			fnStr += `+\`${t}\``;
		}
	});

	return fnStr;
}

const compile = function (template) {
	return new Function("data", "return " + compileToString(template))
}

const RenderElement = function (data, locals) {
	array = parse(data);
	result = compile(array);
	product = result(locals);
	return product;
}

module.exports {
	renderString: RenderElement
};
