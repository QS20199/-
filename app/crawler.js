var querystring = require('querystring');
var http = require('http');
var crawlConfig = require('../config/crawlConfig.js');
var myDb = require('./db.js');
// var tools = require('./tools.js');


exports.start = (options) => {
	//todo: setInterval

	crawlConfig.forEach((config, index) => {
		var postData = querystring.stringify(config.query) || "";
		var options = config.options;

		//1.result是基本类型 和 对象 会有什么区别?
		//2.onData应该会在库里给res添加一个引用, onEnd后应该把这个引用去掉?
		var req = http.request(options, (res) => {
			res.setEncoding(config.encoding || 'utf8');
			var result = "";
			res.on('data', (chunk) => {
				result += chunk;
			});
			res.on('end', () => {
				result = config.resultFilter && config.resultFilter(result) || result;
				if (typeof result == "string") {
					result = {data: result};
				}
				myDb.update(config.selector, config.collectionName, result);
			})
		});

		req.on('error', (e) => {
			console.log(`problem with request: ${e.message}`);
		});

		req.write(postData);
		req.end();
	})
}

exports.start();