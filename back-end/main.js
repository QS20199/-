var crawler = require('./crawler.js');
var server = require('./server.js');

crawler.start({
	interval: 10*60*1000 //10分钟爬一次
})

server.start();