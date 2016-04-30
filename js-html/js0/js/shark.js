'use strict';
function Shark(images,type){
	Sprite.call(this,images['shark'+type]);

	this._size=[
		null,
		{w:270,h:509},
		{w:273,h:516}
	];

	this.w=this._size[type].w;
	this.h=this._size[type].h;

	this.speed=3;
}
Shark.prototype=new Sprite();
Shark.prototype.constructor=Shark;
Shark.prototype.swimming=function(){
	this.sx+=this.w;
	if(this.sx==this.w*8){
		this.sx=0;
	}
};