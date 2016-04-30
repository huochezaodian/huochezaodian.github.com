'use strict';
function Cannon(images,type){
	Sprite.call(this,images['cannon'+type]);

	this._size=[
		null,
		{w:74,h:74},
		{w:74,h:76},
		{w:74,h:76},
		{w:74,h:83},
		{w:74,h:85},
		{w:74,h:90},
		{w:74,h:94}
	];

	this.w=this._size[type].w;
	this.h=this._size[type].h;

	this.type=type;
}
Cannon.prototype=new Sprite();
Cannon.prototype.constructor=Cannon;
Cannon.prototype.launch=function(){
	this.sy+=this.h;
	if(this.sy==this.h*5){
		this.sy=0;
		return true;
	}
	return false;
};
