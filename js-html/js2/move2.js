'use strict'
var iSpeed=0;
var timer=null;
function move(obj,iTarget){
	var left=obj.offsetLeft;
	clearInterval(timer);
	timer=setInterval(function(){
		iSpeed+=(iTarget-left)/5;
		iSpeed*=0.75;
		left+=iSpeed;
		obj.style.left=left+'px';
		if(Math.round(iSpeed==0)&&Math.round(left==iTarget)){
			clearInterval(timer);
		}
	},30);
}