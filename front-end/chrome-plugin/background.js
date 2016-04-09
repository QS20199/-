setInterval(function() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://192.168.99.100", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = JSON.parse(xhr.responseText);
			// console.log(result);
			var ret = mod.couponFilter(result);
			if (ret.ret) {
				chrome.notifications.create("1", {
					type: "basic",
					iconUrl: "./icon.png",
					title: ret.percent + "%的优惠！" + ret.limitStr,
					message: "满" + ret.quota + "减" + ret.denomination + ". 来源：" + ret.origin
				}, function() {})
			}
		}
	}
	xhr.send(null)
}, 3000);

var mod = {};
mod.couponFilter = function(data) {
	var result = {};
	var lastPercent = 0;
	data[0].couponItem.forEach(function(el, index) {
			if (el.quota != 0 && el.denomination != 0) {
				var percent = el.denomination / el.quota * 100;
				if (percent > 20 && lastPercent < percent) {
					lastPercent = percent;
					result.ret = true;
					result.limitStr = el.limitStr;
					result.percent = parseInt(percent);
					result.operateWord = el.operateWord;
					result.quota = el.quota;
					result.denomination = el.denomination;
					result.origin = "京东优惠券"
				}
			}
		})
		//这里执行一些筛选判断，例如判断优惠券的金额是否大于某个值，或优惠占比大于某个百分比
	return result;
}