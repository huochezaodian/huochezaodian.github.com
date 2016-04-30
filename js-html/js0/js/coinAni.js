'use strict';
function CoinAni(images,type){
	Sprite.call(this,images['coinAni'+type]);

	this.w = 60;
	this.h = 60;
	this.speed=-4;
}
CoinAni.prototype = new Sprite();
CoinAni.prototype.constructor = CoinAni;
CoinAni.prototype.circle=function(){
	this.sx+=this.w;
	if(this.sx==this.w*10){
		this.sx=0;
	}
}