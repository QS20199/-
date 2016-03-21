module.exports = {
	/*
	@usage: 
	objFilter({
		a:1,
		b:2,
		c: {
			c1:3,
			c2:4
		}
	}, {
		a: true,
		c: {
			c1: true
		}
	})
	@result: {a:1, c:{c1:3}}
	*/
	objFilter: (srcObj, filter) => {
		var destObj = {};
		for (key in filter) {
			if (filter[key] === true) { //普通值
				destObj[key] = srcObj[key];
			} else { // 对象
				destObj[key] = module.exports.objFilter(srcObj[key], filter[key]);
			}
		}
		return destObj;
	}
}
