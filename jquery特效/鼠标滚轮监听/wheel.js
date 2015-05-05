/**
 * Created by Administrator on 2015/1/6.
 */
var iNow=0;
function mouseWheel(b,scroll)
{
    var box=$(scroll);
    var bx=$(b);
//制作鼠标滚动
    var winH=$(window).height();
    bx.bind("DOMMouseScroll",fn);
    bx.bind("mousewheel",fn);
    var b=null;//定义一个值来同意webkit和Moz的滚轮 往上滚和往下滚 的判断
    function fn(ev)
    {

        var ev=getEvent(ev) ;//获取event对象
        //做滚动值上下  的兼容
        if(ev.originalEvent.wheelDelta)      //Webkit IE
        {
            b=ev.originalEvent.wheelDelta>0?true:false;
        }
        else            //Moz
        {
            b=ev.originalEvent.detail<0?true:false;
        }
        preDef(ev);
            if (b)
            {
                if(!box.is(":animated"))
                {
                    if(box.offset().top>=0)
                    {
                        box.attr("top","0");
                        iNow=0;
                    }
                    else
                    {
                        iNow--;
                        box.animate({top:box.offset().top+=parseInt(winH)}, 800,"easeBoth")
                    }
                    tab(iNow);
                }

            }
            else
            {
                if(!box.is(":animated"))
                {
                    console.log(box.height()-$(window).height());
                    if(box.offset().top<=-(box.height()-$(window).height()))
                    {
                        box.attr("top",-(box.height()-$(window).height()))
                        iNow=4;
                    }
                    else
                    {
                        iNow++;
                        box.animate({top:box.offset().top-=parseInt(winH)}, 800,"easeBoth");
                    }
                    tab(iNow);
                }
        }
    }
 }
$(function(){
    tab();
});

function tab(iNow)
{
    var menu=$(".menu").find("span");
    menu.eq(0).addClass("on").siblings().removeClass("on");
    menu.eq(iNow).addClass("on").siblings().removeClass("on")
}
//工具函数
//阻止ctrl+“-||+”
document.onkeydown=function(evt){
    winH=$(window).height();
    fn();
   /* var evt=evt||window.event;
    console.log(evt.keyCode||evt.which);
    var code = evt.keyCode||evt.which;
    if(evt.ctrlKey && (code==187 || code==189|| code==107||code==109)){
        preDef(evt);
    }**/
};

//获取Event对象
    function getEvent(event) {
        return event || window.event;
    }
//阻止默认行为
 function preDef(event){
        var e=getEvent(event);
        if(typeof e.preventDefault!="undefined"){//w3c
            e.preventDefault();
        }else{                           //IE
            e.returnValue=false;
        }
    }

$.extend(jQuery.easing , {

    easeIn: function(x,t, b, c, d){  //加速曲线
        return c*(t/=d)*t + b;
    },
    easeOut: function(x,t, b, c, d){  //减速曲线
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(x,t, b, c, d){  //加速减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(x,t, b, c, d){  //加加速曲线
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(x,t, b, c, d){  //减减速曲线
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(x,t, b, c, d){  //加加速减减速曲线
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(x,t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(x,t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(x,t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(x,t, b, c, d, s){     //回退加速（回退渐入）
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(x,t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 3.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(x,t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(x,t, b, c, d){    //弹球减振（弹球渐出）
        return c - this['bounceOut'](x,d-t, 0, c, d) + b;
    },
    bounceOut: function(x,t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(x,t, b, c, d){
        if (t < d/2) {
            return this['bounceIn'](x,t*2, 0, c, d) * 0.5 + b;
        }
        return this['bounceOut'](x,t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }

});
