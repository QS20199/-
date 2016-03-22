setInterval(function () {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://127.0.0.1:8080", true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			console.log(JSON.parse(xhr.responseText))
			chrome.notifications.create("1", {
				type: "basic",
				iconUrl: "./icon.png",
				title: "New Coupon",
				message: "new coupon is get!"
			}, function() {})
		}
	}
	xhr.send(null)
}, 3000);

