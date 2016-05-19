'use strict';
window.onload=function(){
	var oUl=document.getElementById('box');
	var aLi=oUl.children;
	var oldIndex=null;
	var newIndex=null;
	var onOff=false;
	//存位置
	var aPos=[];
	for(var i=0;i<aLi.length;i++){
		var pos={};
		pos.left=aLi[i].offsetLeft;
		pos.top=aLi[i].offsetTop;
		aPos.push(pos);
	}
	//加上绝对定位，拖拽
	for(var i=0;i<aLi.length;i++){
		setStyle(aLi[i],{
			position:'absolute',
			left:aPos[i].left+'px',
			top:aPos[i].top+'px',
			zIndex:1,
			margin:0
		});
	}
	//加载拖拽事件
	for(var i=0;i<aLi.length;i++){
		drag(i,aLi[i],function(obj){
			if(oldIndex!=null&&newIndex!=null){
				move(aLi[oldIndex],{left:aPos[newIndex].left,top:aPos[newIndex].top},{end:function(){
					setStyle(aLi[oldIndex],{
						zIndex:1,
						border:'none'
					});
				}});
				move(aLi[newIndex],{left:aPos[oldIndex].left,top:aPos[oldIndex].top},{end:function(){
					setStyle(aLi[newIndex],{
						zIndex:1,
						border:'none'
					});
					//位置序列号交换
					var cur=aPos[oldIndex];
					aPos.splice(oldIndex,1,aPos[newIndex]);
					aPos.splice(newIndex,1,cur);
					newIndex=null;
					oldIndex=null;
					onOff=false;
				}});
			}else{
				move(aLi[oldIndex],{left:aPos[oldIndex].left,top:aPos[oldIndex].top},{end:function(){
					setStyle(aLi[oldIndex],{
						zIndex:1,
						border:'none'
					});
					oldIndex=null;
					onOff=false;
				}});
			}
		});
	}
	function drag(index,obj,fn){
		obj.onmousedown=function(ev){
			if(onOff)return;
			onOff=true;
			oldIndex=index;
			setStyle(this,{
				zIndex:2,
				border:'3px solid aqua'
			});
			var ev=ev||event;
			var disX=ev.clientX-this.offsetLeft;
			var disY=ev.clientY-this.offsetTop;
			document.onmousemove=function(ev){
				var ev=ev||event;
				var l=ev.clientX-disX;
				var t=ev.clientY-disY;
				setStyle(obj,{
					left:l+'px',
					top:t+'px'
				});
				//移动过程中碰撞检测
				for(var i=0;i<aLi.length;i++){
					if(i==oldIndex)continue;
					if(collTest(obj,aLi[i])){
						setStyle(aLi[i],'border','3px solid violet');
						newIndex=i;
					}else{
						setStyle(aLi[i],'border','none');
						if(newIndex==i){
							newIndex=null;
						}
					}
				}
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				fn();
				obj.releaseCapture&&obj.releaseCapture();
			};
			obj.setCapture&&obj.setCapture();
			return false;
		};
	}
	
};
function setStyle(){
	if(arguments.length==2){
		for(var name in arguments[1]){
			arguments[0].style[name]=arguments[1][name];
		}
	}else if(arguments.length==3){
		arguments[0].style[arguments[1]]=arguments[2];
	}
}
function collTest(obj1,obj2){
	var a=obj1.offsetLeft-obj2.offsetLeft;
	var b=obj1.offsetTop-obj2.offsetTop;
	var c=Math.sqrt(a*a+b*b);
	if(c<100){
		return true;
	}else{
		return false;
	}
}