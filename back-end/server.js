var nodeConfig = require('../config/serverConfig.js').node;
var db = require('./db.js');

var http = require('http');

var mod = {};



mod.start = () => {
	http.createServer(function(req, res) {
		db.find({}, "jingDongQuan", (results) => {
			res.writeHead(200, {
				'Content-Type': 'application/json; charset=utf-8'
			});
			res.end(JSON.stringify(results));
		})
	}).listen(nodeConfig.port, nodeConfig.hostname);
	console.log("Server is listening on " + nodeConfig.hostname + ":" + nodeConfig.port);
}

module.exports = mod;

//todo: router