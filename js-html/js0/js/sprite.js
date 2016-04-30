'use strict';
function Sprite(oImg){
	this.img=oImg;

	this.w=0;
	this.h=0;

	this.sx=0;
	this.sy=0;

	this.x=0;
	this.y=0;

	this.r=0;
	this.speed=0;
}
Sprite.prototype.move=function(){
	var speedX=Math.sin(d2a(this.r))*this.speed;
	var speedY=-Math.cos(d2a(this.r))*this.speed;

	this.x+=speedX;
	this.y+=speedY;
};
Sprite.prototype.collTest=function(obj){
	var x1=obj.x;
	var y1=obj.y;
	var x2=this.x;
	var y2=this.y;
	var a=x1-x2;
	var b=y2-y1;
	if(Math.sqrt(a*a+b*b)<30){
		return true;
	}else{
		return false;
	}
};
Sprite.prototype.draw=function(gd){
	gd.save();
	gd.beginPath();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.r));
	gd.drawImage(
		this.img,
		this.sx,this.sy,this.w,this.h,
		-this.w/2,-this.h/2,this.w,this.h
	);
	gd.restore();
};


