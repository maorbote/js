function gotop(){
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}
function scrollToTop(ms) {
	ms = ms > 200 ? ms : 200;
	var pos = document.body.scrollTop || document.documentElement.scrollTop || 0, n = Math.floor(ms/10), step = Math.floor(pos/n), i;
	if(pos > 0) {
		for(i=1;i<n;i++){window.setTimeout(function(){window.scrollBy(0,-step)},10*i);}
		window.setTimeout(function(){window.scrollTo(window.scrollX,0)},ms);
	}
}
