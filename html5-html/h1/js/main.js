'use strict';
window.onload=function(){
	var oBox=document.getElementById('box');
	var oUl=oBox.getElementsByTagName('ul')[0];
	var oOl=oBox.getElementsByTagName('ol')[0];
	var w=25;
	var len=oUl.offsetWidth/w;
	var zIndex=1;
	var iNow=0;
	//创建li
	for(var i=0;i<len;i++){
		var newLi=creatLi(i*w);
		if(i>=len/2){
			newLi.style.zIndex=zIndex--;
		}else{
			newLi.style.zIndex=zIndex++;
		}
		oUl.appendChild(newLi);
	}

	function creatLi(l){
		var oLi=document.createElement('li');
		oLi.innerHTML='\
			<a href="javascript:;"></a>\
			<a href="javascript:;"></a>\
			<a href="javascript:;"></a>\
			<a href="javascript:;"></a>\
			';
		var aA=oLi.getElementsByTagName('a');
		for(var i=0;i<aA.length;i++){
			aA[i].style.backgroundPosition=-l+'px 0px';
		}
		return oLi;
	}
	//加事件
	var aLi1=oUl.children;
	var aLi2=oOl.children;
	for(var i=0;i<aLi2.length;i++){
		aLi2[i].index=i;
		aLi2[i].onclick=function(){
			aLi2[iNow].className='';
			var time=Math.abs(this.index-iNow)*0.5;
			iNow=this.index;
			aLi2[iNow].className='active';
			for(var i=0;i<len;i++){
				aLi1[i].style.WebkitTransition=time+'s '+i*50+'ms all ease-in-out';
				aLi1[i].style.transition=time+'s '+i*50+'ms all ease-in-out';
				aLi1[i].style.WebkitTransform='translateZ(-180px) rotateX('+iNow*90+'deg)';
				aLi1[i].style.transform='translateZ(-180px) rotateX('+iNow*90+'deg)';
			}
		};
	}
};