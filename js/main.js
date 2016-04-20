window.onload=function(){
	//web
(function(){
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
})();
//html5
(function(){
	var oBox=document.querySelector('#html5');
	var N=8;
	for(var i=0;i<N;i++){
		var oS = document.createElement('span');
		oS.style.backgroundImage= 'url(img/'+i+'.jpg)';
		oBox.appendChild(oS);
	}
	var aS=oBox.children;
	for(var i=0;i<N;i++){
		aS[i].style.WebkitTransition = '1s all ease '+(N-i)*300+'ms';
		aS[i].style.MozTransition = '1s all ease '+(N-i)*300+'ms';
		aS[i].style.msTransition = '1s all ease '+(N-i)*300+'ms';
		aS[i].style.OTransition = '1s all ease '+(N-i)*300+'ms';
		aS[i].style.transition = '1s all ease '+(N-i)*300+'ms';
		 (function(index){
		 	setTimeout(function(){
				aS[index].style.WebkitTransform='rotateY(-'+index*360/N+'deg) translateZ(300px)';
				aS[index].style.MozTransform='rotateY(-'+index*360/N+'deg) translateZ(300px)';
				aS[index].style.msTransform='rotateY(-'+index*360/N+'deg) translateZ(300px)';
				aS[index].style.OTransform='rotateY(-'+index*360/N+'deg) translateZ(300px)';
				aS[index].style.transform='rotateY(-'+index*360/N+'deg) translateZ(300px)';
			});
		 })(i);
	}
	//拖拽
	var x=0;
	var y=0;
	var speedX=0;
	var speedY=0;
	var lastX=0;
	var lastY=0;
	var timer=null;
	oBox.onmousedown=function(ev){
		clearInterval(timer);
		var disX = ev.pageX-y;
		var disY = ev.pageY-x;
		document.onmousemove=function(ev){
			x = ev.pageY-disY;
			y = ev.pageX-disX;
			oBox.style.WebkitTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
			speedX = ev.pageX-lastX;
			speedY = ev.pageY-lastY;
			lastX = ev.pageX;
			lastY = ev.pageY;
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			//iSpeedX 		y
			//iSpeedY 		x
			timer = setInterval(function(){
				speedX*=0.95;
				speedY*=0.95;
				y+=speedX;
				x+=speedY;
				oBox.style.WebkitTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.MozTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.msTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.OTransform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				oBox.style.transform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				if(Math.abs(speedX)<1)speedX=0;
				if(Math.abs(speedY)<1)speedY=0;
				if(speedX==0&&speedY==0){
					clearInterval(timer);
				}
			},30);
		};
		return false;
	};
})();
};