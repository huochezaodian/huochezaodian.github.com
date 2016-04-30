'use strict';
function loadingImage(arr,fn){
	var count=0;
	var aResult={};
	var total=0;
	for(var name in arr){
		total++;
		var oImg=new Image();
		oImg.src=arr[name];
		aResult[name]=oImg;
		oImg.onload=function(){
			count++;
			if(count==total){
				fn&&fn(aResult);
			}
		};
	}
}
function d2a(n){
	return n*Math.PI/180;
}
function a2d(n){
	return n*180/Math.PI;
}
function rnd(m,n){
	return Math.floor(m+Math.random()*(n-m));
}