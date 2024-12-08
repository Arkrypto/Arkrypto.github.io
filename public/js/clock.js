// 1703289600000 2023-12-23 08:00:00 Asia/Shanghai
// 1734739200000 2024-12-21 08:00:00 Asia/Shanghai
var d = 1734739200000;

function myTimer(s, num){
	diff = getDiff(s);
	document.getElementById("clock" + num).innerHTML = diff;
}

function getDiff(dist) {
	let cur = new Date().getTime();
	diff = dist-cur;
	var days = parseInt(diff / (1000 * 60 * 60 * 24));
	var hours = parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((diff % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = ((diff % (1000 * 60)) / 1000).toFixed(0);

	if(days < 10) { days = "0" + days; }
	if(hours < 10) { hours = "0" + hours; }
	if(minutes < 10) { minutes = "0" + minutes; }
	if(seconds < 10) { seconds = "0" + seconds; }

	return days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒";
}

function init(){
	
	setInterval(function(){countdown(d)}, 1000)

}

function countdown(date){
	let loc = window.location.pathname;
	//alert(loc)
	//console.log(loc)
	
	if(loc == "/docs/sec/soc/"){
		let diff = getDiff(d)
		document.getElementById("countdown").innerHTML = diff;	
	}
		
}


init();