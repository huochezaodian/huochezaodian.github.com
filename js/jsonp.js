'use strict'
function jsonp(options){
	//初始值
	options=options||{};
	if(!options.url)return;
	options.data=options.data||{};
	options.cbName=options.cbName||'cb';
	options.timeout=options.timeout||15000;
	//回调函数名,解决缓存
	options.data[options.cbName]='show'+Math.random();
	options.data[options.cbName]=options.data[options.cbName].replace('.','');
	//json2url
	var arr=[];
	for(var name in options.data){
		arr.push(name+'='+encodeURIComponent(options.data[name]));
	}
	var sData=arr.join('&');
	//延时提醒
	var timer=setTimeout(function(){
		window[options.data[options.cbName]]=null;
		options.error&&options.error('网络不给力');
	},options.timeout);
	//跨域连接（核心）
	window[options.data[options.cbName]]=function(result){
		clearTimeout(timer);
		options.success&&options.success(result);
		oH.removeChild(oS);
	}
	var oH=document.getElementsByTagName('head')[0];
	var oS=document.createElement('script');
	oS.src=options.url+'?'+sData;
	oH.appendChild(oS);
}