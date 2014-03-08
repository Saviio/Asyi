
//
// This server should run with node.js

var http = require('http');
var url = require("url");

server = http.createServer(function (req, res) {

	res.writeHeader(200, {"Content-Type": "application/json"});

	var requestArgs=url.parse(req.url).query.split('&')

	var request={}
	for(var i in requestArgs){

		var obj=requestArgs[i].split('=')
		request[obj[0]]=obj[1]

	}

	console.log(request)
	var _request={}

	for(var i in request){
		if(i!=='callback'){
			_request[i]=request[i]
		}
	}

	res.end(request["callback"]+"("+JSON.stringify(_request)+")");

})

server.listen(8081);
console.log("httpd start @8081");