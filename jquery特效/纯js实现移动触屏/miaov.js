function startMove(obj,josn,fnEnd){//运动函数；
	clearInterval(obj.timer);//清理定时器；
	obj.timer = setInterval(function(){
		var onoff = true;
		for(var attr in josn){
			var cur = 0;
			if(attr == "opacity"){//判断是否为透明度，如果是使用parseFloat取小数；
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}else if(attr == "scroll"){//判断运动内容是否为滚动，是则取滚动条位置
				cur = document.documentElement.scrollTop||document.body.scrollTop;
			}else{//否则取整数
				cur = getStyle(obj,attr)=="auto"?0:parseInt(getStyle(obj,attr));//如果样式表里未添加该属性，则取值0；
			}
			var speed = (josn[attr]-cur)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);//speed取整；
			if(cur!=josn[attr]){
				onoff = false;
			}
			if(attr == "opacity"){//属性为“opacity”时，样式运动方式；
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}else if(attr == "scroll"){
				
				window.scrollTo(0,cur + speed)
			}else{//其他样式运动方式；

				obj.style[attr] = cur + speed +"px";

			}

		}
		if(onoff){
			clearInterval(obj.timer);
			if(fnEnd){
				fnEnd();
			}
		}
	},30)
}
function getStyle(obj,name){
	if(obj.currentStyle){//IE；
		return obj.currentStyle[name];
	}else{//FF；
		return getComputedStyle(obj, false)[name];
	}
}
