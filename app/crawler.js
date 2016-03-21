var querystring = require('querystring');
var http = require('http');
var crawlConfig = require('../config/crawlConfig.js');
var myDb = require('./db.js');

crawlConfig.forEach((config, index) => {

})


var postData = querystring.stringify({
	'page': 1 //todo1
});

var options = {
	hostname: 'coupon.m.jd.com', //todo2
	// host: '127.0.0.1', //走本地代理
	port: 80,
	path: '/center/getCouponList.json', //todo3
	method: 'POST', //todo4
	headers: { //todo5
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length,
		'Host': 'coupon.m.jd.com'
	}
};

//1.result是基本类型 和 对象 会有什么区别?
//2.onData应该会在库里给res添加一个引用, onEnd后应该把这个引用去掉?
var req = http.request(options, (res) => {
	// console.log(`STATUS: ${res.statusCode}`);
	// console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	res.setEncoding('utf8');
	var result = "";
	res.on('data', (chunk) => {
		result += chunk;
	});
	res.on('end', () => {
		//{a:1,b:2, c:{in1:4, in2:5}}


		//{a:1,c:{in1:4}}

		{
			a: true,
			c: {
				in1: true
			}
		}

	})
});

req.on('error', (e) => {
	console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();