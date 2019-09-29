var http = require("https");
const pug = require('pug');


module.exports = {
	getCountry(response, name, capital) {
var options = {
	"method": "GET",
	"hostname": "restcountries-v1.p.rapidapi.com",
	"port": null,
	"path": "/name/"+name+"",
	"headers": {
		"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
		"x-rapidapi-key": "75baf5aa92msh0f6bd78da02bba7p17abdbjsnb59adb276d1f"
	}
};

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var bodystr = Buffer.concat(chunks);

		var body = JSON.parse(bodystr);
		const render = pug.compileFile('about.pug');
        response.write(
        render({
			title: body[0].name,
			message: body[0].capital,
			area: body[0].area,
			population: body[0].population}
        ));
        response.end();
		console.log(bodystr.toString());

	});
});

req.end();
}
}