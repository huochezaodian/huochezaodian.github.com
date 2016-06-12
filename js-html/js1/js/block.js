'use strict';
//创建方块对象
function Block(type){

	this.image=null;
	this.imageData=0;

	this.w=30;
	this.h=30;

	this.sx=0;
	this.sy=0;

	this.x=0;
	this.y=0;

	this.timer=null;

	this.type=type;
	this.status=0;
	this.arr=[];
	this.tmp=[];

	this.creat();
}
//创建5种方块位置和颜色
Block.prototype.creat=function(){

	var oImg=new Image();
	this.imageData=rnd(1,5);
	oImg.src='imgs/'+this.imageData+'.jpg';

	this.image=oImg;

	switch(this.type){
		case 1:
			this.arr=[
				{r:0,c:5},
				{r:1,c:5},
				{r:1,c:6},
				{r:2,c:6}
			];
		break;
		case 2:
			this.arr=[
				{r:0,c:5},
				{r:0,c:6},
				{r:1,c:5},
				{r:1,c:6}
			];
		break;
		case 3:
			this.arr=[
				{r:0,c:5},
				{r:0,c:6},
				{r:1,c:6},
				{r:2,c:6}
			];
		break;
		case 4:
			this.arr=[
				{r:0,c:5},
				{r:1,c:5},
				{r:2,c:5},
				{r:3,c:5}
			];
		break;
		case 5:
			this.arr=[
				{r:0,c:5},
				{r:1,c:5},
				{r:2,c:5},
				{r:0,c:6}
			];
		break;
		case 6:
			this.arr=[
				{r:1,c:4},
				{r:1,c:5},
				{r:1,c:6},
				{r:0,c:5}
			];
		break;
	}
};
//画出方块
Block.prototype.draw=function(gc){
	for(var i=0;i<this.arr.length;i++){
		this.x=this.arr[i].c*this.w;
		this.y=this.arr[i].r*this.h;
		gc.drawImage(
			this.image,
			this.sx,this.sy,this.w,this.h,
			this.x,this.y,this.w,this.h
		);
	}
};
//方块下移
Block.prototype.down=function(){
	for(var i=0;i<this.arr.length;i++){
		this.arr[i].r++;
	}
};
//方块左移
Block.prototype.left=function(){
	for(var i=0;i<this.arr.length;i++){
		this.arr[i].c--;
	}
};
//方块右移
Block.prototype.right=function(){
	for(var i=0;i<this.arr.length;i++){
		this.arr[i].c++;
	}
};
//方块变形
Block.prototype.change=function(rMax,cMax,data){
	this.extend(this.arr,this.tmp);
	switch(this.type){
		case 1:
			if(this.status%2==0){
				this.tmp[0].r+=1;
				this.tmp[0].c-=1;
				this.tmp[2].r-=1;
				this.tmp[2].c-=1;
				this.tmp[3].r-=2;
			}else if(this.status%2==1){
				this.tmp[0].r-=1;
				this.tmp[0].c+=1;
				this.tmp[2].r+=1;
				this.tmp[2].c+=1;
				this.tmp[3].r+=2;
			}
		break;
		case 3:
			if(this.status==0){
				this.tmp[0].r+=1;
				this.tmp[0].c-=1;
				this.tmp[1].c-=2;
				this.tmp[2].r-=1;
				this.tmp[2].c-=1;
				this.tmp[3].r-=2;
			}else if(this.status==1){
				this.tmp[0].r+=1;
				this.tmp[0].c+=2;
				this.tmp[1].r+=2;
				this.tmp[1].c+=1;
				this.tmp[2].r+=1;
				this.tmp[3].c-=1;
			}else if(this.status==2){
				this.tmp[0].r-=2;
				this.tmp[1].r-=1;
				this.tmp[1].c+=1;
				this.tmp[3].c-=1;
				this.tmp[3].r+=1;
			}else if(this.status==3){
				this.tmp[0].c-=1;
				this.tmp[1].r-=1;
				this.tmp[2].c+=1;
				this.tmp[3].r+=1;
				this.tmp[3].c+=2;
			}
		break;
		case 4:
			if(this.status%2==0){
				this.tmp[0].c-=1;
				this.tmp[1].r-=1;
				this.tmp[2].r-=2;
				this.tmp[2].c+=1;
				this.tmp[3].r-=3;
				this.tmp[3].c+=2;
			}else if(this.status%2==1){
				this.tmp[0].c+=1;
				this.tmp[1].r+=1;
				this.tmp[2].r+=2;
				this.tmp[2].c-=1;
				this.tmp[3].r+=3;
				this.tmp[3].c-=2;
			}
		break;
		case 5:
			if(this.status==0){
				this.tmp[0].r+=1;
				this.tmp[0].c-=1;
				this.tmp[2].r-=1;
				this.tmp[2].c+=1;
				this.tmp[3].c-=2;
			}else if(this.status==1){
				this.tmp[0].r+=1;
				this.tmp[0].c+=2;
				this.tmp[1].c+=1;
				this.tmp[2].r-=1;
				this.tmp[3].r+=2;
				this.tmp[3].c+=1;
			}else if(this.status==2){
				this.tmp[0].r-=2;
				this.tmp[1].r-=1;
				this.tmp[1].c-=1;
				this.tmp[2].c-=2;
				this.tmp[3].c+=1;
				this.tmp[3].r-=1;
			}else if(this.status==3){
				this.tmp[0].c-=1;
				this.tmp[1].r+=1;
				this.tmp[2].r+=2;
				this.tmp[2].c+=1;
				this.tmp[3].r-=1;
			}
		break;
		case 6:
			if(this.status==0){
				this.tmp[0].r+=1;
				this.tmp[0].c+=2;
				this.tmp[1].c+=1;
				this.tmp[2].r-=1;
				this.tmp[3].r+=1;
			}else if(this.status==1){
				this.tmp[0].r-=2;
				this.tmp[1].r-=1;
				this.tmp[1].c-=1;
				this.tmp[2].c-=2;
			}else if(this.status==2){
				this.tmp[0].c-=2;
				this.tmp[1].r+=1;
				this.tmp[1].c-=1;
				this.tmp[2].r+=2;
			}else if(this.status==3){
				this.tmp[0].r+=1;
				this.tmp[1].c+=1;
				this.tmp[2].r-=1;
				this.tmp[2].c+=2;
				this.tmp[3].r-=1;
			}
		break;
	}
	console.log(this.collTestChange(rMax,cMax,data));
	if(!this.collTestChange(rMax,cMax,data)){
		this.extend(this.tmp,this.arr);
		this.status++;
		this.status%=4;
	}
};
//方块碰撞检测
Block.prototype.collTestLeft=function(data){
	for(var i=0;i<this.arr.length;i++){
		if(this.arr[i].c==0||data[this.arr[i].r][this.arr[i].c-1]){
			return true;
		}
	}
	return false;
};
Block.prototype.collTestRight=function(cMax,data){
	for(var i=0;i<this.arr.length;i++){
		if(this.arr[i].c+1==cMax||data[this.arr[i].r][this.arr[i].c+1]){
			return true;
		}
	}
	return false;
};
Block.prototype.collTestDown=function(rMax,data){
	for(var i=0;i<this.arr.length;i++){
		if(this.arr[i].r+1==rMax||data[this.arr[i].r+1][this.arr[i].c]){
			return true;
		}
	}
	return false;
};
Block.prototype.collTestChange=function(rMax,cMax,data){
	for(var i=0;i<this.tmp.length;i++){
		if(this.tmp[i].r<0||this.tmp[i].r>=rMax||this.tmp[i].c<0||this.tmp[i].c>=cMax||data[this.tmp[i].r][this.tmp[i].c]!=0){
			return true;
		}
	}
	return false;
};
Block.prototype.extend=function(arr1,arr2){
	for(var i = 0; i < arr1.length; i++){
    	arr2[i] = {};
        for(var name in arr1[i]){
        	arr2[i][name] = arr1[i][name];
        }
    }
};