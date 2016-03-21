module.exports = [{
	name: 'jingDongQuan',
	selector: {
		'_name_': 'jingDongQuan'
	},
	options: {
		// host: '127.0.0.1', //走本地代理
		hostname: 'coupon.m.jd.com',
		port: 80,
		path: '/center/getCouponList.json',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Host': 'coupon.m.jd.com'
		}
	},
	query: {
		'page': 1
	}, 
	resultFilter: (src) => {
		var result = JSON.parse(src);
		return result;
	}
}]