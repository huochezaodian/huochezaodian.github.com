'use strict';
function CoinText(img,count){
	Sprite.call(this,img);

	this.w = 20;
	this.h = 20;
	this.sx = this.w*count;

}
CoinText.prototype = new Sprite();
CoinText.prototype.constructor = CoinText;