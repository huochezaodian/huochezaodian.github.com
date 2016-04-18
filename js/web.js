window.onload=function(){
	var oWeb=document.querySelector('#content_web');
	var aLi=oWeb.querySelectorAll('li');
	var oPre=oWeb.querySelector('.pre');
	var oNext=oWeb.querySelector('.next');
	var arr=[];
	var onOff=false;
	for(var i=0;i<aLi.length;i++){
		arr.push(aLi[i].className);
	}
	oPre.onclick=function(){
		if(onOff)return;
		onOff=true;
		arr.unshift(arr.pop());
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=arr[i];
		}
	};
	oNext.onclick=function(){
		if(onOff)return;
		onOff=true;
		arr.push(arr.shift());
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=arr[i];
		}
	};
	for(var i=0;i<aLi.length;i++){
		aLi[i].addEventListener('transitionend',function(){
			onOff=false;
		},false);
	}
};