'use strict';
function Web(img,type){
	Sprite.call(this,img);
	this._size = [
		null,
		{sx:334,sy:375,w:84,h:84},
		{sx:15,sy:414,w:106,h:106},
		{sx:178,sy:370,w:126,h:124},
		{sx:258,sy:198,w:144,h:142},
		{sx:0,sy:246,w:163,h:153},
		{sx:243,sy:0,w:181,h:180},
		{sx:22,sy:22,w:200,h:200}
	];
	
	this.sx = this._size[type].sx;
	this.sy = this._size[type].sy;
	this.w = this._size[type].w;
	this.h = this._size[type].h;
	
}
Web.prototype = new Sprite();
Web.prototype.constructor = Web;
