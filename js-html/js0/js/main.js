'use strict';
window.onload=function(){
	var oC1=document.getElementById('c1');
	var gd=oC1.getContext('2d');
	loadingImage({
		'bottom':'img/bottom.png',
		'bullet':'img/bullet.png',
		'cannon1':'img/cannon1.png',
		'cannon2':'img/cannon2.png',
		'cannon3':'img/cannon3.png',
		'cannon4':'img/cannon4.png',
		'cannon5':'img/cannon5.png',
		'cannon6':'img/cannon6.png',
		'cannon7':'img/cannon7.png',
		'fish1':'img/fish1.png',
		'fish2':'img/fish2.png',
		'fish3':'img/fish3.png',
		'fish4':'img/fish4.png',
		'fish5':'img/fish5.png',
		'shark1':'img/shark1.png',
		'shark2':'img/shark2.png',
		'coinAni1':'img/coinAni1.png',
		'coinAni2':'img/coinAni2.png',
		'coinText':'img/coinText-min.png',
		'number_black':'img/number_black.png',
		'web':'img/web.png'
	},
	function(aResult){

		//底部
		var bottom=new Bottom(aResult['bottom']);
		bottom.w=760;
		bottom.h=71;
		bottom.sx=4;
		bottom.sy=0;
		bottom.x=oC1.width/2;
		bottom.y=oC1.height-bottom.h/2;
		//金币
		var iCoin=2000;
		var aCoinText=count();
		function count(){
			var arr=[];
			for(var i=0;i<6;i++){
				var count=Math.floor(iCoin/Math.pow(10,(5-i)))%10;
				var oCoinText=new CoinText(aResult.coinText,count);
				oCoinText.x=46+(oCoinText.w+3)*i;
				oCoinText.y=oC1.height-oCoinText.h/2-5;
				arr.push(oCoinText);
			}
			return arr;
		}

		//金币运动
		var aCoinAni=[];

		
		//换炮台
		var next=new Bottom(aResult['bottom']);
		next.w=44;
		next.h=28;
		next.sx=44;
		next.sy=73;
		next.x=oC1.width/2-next.w/2;
		next.y=oC1.height-next.h/2;

		var pre=new Bottom(aResult['bottom']);
		pre.w=44;
		pre.h=28;
		pre.sx=132;
		pre.sy=73;
		pre.x=oC1.width/2+pre.w*2.5;
		pre.y=oC1.height-pre.h/2;
		
		//炮台
		var iNow=0;
		var aCannon=[];
		for(var i=0;i<7;i++){
			var cannon1=new Cannon(aResult,i+1);
			cannon1.x=bottom.x+40;
			cannon1.y=bottom.y+5;
			aCannon.push(cannon1);	
		}
		var cannon=aCannon[iNow];
		
		oC1.onmousemove=function(ev){
			var x=ev.pageX-oC1.offsetLeft;
			var y=ev.pageY-oC1.offsetTop;
			var a=cannon.x-x;
			var b=cannon.y-y;
			cannon.r=a2d(Math.atan2(b,a))-90;
		};
		//炮弹 //渔网
		var aWeb=[];
		var aBullet=[];
		oC1.onclick=function(ev){
			var x=ev.pageX-oC1.offsetLeft+pre.w/2;
			var y=ev.pageY-oC1.offsetTop+pre.h/2;
			if(x>pre.x&&x<pre.x+pre.w&&y<pre.y+pre.h&&y>pre.y){
				iNow--;
				if(iNow<0){
					iNow=6;
				}
				cannon=aCannon[iNow];
				return;
			}
			if(x>next.x&&x<next.x+next.w&&y<next.y+next.h&&y>next.y){
				iNow++;
				if(iNow==7){
					iNow=0;
				}
				cannon=aCannon[iNow];
				return;
			}
			
			var timer=setInterval(function(){
				if(cannon.launch()){
					clearInterval(timer);
					//一枚炮弹减30
					iCoin-=30;
					if(iCoin<0){
						iCoin=0;
					}
					aCoinText=count();

					var bullet=new Bullet(aResult['bullet'],cannon.type);
					bullet.x=cannon.x;
					bullet.y=cannon.y;
					bullet.r=cannon.r;
					aBullet.push(bullet);
				}
			},16);
		};

		var aDieFish=[];
		var aFish=[];
		//鱼		
		var dir=[[[-50,0],[0,oC1.height],[45,135]],[[0,oC1.width],[-50,0],[135,225]],[[oC1.width,oC1.width+50],[0,oC1.height],[225,315]]];
		setInterval(function(){
			var fish=new Fish(aResult,rnd(1,6));
			var sDir=dir[rnd(0,2)];
			fish.x=rnd(sDir[0][0],sDir[0][1]);
			fish.y=rnd(sDir[1][0],sDir[1][1]);
			fish.r=rnd(sDir[2][0],sDir[2][1]);
			aFish.push(fish);
		},1000);
		//鲨鱼(太大)
		// setInterval(function(){
		// 	var shark=new Shark(aResult,rnd(1,3));
		// 	var sDir=dir[rnd(0,2)];
		// 	shark.x=rnd(sDir[0][0],sDir[0][1]);
		// 	shark.y=rnd(sDir[1][0],sDir[1][1]);
		// 	shark.r=rnd(sDir[2][0],sDir[2][1]);
		// 	aFish.push(shark);
		// },1000);

		setInterval(function(){
			gd.clearRect(0,0,oC1.width,oC1.height);

			for(var i=0;i<aFish.length;i++){
				aFish[i].draw(gd);
				aFish[i].move();			
			}
				
			for(var i=0;i<aBullet.length;i++){
				aBullet[i].draw(gd);
				aBullet[i].move();			
			}

			for(var i=0;i<aDieFish.length;i++){
				aDieFish[i].draw(gd);
				aWeb[i].draw(gd);
				if(aDieFish[i].die()){
					//打着鱼出金币
					var oCoinAni=new CoinAni(aResult,2);
					oCoinAni.x=aDieFish[i].x;
					oCoinAni.y=aDieFish[i].y;					
					var x=oCoinAni.x;
					var y=oCoinAni.y;
					var a=60-x;
					var b=oC1.height-40-y;
					oCoinAni.r=a2d(Math.atan2(b,a))-90;
					aCoinAni.push(oCoinAni);

					aDieFish.splice(i,1);
					aWeb.splice(i,1);
					i--;
				}			
			}

			bottom.draw(gd);
			pre.draw(gd);
			next.draw(gd);
			cannon.draw(gd);

			for(var i=0;i<6;i++){
				aCoinText[i].draw(gd);			
			}

			for(var i=0;i<aCoinAni.length;i++){
				aCoinAni[i].draw(gd);
				aCoinAni[i].move();	
				aCoinAni[i].circle();
				if(aCoinAni[i].x<60&&aCoinAni[i].y>(oC1.height-40)){
					aCoinAni.splice(i,1);
					i--;
					iCoin+=300;
					aCoinText=count();
				}		
			}
			//出界检测
			for(var i=0;i<aFish.length;i++){
				if(aFish[i].x<-50||aFish[i].y<-50||aFish[i].x>oC1.width+50||aFish[i].y>oC1.height+50){
					aFish.splice(i,1);
					i--;
				}			
			}	
			for(var i=0;i<aBullet.length;i++){
				if(aBullet[i].x<-50||aBullet[i].y<-50||aBullet[i].x>oC1.width+50||aBullet[i].y>oC1.height+50){
					aBullet.splice(i,1);
					i--;
				}			
			}

			//碰撞检测
			for(var i=0;i<aFish.length;i++){
				for(var j=0;j<aBullet.length;j++){
					if(aBullet[j].collTest(aFish[i],cannon.type)){
						aBullet.splice(j,1);
						j--;
						//打中撒网
						var oWeb=new Web(aResult.web,cannon.type);
						oWeb.x=aFish[i].x;
						oWeb.y=aFish[i].y;
						aWeb.push(oWeb);

						aDieFish.push(aFish[i]);
						aFish.splice(i,1);
						i--;
					}
				}
			}
		},30);

		setInterval(function(){
			for(var i=0;i<aFish.length;i++){
				aFish[i].swimming();		
			}
		},120);
	});
};
