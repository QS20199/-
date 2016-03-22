var nodeConfig = require('serverConfig').node;
var http = require('http');
var mod = {};

mod.start = () => {
	http.createServer(function (req, res) {
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('Hello World\n');
	}).listen(nodeConfig.port, nodeConfig.hostname);
}

module.exports = mod;