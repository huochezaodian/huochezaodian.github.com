'use strict';
window.onload=function(){
	var oC=document.getElementById('c1');
	var oScore=document.getElementById('score');
	var gc=oC.getContext('2d');
	var timer=null;
	
	//创建map
	var rows=16,cols=12;
	oC.width=cols*30;
	oC.height=rows*30;
	var data=map(rows,cols);
	function map(r,c){
		var data=[];
		for(var i=0;i<r;i++){
			data.push([]);
			for(var j=0;j<c;j++){
				data[i].push(0);
			}
		}
		return data;
	}
		
	//游戏内容
	
	var block=new Block(rnd(1,7));
	//方块自动移动
	clearInterval(timer);
	timer=setInterval(draw,1000);
	//计算分数
	var col=[];
	for(var i=0;i<cols;i++){
		col.push(0);
	}
	setInterval(function(){
		var count=0;
		var row=null;
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				if(data[i][j]){
					count++;
					if(count==cols){
						row=i;
						data.splice(i,1);
						data.unshift(col);
						console.log(data);
						oScore.value=cols+parseInt(oScore.value);
					}
				}else{
					count=0;
				}
			}
		}
	},30);
	document.onkeydown=function(ev){
		var ev=ev||event;
		//左：37 上：38 右：39 下：40
		switch(ev.keyCode){
			case 37:
				if(!block.collTestLeft(data)){
					block.left();
					gc.clearRect(0,0,oC.width,oC.height);
					block.draw(gc);
					drawData(data);
				}
			break;
			case 38:
				block.change(rows,cols,data);
				gc.clearRect(0,0,oC.width,oC.height);
				block.draw(gc);
				drawData(data);
			break;
			case 39:
				if(!block.collTestRight(cols,data)){
					block.right();
					gc.clearRect(0,0,oC.width,oC.height);
					block.draw(gc);
					drawData(data);
				}
			break;
			case 40:
				if(!block.collTestDown(rows,data)){
					block.down();
					gc.clearRect(0,0,oC.width,oC.height);
					block.draw(gc);
					drawData(data);
				}
			break;
		}
	}
	function draw(){
		gc.clearRect(0,0,oC.width,oC.height);
		block.draw(gc);
		drawData(data);
		if(block.collTestDown(rows,data)){
			for(var i=0;i<block.arr.length;i++){
				data[block.arr[i].r][block.arr[i].c]=block.imageData;
			}
			block=new Block(rnd(1,7));
			//检测进度
			for(var i=0;i<block.arr.length;i++){
				if(data[block.arr[i].r][block.arr[i].c]||data[block.arr[i].r+1][block.arr[i].c]){
					block.draw(gc);
					alert('Gameover');
					clearInterval(timer);
					return;
				}
			}
		}else{
			block.down();
		}
	}
	function drawData(data){
		for(var i=0;i<rows;i++){
			for(var j=0;j<cols;j++){
				if(data[i][j]){
					gc.drawImage(
						images(data[i][j]),
						j*30,i*30,30,30
					);
				}
			}
		}
	}
	function images(n){
		switch(n){
			case 1:
				var oImage1=new Image();
				oImage1.src='imgs/1.jpg';
				return oImage1;
			break;
			case 2:
				var oImage2=new Image();
				oImage2.src='imgs/2.jpg';
				return oImage2;
			break;
			case 3:
				var oImage3=new Image();
				oImage3.src='imgs/3.jpg';
				return oImage3;
			break;
			case 4:
				var oImage4=new Image();
				oImage4.src='imgs/4.jpg';
				return oImage4;
			break;
		}
	}
};
function rnd(m,n){
	return Math.floor(m+Math.random()*(n-m));
}
