setInterval(function () {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://127.0.0.1:8080", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var result = JSON.parse(xhr.responseText);
			console.log(result);
			if (mod.couponFilter(result)){
				chrome.notifications.create("1", {
					type: "basic",
					iconUrl: "./icon.png",
					title: "New Coupon",
					message: "new coupon is get!"
				}, function() {})
			}
		}
	}
	xhr.send(null)
}, 3000);

var mod = {};
mod.couponFilter = function (data) {
	//这里执行一些筛选判断，例如判断优惠券的金额是否大于某个值，或优惠占比大于某个百分比
	return true;
}