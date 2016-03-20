var querystring = require('querystring'),
	http = require('http');

var postData = querystring.stringify({
	'page': 1
});

var options = {
	hostname: 'coupon.m.jd.com',
	// host: '127.0.0.1',
	port: 80,
	path: '/center/getCouponList.json',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length,
		'Host': 'coupon.m.jd.com'
	}
};

var req = http.request(options, (res) => {
	console.log(`STATUS: ${res.statusCode}`);
	console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
	res.setEncoding('utf8');
	var result = "";
	res.on('data', (chunk) => {
		// console.log(`BODY: ${chunk}`);
		result += chunk;
	});
	res.on('end', () => {
		// console.log('No more data in response.')
		// console.log(JSON.parse(result));
	})
});

req.on('error', (e) => {
	console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();

